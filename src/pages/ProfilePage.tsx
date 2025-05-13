
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Edit } from 'lucide-react';
import ProfileCard from '@/components/dashboard/ProfileCard';
import { mockUserProfile } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const ProfilePage = () => {
  const { toast } = useToast();
  
  const handleEditProfile = () => {
    toast({
      title: "Edit Profile",
      description: "Profile editing will be available soon.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out of your account.",
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
          <p className="text-muted-foreground mb-4">
            Keep your profile information up to date and manage your account settings.
            You can also view your assigned doctor and request check-ins or send messages.
          </p>
        </CardContent>
      </Card>
      
      <ProfileCard 
        profile={mockUserProfile}
        onEditProfile={handleEditProfile}
        onLogout={handleLogout}
      />
    </DashboardLayout>
  );
};

export default ProfilePage;
