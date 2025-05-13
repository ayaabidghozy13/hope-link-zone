
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope } from 'lucide-react';
import DoctorSearch from '@/components/dashboard/DoctorSearch';
import { mockDoctors, mockUserProfile } from '@/data/mockData';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState(mockDoctors);

  const handleSendInvitation = (doctorId: string) => {
    setDoctors(doctors.map(doctor => 
      doctor.id === doctorId 
        ? { ...doctor, invitationStatus: 'pending' } 
        : doctor
    ));
  };

  return (
    <DashboardLayout activeTab="doctors" userProfile={mockUserProfile}>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-hopelink-primary" />
            Find My Doctor
          </CardTitle>
          <CardDescription>
            Search and connect with mental health professionals that suit your needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            HopeLink connects you with licensed mental health professionals specialized in various therapeutic approaches.
            Send a connection invitation to start your therapeutic journey with a doctor of your choice.
          </p>
        </CardContent>
      </Card>
      
      <DoctorSearch doctors={doctors} onSendInvitation={handleSendInvitation} />
    </DashboardLayout>
  );
};

export default DoctorsPage;
