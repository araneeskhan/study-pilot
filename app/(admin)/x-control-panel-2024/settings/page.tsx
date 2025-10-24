// ============================================
// FILE: src/app/(admin)/x-control-panel-2024/settings/page.tsx
// ============================================

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage platform configuration
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic platform settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="site_name">Site Name</Label>
                <Input id="site_name" defaultValue="Study Pilot" />
              </div>
              <div>
                <Label htmlFor="site_url">Site URL</Label>
                <Input id="site_url" defaultValue="https://studypilot.com" />
              </div>
              <div>
                <Label htmlFor="support_email">Support Email</Label>
                <Input
                  id="support_email"
                  type="email"
                  defaultValue="support@studypilot.com"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Maintenance Mode</Label>
                  <p className="text-muted-foreground text-sm">
                    Put site in maintenance mode
                  </p>
                </div>
                <Switch />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>Configure SMTP settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="smtp_host">SMTP Host</Label>
                <Input id="smtp_host" placeholder="smtp.gmail.com" />
              </div>
              <div>
                <Label htmlFor="smtp_port">SMTP Port</Label>
                <Input id="smtp_port" type="number" placeholder="587" />
              </div>
              <div>
                <Label htmlFor="smtp_user">SMTP Username</Label>
                <Input id="smtp_user" type="email" />
              </div>
              <div>
                <Label htmlFor="smtp_pass">SMTP Password</Label>
                <Input id="smtp_pass" type="password" />
              </div>
              <Button>Save & Test</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Optimize for search engines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="meta_title">Default Meta Title</Label>
                <Input id="meta_title" />
              </div>
              <div>
                <Label htmlFor="meta_desc">Default Meta Description</Label>
                <Input id="meta_desc" />
              </div>
              <div>
                <Label htmlFor="ga_id">Google Analytics ID</Label>
                <Input id="ga_id" placeholder="G-XXXXXXXXXX" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Connect third-party services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="cloudinary">Cloudinary Cloud Name</Label>
                <Input id="cloudinary" />
              </div>
              <div>
                <Label htmlFor="stripe">Stripe Secret Key</Label>
                <Input id="stripe" type="password" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
