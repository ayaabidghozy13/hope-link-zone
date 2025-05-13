
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, LogOut, MessageCircle, Calendar } from 'lucide-react';
import { UserProfile } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface ProfileCardProps {
  profile: UserProfile;
  onEditProfile: () => void;
  onLogout: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onEditProfile, onLogout }) => {
  const { toast } = useToast();
  
  const handleRequestCheckIn = () => {
    toast({
      title: "Check-in requested",
      description: `Your check-in request has been sent to ${profile.assignedDoctorName}.`,
    });
  };

  const handleMessageDoctor = () => {
    toast({
      title: "Message sent",
      description: `Your message has been sent to ${profile.assignedDoctorName}.`,
    });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-hopelink-primary flex items-center gap-2">
          <User size={20} />
          My Profile
        </CardTitle>
        <CardDescription>Your personal information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <Avatar className="h-24 w-24 border-4 border-hopelink-accent/20">
            <AvatarImage src={profile.imageUrl} alt={profile.name} />
            <AvatarFallback className="bg-hopelink-primary text-white text-lg">
              {profile.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            {profile.age && <p className="text-muted-foreground">Age: {profile.age}</p>}
            {profile.background && <p className="text-muted-foreground">{profile.background}</p>}
          </div>
        </div>
        
        {profile.assignedDoctorName && (
          <div className="space-y-2 pt-4 border-t">
            <h3 className="font-medium">Assigned Doctor</h3>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-hopelink-primary/20">
                <AvatarFallback className="bg-hopelink-primary text-white">
                  {profile.assignedDoctorName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{profile.assignedDoctorName}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <Button variant="outline" onClick={handleMessageDoctor} className="hover-scale">
                <MessageCircle size={16} className="mr-2" />
                Message
              </Button>
              <Button variant="outline" onClick={handleRequestCheckIn} className="hover-scale">
                <Calendar size={16} className="mr-2" />
                Request Check-in
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={onEditProfile} className="hover-scale">
          Edit Profile
        </Button>
        <Button variant="destructive" onClick={onLogout} className="hover-scale">
          <LogOut size={16} className="mr-2" />
          Logout
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
