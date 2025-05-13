
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, Mail, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { mockUserProfile } from '@/data/mockData';

const HelpPage = () => {
  return (
    <DashboardLayout activeTab="help" userProfile={mockUserProfile}>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-hopelink-primary" />
            Help & Support
          </CardTitle>
          <CardDescription>
            Find answers to your questions and get help when you need it
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            We're here to help you make the most of your HopeLink experience.
            Browse through frequently asked questions or reach out to our support team.
          </p>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I connect with a doctor?</AccordionTrigger>
                  <AccordionContent>
                    You can connect with a doctor by navigating to the "Find My Doctor" section, browsing the list of available doctors, and sending an invitation to the doctor of your choice. Once the doctor accepts your invitation, they can create a personalized therapeutic program for you.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I complete activities in my program?</AccordionTrigger>
                  <AccordionContent>
                    Each activity in your program can be accessed by clicking on "Show Details". Follow the instructions provided for each activity type (video, audio, journal, walk, breathing), and click "Mark as Complete" when you've finished. Activities need to be completed in order.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How does the M5StickC Plus2 device work?</AccordionTrigger>
                  <AccordionContent>
                    The M5StickC Plus2 is a compact IoT device that tracks your physical metrics during therapeutic activities. Make sure your device is charged and connected to the HopeLink app. The device automatically transmits data that appears in your "Progress" section.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>What do the AI insights mean?</AccordionTrigger>
                  <AccordionContent>
                    The AI insights analyze patterns in your activity data and provide personalized feedback on your progress. These insights include metrics like focus duration, consistency in exercises, and stress levels, along with suggestions to improve your therapeutic experience.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>How can I request a check-in with my doctor?</AccordionTrigger>
                  <AccordionContent>
                    You can request a check-in with your doctor by going to your profile page, finding the "Assigned Doctor" section, and clicking the "Request Check-in" button. Your doctor will receive the request and schedule a time to meet with you.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">Email Support</p>
                  <Button variant="outline" className="flex items-center justify-start gap-2">
                    <Mail size={16} />
                    <span>support@hopelink.com</span>
                  </Button>
                </div>
                
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">Phone Support</p>
                  <Button variant="outline" className="flex items-center justify-start gap-2">
                    <Phone size={16} />
                    <span>1-800-HOPELINK</span>
                  </Button>
                </div>
                
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">Live Chat</p>
                  <Button variant="outline" className="flex items-center justify-start gap-2">
                    <MessageCircle size={16} />
                    <span>Start a Chat</span>
                  </Button>
                </div>
                
                <div className="mt-6 text-sm text-muted-foreground">
                  <p>Support hours: Monday-Friday, 9AM-5PM EST</p>
                  <p className="mt-2">Emergency? Please call your local emergency services or the National Crisis Hotline at 988.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HelpPage;
