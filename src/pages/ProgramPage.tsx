
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import TherapeuticProgram from '@/components/dashboard/TherapeuticProgram';
import { mockProgram, mockUserProfile } from '@/data/mockData';

const ProgramPage = () => {
  const [program, setProgram] = useState(mockProgram);

  const handleMarkComplete = (activityId: string) => {
    const updatedActivities = program.activities.map(activity => 
      activity.id === activityId 
        ? { ...activity, completed: true } 
        : activity
    );
    
    const completed = updatedActivities.filter(a => a.completed).length;
    const total = updatedActivities.length;
    const newProgress = Math.round((completed / total) * 100);
    
    setProgram({
      ...program,
      activities: updatedActivities,
      progress: newProgress
    });
  };

  return (
    <DashboardLayout activeTab="program" userProfile={mockUserProfile}>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-hopelink-primary" />
            My Therapeutic Program
          </CardTitle>
          <CardDescription>
            Track and complete the activities in your personalized program
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Your therapeutic program is designed specifically for your needs by your doctor.
            Complete activities in order and track your progress to improve your mental wellbeing.
          </p>
        </CardContent>
      </Card>
      
      <TherapeuticProgram program={program} onMarkComplete={handleMarkComplete} />
    </DashboardLayout>
  );
};

export default ProgramPage;
