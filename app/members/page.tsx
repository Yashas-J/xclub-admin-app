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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const MOCK_MEMBERS = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    tier: 'GOLD',
    points: 2500,
    totalSpent: 12500,
    lastVisit: '2024-02-15',
    status: 'active',
  },
  {
    id: '2',
    name: 'Emma Wilson',
    email: 'emma.w@example.com',
    tier: 'SILVER',
    points: 1200,
    totalSpent: 6000,
    lastVisit: '2024-02-14',
    status: 'active',
  },
  {
    id: '3',
    name: 'David Chen',
    email: 'd.chen@example.com',
    tier: 'BRONZE',
    points: 500,
    totalSpent: 2500,
    lastVisit: '2024-02-10',
    status: 'inactive',
  },
];

export default function MembersPage() {
  const [selectedTier, setSelectedTier] = useState<string>('all');

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'GOLD':
        return 'bg-primary text-primary-foreground';
      case 'SILVER':
        return 'bg-secondary text-secondary-foreground';
      case 'BRONZE':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-500/20 text-green-500' 
      : 'bg-red-500/20 text-red-500';
  };

  const filteredMembers = selectedTier === 'all'
    ? MOCK_MEMBERS
    : MOCK_MEMBERS.filter(member => member.tier === selectedTier);

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
          <h2 className="text-3xl font-bold tracking-tight">Members</h2>
          <div className="flex items-center space-x-2">
            <Button>Export Data</Button>
            <Button>Add Member</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gold Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {MOCK_MEMBERS.filter(m => m.tier === 'GOLD').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Highest spending members
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Silver Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {MOCK_MEMBERS.filter(m => m.tier === 'SILVER').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Regular customers
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bronze Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {MOCK_MEMBERS.filter(m => m.tier === 'BRONZE').length}
              </div>
              <p className="text-xs text-muted-foreground">
                New members
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Member List</CardTitle>
            <CardDescription>
              Manage and view all member details
            </CardDescription>
            <div className="flex space-x-2 pt-2">
              <Button
                variant={selectedTier === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedTier('all')}
              >
                All
              </Button>
              <Button
                variant={selectedTier === 'GOLD' ? 'default' : 'outline'}
                onClick={() => setSelectedTier('GOLD')}
              >
                Gold
              </Button>
              <Button
                variant={selectedTier === 'SILVER' ? 'default' : 'outline'}
                onClick={() => setSelectedTier('SILVER')}
              >
                Silver
              </Button>
              <Button
                variant={selectedTier === 'BRONZE' ? 'default' : 'outline'}
                onClick={() => setSelectedTier('BRONZE')}
              >
                Bronze
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {member.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTierColor(member.tier)}>
                        {member.tier}
                      </Badge>
                    </TableCell>
                    <TableCell>{member.points}</TableCell>
                    <TableCell>${member.totalSpent}</TableCell>
                    <TableCell>{member.lastVisit}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(member.status)}>
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}