
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import DoctorSearch from '@/components/dashboard/DoctorSearch';
import TherapeuticProgram from '@/components/dashboard/TherapeuticProgram';
import ProgressTracking from '@/components/dashboard/ProgressTracking';
import MotivationCard from '@/components/dashboard/MotivationCard';
import SuggestedActivity from '@/components/dashboard/SuggestedActivity';
import { mockDoctors, mockProgram, mockUserProfile, mockHealthData, mockAIFeedback, mockDailyMotivation, mockSuggestedActivity } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';
import { Doctor } from '@/types';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [doctors, setDoctors] = useState(mockDoctors);
  const [program, setProgram] = useState(mockProgram);
  const navigate = useNavigate();

  const handleSendInvitation = (doctorId: string) => {
    // In a real app, send this to an API
    setDoctors(doctors.map(doctor => 
      doctor.id === doctorId 
        ? { ...doctor, invitationStatus: 'pending' } 
        : doctor
    ));
  };

  const handleMarkComplete = (activityId: string) => {
    // In a real app, send this to an API
    const updatedActivities = program.activities.map(activity => 
      activity.id === activityId 
        ? { ...activity, completed: true } 
        : activity
    );
    
    // Calculate new progress
    const completed = updatedActivities.filter(a => a.completed).length;
    const total = updatedActivities.length;
    const newProgress = Math.round((completed / total) * 100);
    
    setProgram({
      ...program,
      activities: updatedActivities,
      progress: newProgress
    });
  };

  const handleSelectSuggestedActivity = () => {
    toast({
      title: "Activity suggested",
      description: "This activity will be added to your program soon.",
    });
  };

  const handleEditProfile = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    // In a real app, handle logout
    toast({
      title: "Logged out",
      description: "You have been logged out of your account.",
    });
  };

  return (
    <DashboardLayout activeTab="dashboard" userProfile={mockUserProfile}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2">
                <MotivationCard motivation={mockDailyMotivation} />
              </div>
              <div className="w-full md:w-1/2">
                <SuggestedActivity 
                  activity={mockSuggestedActivity}
                  onSelect={handleSelectSuggestedActivity}
                />
              </div>
            </div>
            
            <TherapeuticProgram 
              program={program} 
              onMarkComplete={handleMarkComplete} 
            />
            
            <ProgressTracking 
              healthData={mockHealthData} 
              aiFeedback={mockAIFeedback} 
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <DoctorSearch 
            doctors={doctors} 
            onSendInvitation={handleSendInvitation} 
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
