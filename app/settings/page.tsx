"use client"

import { useState } from 'react';
import { MainNav } from '@/components/main-nav';
import { Search } from '@/components/search';
import { UserNav } from '@/components/user-nav';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

interface TierSettings {
  discount: number;
  minSpend: number;
  visitFrequency: number;
  downgradeThreshold: number;
  autoUpgrade: boolean;
  autoDowngrade: boolean;
}

export default function SettingsPage() {
  const [tierSettings, setTierSettings] = useState<Record<string, TierSettings>>({
    BRONZE: {
      discount: 5,
      minSpend: 100,
      visitFrequency: 30, // days
      downgradeThreshold: 45, // days
      autoUpgrade: true,
      autoDowngrade: true,
    },
    SILVER: {
      discount: 10,
      minSpend: 500,
      visitFrequency: 20,
      downgradeThreshold: 30,
      autoUpgrade: true,
      autoDowngrade: true,
    },
    GOLD: {
      discount: 15,
      minSpend: 1000,
      visitFrequency: 15,
      downgradeThreshold: 25,
      autoUpgrade: true,
      autoDowngrade: true,
    },
    VIP: {
      discount: 20,
      minSpend: 2000,
      visitFrequency: 10,
      downgradeThreshold: 20,
      autoUpgrade: true,
      autoDowngrade: true,
    },
  });

  const handleSettingChange = (
    tier: string,
    setting: keyof TierSettings,
    value: number | boolean
  ) => {
    setTierSettings(prev => ({
      ...prev,
      [tier]: {
        ...prev[tier],
        [setting]: value,
      },
    }));
  };

  const handleSave = () => {
    // TODO: Save settings to database
    console.log('Saving settings:', tierSettings);
  };

  const renderTierCard = (tier: string, settings: TierSettings) => (
    <Card key={tier} className="mb-6">
      <CardHeader>
        <CardTitle className={tier === 'GOLD' ? 'text-primary' : ''}>
          {tier} Tier
        </CardTitle>
        <CardDescription>
          Configure membership settings for {tier.toLowerCase()} tier members
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor={`${tier}-discount`}>Discount Percentage</Label>
            <div className="flex items-center space-x-2">
              <Input
                id={`${tier}-discount`}
                type="number"
                value={settings.discount}
                onChange={(e) => handleSettingChange(tier, 'discount', Number(e.target.value))}
                className="w-24"
              />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`${tier}-spend`}>Minimum Spend</Label>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">$</span>
              <Input
                id={`${tier}-spend`}
                type="number"
                value={settings.minSpend}
                onChange={(e) => handleSettingChange(tier, 'minSpend', Number(e.target.value))}
                className="w-24"
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Visit Requirements</h4>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`${tier}-frequency`}>Visit Frequency</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id={`${tier}-frequency`}
                  type="number"
                  value={settings.visitFrequency}
                  onChange={(e) => handleSettingChange(tier, 'visitFrequency', Number(e.target.value))}
                  className="w-24"
                />
                <span className="text-sm text-muted-foreground">days</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Minimum days between visits to maintain status
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${tier}-downgrade`}>Downgrade Threshold</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id={`${tier}-downgrade`}
                  type="number"
                  value={settings.downgradeThreshold}
                  onChange={(e) => handleSettingChange(tier, 'downgradeThreshold', Number(e.target.value))}
                  className="w-24"
                />
                <span className="text-sm text-muted-foreground">days</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Days without a visit before downgrade
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Automation</h4>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Automatic Upgrade</Label>
              <p className="text-sm text-muted-foreground">
                Automatically upgrade members when they meet criteria
              </p>
            </div>
            <Switch
              checked={settings.autoUpgrade}
              onCheckedChange={(checked) => handleSettingChange(tier, 'autoUpgrade', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Automatic Downgrade</Label>
              <p className="text-sm text-muted-foreground">
                Automatically downgrade inactive members
              </p>
            </div>
            <Switch
              checked={settings.autoDowngrade}
              onCheckedChange={(checked) => handleSettingChange(tier, 'autoDowngrade', checked)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b border-border/40">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Membership Settings</h2>
            <p className="text-muted-foreground">
              Configure membership tiers, discounts, and automation rules
            </p>
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>

        <div className="grid gap-4">
          {Object.entries(tierSettings).map(([tier, settings]) => (
            renderTierCard(tier, settings)
          ))}
        </div>
      </div>
    </div>
  );
}