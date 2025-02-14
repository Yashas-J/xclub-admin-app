/*
  # Add Tier Settings Schema

  1. New Tables
    - `tier_settings`
      - Stores configuration for each membership tier
      - Includes discount percentages
      - Visit frequency requirements
      - Upgrade/downgrade thresholds
      - Automation flags

  2. Security
    - Enable RLS
    - Add policies for admin access
*/

-- Create tier settings table
CREATE TABLE IF NOT EXISTS tier_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id uuid REFERENCES restaurants NOT NULL,
  tier text NOT NULL,
  discount decimal NOT NULL DEFAULT 0,
  min_spend decimal NOT NULL DEFAULT 0,
  visit_frequency integer NOT NULL DEFAULT 30,
  downgrade_threshold integer NOT NULL DEFAULT 45,
  auto_upgrade boolean NOT NULL DEFAULT true,
  auto_downgrade boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(restaurant_id, tier)
);

-- Enable RLS
ALTER TABLE tier_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can view tier settings"
  ON tier_settings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can modify tier settings"
  ON tier_settings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create function to update tier based on visit frequency
CREATE OR REPLACE FUNCTION check_membership_status()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  last_visit timestamptz;
  tier_config tier_settings%ROWTYPE;
  new_tier text;
BEGIN
  -- Get the last visit date
  SELECT created_at INTO last_visit
  FROM visits
  WHERE membership_id = NEW.id
  ORDER BY created_at DESC
  LIMIT 1;

  -- Get tier settings
  SELECT * INTO tier_config
  FROM tier_settings
  WHERE restaurant_id = NEW.restaurant_id
  AND tier = NEW.tier;

  -- Check if downgrade is needed
  IF tier_config.auto_downgrade 
     AND last_visit < now() - (tier_config.downgrade_threshold || ' days')::interval THEN
    -- Logic to determine new tier
    CASE NEW.tier
      WHEN 'VIP' THEN new_tier := 'GOLD';
      WHEN 'GOLD' THEN new_tier := 'SILVER';
      WHEN 'SILVER' THEN new_tier := 'BRONZE';
      ELSE new_tier := NEW.tier;
    END CASE;
    
    NEW.tier := new_tier;
  END IF;

  RETURN NEW;
END;
$$;

-- Create trigger for membership status checks
CREATE TRIGGER check_membership_status_trigger
  BEFORE UPDATE ON memberships
  FOR EACH ROW
  EXECUTE FUNCTION check_membership_status();

-- Add sample tier settings
INSERT INTO tier_settings (restaurant_id, tier, discount, min_spend, visit_frequency, downgrade_threshold)
SELECT 
  id as restaurant_id,
  unnest(ARRAY['BRONZE', 'SILVER', 'GOLD', 'VIP']) as tier,
  unnest(ARRAY[5, 10, 15, 20]) as discount,
  unnest(ARRAY[100, 500, 1000, 2000]) as min_spend,
  unnest(ARRAY[30, 20, 15, 10]) as visit_frequency,
  unnest(ARRAY[45, 30, 25, 20]) as downgrade_threshold
FROM restaurants;