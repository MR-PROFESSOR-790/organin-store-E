"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Bell, Mail, Smartphone, Globe, Download, Trash2 } from "lucide-react"

export function UserSettings() {
  const { toast } = useToast()

  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailPromotions: false,
    emailNewsletter: true,
    smsOrders: false,
    smsPromotions: false,
    pushNotifications: true,
    orderUpdates: true,
    priceAlerts: false,
    stockAlerts: true,
  })

  const [preferences, setPreferences] = useState({
    language: "en",
    currency: "USD",
    timezone: "America/New_York",
    theme: "light",
    itemsPerPage: "12",
    defaultView: "grid",
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: "private",
    showPurchaseHistory: false,
    allowDataCollection: true,
    marketingEmails: false,
    thirdPartySharing: false,
  })

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const handlePreferenceChange = (key: string, value: string) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))
  }

  const handlePrivacyChange = (key: string, value: boolean | string) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }))
  }

  const saveSettings = (section: string) => {
    toast({
      title: "Settings saved",
      description: `Your ${section.toLowerCase()} settings have been updated.`,
    })
  }

  const exportData = () => {
    toast({
      title: "Data export initiated",
      description: "You will receive an email with your data export within 24 hours.",
    })
  }

  const deleteAccount = () => {
    toast({
      title: "Account deletion requested",
      description: "Please check your email for confirmation instructions.",
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Email Notifications</span>
                </h3>
                <div className="space-y-3 pl-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailOrders">Order Updates</Label>
                      <p className="text-sm text-gray-600">Get notified about order status changes</p>
                    </div>
                    <Switch
                      id="emailOrders"
                      checked={notifications.emailOrders}
                      onCheckedChange={(checked) => handleNotificationChange("emailOrders", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailPromotions">Promotions & Deals</Label>
                      <p className="text-sm text-gray-600">Receive emails about special offers</p>
                    </div>
                    <Switch
                      id="emailPromotions"
                      checked={notifications.emailPromotions}
                      onCheckedChange={(checked) => handleNotificationChange("emailPromotions", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNewsletter">Newsletter</Label>
                      <p className="text-sm text-gray-600">Weekly newsletter with tips and recipes</p>
                    </div>
                    <Switch
                      id="emailNewsletter"
                      checked={notifications.emailNewsletter}
                      onCheckedChange={(checked) => handleNotificationChange("emailNewsletter", checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Smartphone className="h-4 w-4" />
                  <span>SMS Notifications</span>
                </h3>
                <div className="space-y-3 pl-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="smsOrders">Order Updates</Label>
                      <p className="text-sm text-gray-600">SMS alerts for important order updates</p>
                    </div>
                    <Switch
                      id="smsOrders"
                      checked={notifications.smsOrders}
                      onCheckedChange={(checked) => handleNotificationChange("smsOrders", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="smsPromotions">Flash Sales</Label>
                      <p className="text-sm text-gray-600">Get notified about limited-time offers</p>
                    </div>
                    <Switch
                      id="smsPromotions"
                      checked={notifications.smsPromotions}
                      onCheckedChange={(checked) => handleNotificationChange("smsPromotions", checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Product Alerts</h3>
                <div className="space-y-3 pl-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="priceAlerts">Price Drop Alerts</Label>
                      <p className="text-sm text-gray-600">Get notified when wishlist items go on sale</p>
                    </div>
                    <Switch
                      id="priceAlerts"
                      checked={notifications.priceAlerts}
                      onCheckedChange={(checked) => handleNotificationChange("priceAlerts", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="stockAlerts">Back in Stock</Label>
                      <p className="text-sm text-gray-600">Get notified when out-of-stock items are available</p>
                    </div>
                    <Switch
                      id="stockAlerts"
                      checked={notifications.stockAlerts}
                      onCheckedChange={(checked) => handleNotificationChange("stockAlerts", checked)}
                    />
                  </div>
                </div>
              </div>

              <Button onClick={() => saveSettings("Notification")} className="bg-green-600 hover:bg-green-700">
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Display Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={preferences.language}
                    onValueChange={(value) => handlePreferenceChange("language", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={preferences.currency}
                    onValueChange={(value) => handlePreferenceChange("currency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={preferences.timezone}
                    onValueChange={(value) => handlePreferenceChange("timezone", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={preferences.theme} onValueChange={(value) => handlePreferenceChange("theme", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="itemsPerPage">Items per Page</Label>
                  <Select
                    value={preferences.itemsPerPage}
                    onValueChange={(value) => handlePreferenceChange("itemsPerPage", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 items</SelectItem>
                      <SelectItem value="24">24 items</SelectItem>
                      <SelectItem value="48">48 items</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultView">Default Product View</Label>
                  <Select
                    value={preferences.defaultView}
                    onValueChange={(value) => handlePreferenceChange("defaultView", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grid">Grid View</SelectItem>
                      <SelectItem value="list">List View</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={() => saveSettings("Preference")} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="profileVisibility">Profile Visibility</Label>
                    <p className="text-sm text-gray-600">Control who can see your profile information</p>
                  </div>
                  <Select
                    value={privacy.profileVisibility}
                    onValueChange={(value) => handlePrivacyChange("profileVisibility", value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showPurchaseHistory">Show Purchase History</Label>
                    <p className="text-sm text-gray-600">Allow others to see your purchase history</p>
                  </div>
                  <Switch
                    id="showPurchaseHistory"
                    checked={privacy.showPurchaseHistory}
                    onCheckedChange={(checked) => handlePrivacyChange("showPurchaseHistory", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allowDataCollection">Data Collection</Label>
                    <p className="text-sm text-gray-600">Allow us to collect data to improve your experience</p>
                  </div>
                  <Switch
                    id="allowDataCollection"
                    checked={privacy.allowDataCollection}
                    onCheckedChange={(checked) => handlePrivacyChange("allowDataCollection", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketingEmails">Marketing Communications</Label>
                    <p className="text-sm text-gray-600">Receive personalized marketing emails</p>
                  </div>
                  <Switch
                    id="marketingEmails"
                    checked={privacy.marketingEmails}
                    onCheckedChange={(checked) => handlePrivacyChange("marketingEmails", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="thirdPartySharing">Third-party Data Sharing</Label>
                    <p className="text-sm text-gray-600">Allow sharing data with trusted partners</p>
                  </div>
                  <Switch
                    id="thirdPartySharing"
                    checked={privacy.thirdPartySharing}
                    onCheckedChange={(checked) => handlePrivacyChange("thirdPartySharing", checked)}
                  />
                </div>
              </div>

              <Button onClick={() => saveSettings("Privacy")} className="bg-green-600 hover:bg-green-700">
                Save Privacy Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Export Your Data</h3>
                    <p className="text-sm text-gray-600">Download a copy of all your account data</p>
                  </div>
                  <Button variant="outline" onClick={exportData}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-red-600">Delete Account</h3>
                    <p className="text-sm text-gray-600">Permanently delete your account and all associated data</p>
                  </div>
                  <Button variant="destructive" onClick={deleteAccount}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
