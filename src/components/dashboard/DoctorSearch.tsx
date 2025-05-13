
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Clock, Check, Send } from 'lucide-react';
import { Doctor } from '@/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface DoctorSearchProps {
  doctors: Doctor[];
  onSendInvitation: (doctorId: string) => void;
}

const DoctorSearch = ({ doctors, onSendInvitation }: DoctorSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const { toast } = useToast();

  const filteredDoctors = doctors.filter((doctor) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      doctor.name.toLowerCase().includes(searchTermLower) ||
      doctor.speciality.toLowerCase().includes(searchTermLower)
    );
  });

  const handleSendInvitation = () => {
    if (selectedDoctor) {
      onSendInvitation(selectedDoctor.id);
      toast({
        title: "Invitation Sent",
        description: `Your invitation has been sent to ${selectedDoctor.name}.`,
      });
    }
  };

  const getInvitationStatus = (status: string | undefined) => {
    switch (status) {
      case 'pending':
        return (
          <div className="flex items-center text-hopelink-warning">
            <Clock size={16} className="mr-1" />
            <span>Pending</span>
          </div>
        );
      case 'accepted':
        return (
          <div className="flex items-center text-hopelink-accent">
            <Check size={16} className="mr-1" />
            <span>Connected</span>
          </div>
        );
      default:
        return (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="w-full hover-scale">
                <Send size={16} className="mr-2" />
                Send Invitation
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Send invitation?</AlertDialogTitle>
                <AlertDialogDescription>
                  You're about to send a connection invitation to {selectedDoctor?.name}. They will be able to view your profile and assign you a therapeutic program.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSendInvitation}>Send Invitation</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-hopelink-primary flex items-center gap-2">
          <Search size={20} />
          Find My Doctor
        </CardTitle>
        <CardDescription>Connect with mental health professionals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="h-full hover-scale">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={doctor.imageUrl} alt={doctor.name} />
                      <AvatarFallback className="bg-hopelink-primary text-white">
                        {doctor.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{doctor.name}</CardTitle>
                      <CardDescription className="text-xs">{doctor.speciality}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="pt-2">
                  <div className="w-full" onMouseEnter={() => setSelectedDoctor(doctor)}>
                    {getInvitationStatus(doctor.invitationStatus)}
                  </div>
                </CardFooter>
              </Card>
            ))}
            
            {filteredDoctors.length === 0 && (
              <div className="col-span-full text-center p-4 text-muted-foreground">
                No doctors found matching your search criteria.
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorSearch;
