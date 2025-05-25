
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Shield } from 'lucide-react';
import ProfileUpdateForm from '@/components/profile/ProfileUpdateForm';
import PasswordResetForm from '@/components/profile/PasswordResetForm';
import { mockUserProfile } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { UserProfile } from '@/types';

const ProfilePage = () => {
  const { toast } = useToast();
  
  const handleUpdateProfile = (updatedProfile: Partial<UserProfile>) => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  return (
    <DashboardLayout activeTab="profile" userProfile={mockUserProfile}>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-6 w-6 text-hopelink-primary" />
            My Profile
          </CardTitle>
          <CardDescription>
            Manage your personal information and account settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Keep your profile information up to date and manage your account security settings.
          </p>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User size={16} />
            Update Profile
          </TabsTrigger>
          <TabsTrigger value="password" className="flex items-center gap-2">
            <Shield size={16} />
            Reset Password
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <ProfileUpdateForm 
            profile={mockUserProfile}
            onUpdateProfile={handleUpdateProfile}
          />
        </TabsContent>
        
        <TabsContent value="password" className="space-y-6">
          <PasswordResetForm />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ProfilePage;
