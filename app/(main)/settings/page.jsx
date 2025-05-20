"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Building2, Users, Shield, FileText, Mail, Globe, Lock, Bell } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock data - replace with actual data fetching
const mockData = {
  business: {
    name: 'Acme Corp',
    industry: 'Technology',
    size: '50-100',
    website: 'www.acmecorp.com',
    email: 'contact@acmecorp.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business St, San Francisco, CA 94105',
    timezone: 'America/Los_Angeles',
    currency: 'USD',
    fiscalYearStart: 'January'
  },
  users: [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@acmecorp.com',
      role: 'admin',
      status: 'active',
      lastActive: new Date('2024-03-15T10:30:00')
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@acmecorp.com',
      role: 'manager',
      status: 'active',
      lastActive: new Date('2024-03-15T09:15:00')
    },
    {
      id: 3,
      name: 'Bob Wilson',
      email: 'bob@acmecorp.com',
      role: 'viewer',
      status: 'inactive',
      lastActive: new Date('2024-03-10T14:20:00')
    }
  ],
  security: {
    twoFactorEnabled: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
    ipRestriction: false,
    allowedIPs: [],
    loginNotifications: true
  },
  reports: {
    defaultFormat: 'PDF',
    includeCharts: true,
    dateFormat: 'MM/DD/YYYY',
    numberFormat: 'USD',
    timezone: 'America/Los_Angeles',
    autoSchedule: false,
    scheduleFrequency: 'monthly'
  }
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('business')
  const [business, setBusiness] = useState(mockData.business)
  const [users, setUsers] = useState(mockData.users)
  const [security, setSecurity] = useState(mockData.security)
  const [reports, setReports] = useState(mockData.reports)

  const handleBusinessUpdate = (field, value) => {
    setBusiness(prev => ({ ...prev, [field]: value }))
  }

  const handleSecurityUpdate = (field, value) => {
    setSecurity(prev => ({ ...prev, [field]: value }))
  }

  const handleReportsUpdate = (field, value) => {
    setReports(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-8 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <Tabs defaultValue="business" className="space-y-4">
        <TabsList>
          <TabsTrigger value="business" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Business Profile
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users & Access
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        {/* Business Profile */}
        <TabsContent value="business" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Update your business details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={business.name}
                    onChange={(e) => handleBusinessUpdate('name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={business.industry}
                    onChange={(e) => handleBusinessUpdate('industry', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={business.website}
                    onChange={(e) => handleBusinessUpdate('website', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Business Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={business.email}
                    onChange={(e) => handleBusinessUpdate('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={business.phone}
                    onChange={(e) => handleBusinessUpdate('phone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input
                    id="address"
                    value={business.address}
                    onChange={(e) => handleBusinessUpdate('address', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={business.timezone}
                    onValueChange={(value) => handleBusinessUpdate('timezone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="Europe/London">London</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={business.currency}
                    onValueChange={(value) => handleBusinessUpdate('currency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="mt-4">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users & Access */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user access and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs",
                          user.status === 'active' ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        )}>
                          {user.status}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {user.role}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Reset Password</Button>
                    </div>
                  </div>
                ))}
                <Button className="w-full">Invite New User</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security preferences and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for all users
                    </p>
                  </div>
                  <Switch
                    checked={security.twoFactorEnabled}
                    onCheckedChange={(checked) => handleSecurityUpdate('twoFactorEnabled', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Login Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified of new login attempts
                    </p>
                  </div>
                  <Switch
                    checked={security.loginNotifications}
                    onCheckedChange={(checked) => handleSecurityUpdate('loginNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>IP Restrictions</Label>
                    <p className="text-sm text-muted-foreground">
                      Restrict access to specific IP addresses
                    </p>
                  </div>
                  <Switch
                    checked={security.ipRestriction}
                    onCheckedChange={(checked) => handleSecurityUpdate('ipRestriction', checked)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Session Timeout (minutes)</Label>
                  <Input
                    type="number"
                    value={security.sessionTimeout}
                    onChange={(e) => handleSecurityUpdate('sessionTimeout', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Password Expiry (days)</Label>
                  <Input
                    type="number"
                    value={security.passwordExpiry}
                    onChange={(e) => handleSecurityUpdate('passwordExpiry', parseInt(e.target.value))}
                  />
                </div>
              </div>
              <Button className="mt-4">Save Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Report Settings */}
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Settings</CardTitle>
              <CardDescription>
                Customize report formats and delivery preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Default Format</Label>
                  <Select
                    value={reports.defaultFormat}
                    onValueChange={(value) => handleReportsUpdate('defaultFormat', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="Excel">Excel</SelectItem>
                      <SelectItem value="CSV">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <Select
                    value={reports.dateFormat}
                    onValueChange={(value) => handleReportsUpdate('dateFormat', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Number Format</Label>
                  <Select
                    value={reports.numberFormat}
                    onValueChange={(value) => handleReportsUpdate('numberFormat', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select number format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select
                    value={reports.timezone}
                    onValueChange={(value) => handleReportsUpdate('timezone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="Europe/London">London</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Include Charts</Label>
                  <p className="text-sm text-muted-foreground">
                    Add visual charts to reports
                  </p>
                </div>
                <Switch
                  checked={reports.includeCharts}
                  onCheckedChange={(checked) => handleReportsUpdate('includeCharts', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-Schedule Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically generate reports on schedule
                  </p>
                </div>
                <Switch
                  checked={reports.autoSchedule}
                  onCheckedChange={(checked) => handleReportsUpdate('autoSchedule', checked)}
                />
              </div>
              {reports.autoSchedule && (
                <div className="space-y-2">
                  <Label>Schedule Frequency</Label>
                  <Select
                    value={reports.scheduleFrequency}
                    onValueChange={(value) => handleReportsUpdate('scheduleFrequency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <Button className="mt-4">Save Report Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
