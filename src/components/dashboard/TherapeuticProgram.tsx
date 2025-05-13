
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Activity as ActivityIcon, Video, Music, Edit, Clock, Wind } from 'lucide-react';
import { Activity, Program } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ActivityItem from './ActivityItem';

interface TherapeuticProgramProps {
  program?: Program;
  onMarkComplete: (activityId: string) => void;
}

const TherapeuticProgram = ({ program, onMarkComplete }: TherapeuticProgramProps) => {
  if (!program) {
    return (
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-hopelink-primary flex items-center gap-2">
            <ActivityIcon size={20} />
            My Therapeutic Program
          </CardTitle>
          <CardDescription>Your personalized path to wellbeing</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-8">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">No program assigned yet. Please wait for your doctor.</p>
            <ActivityIcon size={48} className="mx-auto text-muted-foreground opacity-50" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const nextActivity = program.activities.find((activity) => !activity.completed);

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-hopelink-primary flex items-center gap-2">
              <ActivityIcon size={20} />
              {program.name}
            </CardTitle>
            <CardDescription className="mt-1">
              Assigned by {program.assignedBy.doctorName}
            </CardDescription>
          </div>
          <div className="text-right">
            <span className="text-sm font-medium">{program.progress}% complete</span>
            <Progress value={program.progress} className="h-2 w-24 mt-1" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-6">{program.description}</p>
        
        <Tabs defaultValue="next" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="next">Next Activity</TabsTrigger>
            <TabsTrigger value="all">All Activities</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="next" className="mt-4">
            {nextActivity ? (
              <ActivityItem activity={nextActivity} onMarkComplete={onMarkComplete} />
            ) : (
              <div className="text-center p-8">
                <p className="font-medium text-hopelink-primary">All activities completed!</p>
                <p className="text-muted-foreground mt-2">Great job! Your doctor will review your progress.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="all" className="mt-4 space-y-4">
            {program.activities.map((activity) => (
              <ActivityItem 
                key={activity.id}
                activity={activity}
                onMarkComplete={onMarkComplete}
                disabled={activity.order > 1 && 
                  !program.activities.find(a => a.order === activity.order - 1)?.completed}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="completed" className="mt-4 space-y-4">
            {program.activities.filter(activity => activity.completed).map((activity) => (
              <ActivityItem 
                key={activity.id}
                activity={activity}
                onMarkComplete={onMarkComplete}
                showCompleteButton={false}
              />
            ))}
            {program.activities.filter(activity => activity.completed).length === 0 && (
              <div className="text-center p-8">
                <p className="text-muted-foreground">No completed activities yet.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TherapeuticProgram;
