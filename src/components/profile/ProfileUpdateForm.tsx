
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera, User, Save } from 'lucide-react';
import { UserProfile } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface ProfileUpdateFormProps {
  profile: UserProfile;
  onUpdateProfile: (updatedProfile: Partial<UserProfile>) => void;
}

const ProfileUpdateForm: React.FC<ProfileUpdateFormProps> = ({ profile, onUpdateProfile }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: profile.name || '',
    firstName: profile.name?.split(' ')[0] || '',
    lastName: profile.name?.split(' ')[1] || '',
    age: profile.age?.toString() || '',
    gender: '',
    email: '',
    phone: '',
    assignedDoctorName: profile.assignedDoctorName || '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = () => {
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    onUpdateProfile({
      name: fullName,
      age: formData.age ? parseInt(formData.age) : undefined,
    });
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleImageUpload = () => {
    toast({
      title: "Upload Feature",
      description: "Image upload functionality will be available soon.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-hopelink-primary" />
          Update Profile
        </CardTitle>
        <CardDescription>
          Keep your personal information up to date
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Picture Section */}
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-4 border-hopelink-accent/20">
            <AvatarImage src={profile.imageUrl} alt={profile.name} />
            <AvatarFallback className="bg-hopelink-primary text-white text-lg">
              {profile.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Button variant="outline" onClick={handleImageUpload} className="hover-scale">
            <Camera size={16} className="mr-2" />
            Upload Photo
          </Button>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder="Enter your first name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              placeholder="Enter your age"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="assignedDoctor">Assigned Doctor</Label>
          <Input
            id="assignedDoctor"
            value={formData.assignedDoctorName}
            readOnly
            className="bg-gray-50"
            placeholder="No doctor assigned yet"
          />
        </div>

        <Button onClick={handleSaveChanges} className="w-full hover-scale">
          <Save size={16} className="mr-2" />
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileUpdateForm;
