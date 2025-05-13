
import { Doctor, Program, UserProfile, HealthData, AIFeedback, DailyMotivation, SuggestedActivity } from "@/types";

export const mockDoctors: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Sarah Johnson",
    speciality: "Cognitive Behavioral Therapy",
    imageUrl: "/placeholder.svg",
    invitationStatus: "accepted"
  },
  {
    id: "doc-2",
    name: "Dr. Michael Chen",
    speciality: "Anxiety & Depression Specialist",
    imageUrl: "/placeholder.svg",
    invitationStatus: "none"
  },
  {
    id: "doc-3",
    name: "Dr. Amara Patel",
    speciality: "Trauma-Informed Therapy",
    imageUrl: "/placeholder.svg",
    invitationStatus: "pending"
  },
  {
    id: "doc-4",
    name: "Dr. James Wilson",
    speciality: "Mindfulness & Stress Reduction",
    imageUrl: "/placeholder.svg",
    invitationStatus: "none"
  },
  {
    id: "doc-5",
    name: "Dr. Elena Rodriguez",
    speciality: "Family & Relationship Therapy",
    imageUrl: "/placeholder.svg",
    invitationStatus: "none"
  }
];

export const mockProgram: Program = {
  id: "prog-1",
  name: "Anxiety Reduction Program",
  description: "A personalized program designed to help you manage anxiety through mindfulness techniques, cognitive restructuring, and gradual exposure.",
  activities: [
    {
      id: "act-1",
      title: "Introduction to Mindfulness",
      description: "Understanding the basics of mindfulness and its benefits for anxiety management.",
      type: "video",
      completed: true,
      content: "https://www.youtube.com/embed/ZToicYcHIOU",
      order: 1
    },
    {
      id: "act-2",
      title: "Guided Relaxation",
      description: "A 10-minute guided relaxation session to practice deep breathing and body awareness.",
      type: "audio",
      completed: true,
      content: "https://example.com/relaxation.mp3",
      duration: 10,
      order: 2
    },
    {
      id: "act-3",
      title: "Reflection Journal",
      description: "Record your thoughts and feelings about situations that trigger anxiety.",
      type: "journal",
      completed: false,
      content: "",
      order: 3
    },
    {
      id: "act-4",
      title: "Mindful Walking Exercise",
      description: "A 15-minute walking meditation to practice mindfulness in movement.",
      type: "walk",
      completed: false,
      content: "",
      duration: 15,
      order: 4
    },
    {
      id: "act-5",
      title: "Box Breathing Technique",
      description: "Learn and practice the box breathing technique to manage acute anxiety symptoms.",
      type: "breathing",
      completed: false,
      content: "",
      duration: 5,
      order: 5
    }
  ],
  progress: 40,
  assignedBy: {
    doctorId: "doc-1",
    doctorName: "Dr. Sarah Johnson"
  }
};

export const mockUserProfile: UserProfile = {
  id: "user-1",
  name: "Alex Morgan",
  imageUrl: "/placeholder.svg",
  age: 32,
  background: "Experiencing anxiety and stress from work",
  assignedDoctorId: "doc-1",
  assignedDoctorName: "Dr. Sarah Johnson"
};

export const mockHealthData: HealthData = {
  heartRate: Array.from({ length: 24 }, () => Math.floor(Math.random() * 20) + 65),
  heartRateTimestamps: Array.from({ length: 24 }, (_, i) => {
    const date = new Date();
    date.setHours(date.getHours() - 24 + i);
    return date.toISOString();
  }),
  accelerometerX: Array.from({ length: 24 }, () => Math.random() * 2 - 1),
  accelerometerY: Array.from({ length: 24 }, () => Math.random() * 2 - 1),
  accelerometerZ: Array.from({ length: 24 }, () => Math.random() * 2 - 1),
  accelerometerTimestamps: Array.from({ length: 24 }, (_, i) => {
    const date = new Date();
    date.setHours(date.getHours() - 24 + i);
    return date.toISOString();
  }),
  gyroscopeX: Array.from({ length: 24 }, () => Math.random() * 2 - 1),
  gyroscopeY: Array.from({ length: 24 }, () => Math.random() * 2 - 1),
  gyroscopeZ: Array.from({ length: 24 }, () => Math.random() * 2 - 1),
  gyroscopeTimestamps: Array.from({ length: 24 }, (_, i) => {
    const date = new Date();
    date.setHours(date.getHours() - 24 + i);
    return date.toISOString();
  }),
  deviceConnected: true,
  lastSyncTime: new Date().toISOString()
};

export const mockAIFeedback: AIFeedback = {
  summary: "Your focus and effort in this activity have improved by 15% this week. The consistency in your breathing exercises is showing positive results.",
  improvements: [
    { metric: "Focus Duration", percentage: 15, direction: "up" },
    { metric: "Breathing Consistency", percentage: 22, direction: "up" },
    { metric: "Stress Levels", percentage: 18, direction: "down" }
  ],
  suggestions: [
    "Try to practice mindfulness for 5 additional minutes each day",
    "Consider doing your breathing exercises in a quieter environment",
    "Your walking pace is ideal - maintain this rhythm for optimal results"
  ]
};

export const mockDailyMotivation: DailyMotivation = {
  quote: "You don't have to control your thoughts. You just have to stop letting them control you.",
  author: "Dan Millman"
};

export const mockSuggestedActivity: SuggestedActivity = {
  title: "Mindful Breathing",
  description: "Take 5 minutes to focus on your breath and clear your mind.",
  type: "breathing",
  duration: 5
};
