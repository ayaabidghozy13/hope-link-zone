
// Doctor types
export interface Doctor {
  id: string;
  name: string;
  speciality: string;
  imageUrl: string;
  invitationStatus?: 'none' | 'pending' | 'accepted';
}

// Therapeutic program types
export type ActivityType = 'video' | 'audio' | 'journal' | 'walk' | 'breathing';

export interface Activity {
  id: string;
  title: string;
  description: string;
  type: ActivityType;
  completed: boolean;
  content: string;
  duration?: number; // in minutes for walks, breathing
  order: number;
}

export interface Program {
  id: string;
  name: string;
  description: string;
  activities: Activity[];
  progress: number; // 0-100
  assignedBy: {
    doctorId: string;
    doctorName: string;
  };
}

// User profile
export interface UserProfile {
  id: string;
  name: string;
  imageUrl: string;
  age?: number;
  background?: string;
  assignedDoctorId?: string;
  assignedDoctorName?: string;
}

// Progress tracking
export interface HealthData {
  heartRate: number[];
  heartRateTimestamps: string[];
  accelerometerX: number[];
  accelerometerY: number[];
  accelerometerZ: number[];
  accelerometerTimestamps: string[];
  gyroscopeX: number[];
  gyroscopeY: number[];
  gyroscopeZ: number[];
  gyroscopeTimestamps: string[];
  deviceConnected: boolean;
  lastSyncTime?: string;
}

// AI Feedback
export interface AIFeedback {
  summary: string;
  improvements: {
    metric: string;
    percentage: number;
    direction: 'up' | 'down';
  }[];
  suggestions: string[];
}

// Motivation 
export interface DailyMotivation {
  quote: string;
  author: string;
}

export interface SuggestedActivity {
  title: string;
  description: string;
  type: ActivityType;
  duration: number;
}
