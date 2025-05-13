
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from 'lucide-react';
import ProgressTracking from '@/components/dashboard/ProgressTracking';
import { mockHealthData, mockAIFeedback, mockUserProfile } from '@/data/mockData';

const ProgressPage = () => {
  return (
    <DashboardLayout activeTab="progress" userProfile={mockUserProfile}>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-6 w-6 text-hopelink-primary" />
            My Progress
          </CardTitle>
          <CardDescription>
            Monitor your health metrics and AI-assisted insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Your M5StickC Plus2 device captures real-time health data that helps track your progress.
            Our AI analyzes patterns in your activities to provide personalized insights and recommendations.
          </p>
        </CardContent>
      </Card>
      
      <ProgressTracking healthData={mockHealthData} aiFeedback={mockAIFeedback} />
    </DashboardLayout>
  );
};

export default ProgressPage;
