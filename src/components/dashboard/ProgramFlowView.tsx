
import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  Node,
  Edge,
  useNodesState, 
  useEdgesState, 
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { type Activity } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Check, Lock, Play, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import ActivityItem from './ActivityItem';
import VideoActivity from '../activities/VideoActivity';
import AudioActivity from '../activities/AudioActivity';
import JournalActivity from '../activities/JournalActivity';
import BreathingActivity from '../activities/BreathingActivity';
import WalkActivity from '../activities/WalkActivity';

// Sample program data (replace with real data from API)
const sampleProgram = {
  id: 1,
  name: "Anxiety Management Program",
  description: "A comprehensive program to manage anxiety through various techniques",
  activities: [
    {
      id: 1,
      title: "Introduction to Anxiety Management",
      type: "video",
      description: "Learn about the basics of anxiety and how this program will help you manage it.",
      content: "https://example.com/video1.mp4",
      completed: false,
      unlocked: true
    },
    {
      id: 2,
      title: "Deep Breathing Exercise",
      type: "breathing",
      description: "Practice deep breathing techniques to calm your mind and reduce anxiety.",
      completed: false,
      unlocked: false
    },
    {
      id: 3,
      title: "Guided Meditation Audio",
      type: "audio",
      description: "Listen to this guided meditation to help center your thoughts and reduce stress.",
      content: "https://example.com/audio1.mp3",
      completed: false,
      unlocked: false
    },
    {
      id: 4,
      title: "Journal Your Thoughts",
      type: "journal",
      description: "Write down your thoughts and feelings about your anxiety triggers.",
      completed: false,
      unlocked: false
    },
    {
      id: 5,
      title: "Mindful Walking",
      type: "walk",
      description: "Take a mindful walk outside to clear your mind and connect with nature.",
      completed: false,
      unlocked: false
    }
  ],
  edges: [
    { source: '1', target: '2' },
    { source: '2', target: '3' },
    { source: '2', target: '4' },
    { source: '3', target: '5' },
    { source: '4', target: '5' }
  ]
};

// Custom node component
const ActivityNode = ({ data }: { data: { activity: Activity, isLocked: boolean, isCompleted: boolean, onClick: () => void } }) => {
  const { activity, isLocked, isCompleted, onClick } = data;
  
  return (
    <div 
      className={`w-64 p-4 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer ${
        isLocked ? 'bg-gray-100 opacity-70' : 'bg-white hover:scale-105'
      } ${isCompleted ? 'border-2 border-hopelink-accent' : ''}`}
      onClick={isLocked ? undefined : onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
            isLocked ? 'bg-gray-200' : isCompleted ? 'bg-hopelink-accent/20' : 'bg-hopelink-primary/20'
          }`}>
            {isLocked ? <Lock size={16} className="text-gray-500" /> : 
             isCompleted ? <Check size={16} className="text-hopelink-accent" /> : 
             <Play size={16} className="text-hopelink-primary" />}
          </div>
          <span className="font-medium text-sm">{activity.title}</span>
        </div>
        <div>
          {isLocked && <Lock size={16} className="text-gray-500" />}
          {isCompleted && <Check size={16} className="text-hopelink-accent" />}
        </div>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-2">{activity.description}</p>
      {!isLocked && (
        <div className="mt-3">
          <span className={`text-xs px-2 py-1 rounded-full ${
            isCompleted ? 'bg-hopelink-accent/10 text-hopelink-accent' : 'bg-hopelink-primary/10 text-hopelink-primary'
          }`}>
            {activity.type}
          </span>
        </div>
      )}
    </div>
  );
};

const getActivityComponent = (activity: Activity) => {
  switch (activity.type) {
    case 'video':
      return <VideoActivity videoUrl={activity.content || ""} />;
    case 'audio':
      return <AudioActivity audioUrl={activity.content || ""} />;
    case 'journal':
      return <JournalActivity />;
    case 'breathing':
      return <BreathingActivity />;
    case 'walk':
      return <WalkActivity />;
    default:
      return <div>Activity type not supported</div>;
  }
};

const ProgramFlowView: React.FC = () => {
  const isMobile = useIsMobile();
  const [program] = useState(sampleProgram);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  // Convert activities to nodes
  const initialNodes: Node[] = useMemo(() => program.activities.map((activity) => {
    const isUnlocked = activity.unlocked === true;
    const isCompleted = activity.completed === true;

    return {
      id: activity.id.toString(),
      position: { 
        x: Math.random() * 400, 
        y: Math.random() * 400 
      },
      data: { 
        activity,
        isLocked: !isUnlocked,
        isCompleted,
        onClick: () => isUnlocked ? setSelectedActivity(activity) : null
      },
      type: 'activityNode',
    };
  }), [program.activities]);

  // Convert edges
  const initialEdges: Edge[] = useMemo(() => program.edges.map((edge) => ({
    id: `e${edge.source}-${edge.target}`,
    source: edge.source,
    target: edge.target,
    style: { stroke: '#5EB47C', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#5EB47C',
    },
  })), [program.edges]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const nodeTypes = useMemo(() => ({ activityNode: ActivityNode }), []);

  // Handle activity completion
  const handleCompleteActivity = useCallback((activityId: number) => {
    // Update the activity's completed status
    const updatedProgram = { ...program };
    const activityIndex = updatedProgram.activities.findIndex(a => a.id === activityId);
    
    if (activityIndex !== -1) {
      updatedProgram.activities[activityIndex].completed = true;
      
      // Unlock next activities based on connections
      const activityIdStr = activityId.toString();
      const nextActivityIds = program.edges
        .filter(edge => edge.source === activityIdStr)
        .map(edge => edge.target);
      
      nextActivityIds.forEach(nextId => {
        const nextActivityIndex = updatedProgram.activities.findIndex(a => a.id === parseInt(nextId));
        if (nextActivityIndex !== -1) {
          updatedProgram.activities[nextActivityIndex].unlocked = true;
        }
      });

      // Update nodes to reflect the changes
      setNodes(nodes.map(node => {
        if (node.id === activityIdStr) {
          return {
            ...node,
            data: {
              ...node.data,
              isCompleted: true
            }
          };
        }
        
        if (nextActivityIds.includes(node.id)) {
          return {
            ...node,
            data: {
              ...node.data,
              isLocked: false
            }
          };
        }
        
        return node;
      }));
      
      // Close the activity modal/drawer
      setSelectedActivity(null);
    }
  }, [program, nodes, setNodes]);

  return (
    <div className="w-full h-[500px] border rounded-lg overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>

      {/* Activity Modal/Drawer */}
      {selectedActivity && (
        isMobile ? (
          <Drawer open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
            <DrawerContent className="px-4">
              <DrawerHeader>
                <DrawerTitle>{selectedActivity.title}</DrawerTitle>
              </DrawerHeader>
              <div className="p-4">
                <p className="text-muted-foreground mb-6">{selectedActivity.description}</p>
                <div className="my-6">
                  {getActivityComponent(selectedActivity)}
                </div>
              </div>
              <DrawerFooter>
                <Button 
                  onClick={() => handleCompleteActivity(selectedActivity.id)}
                  className="w-full bg-hopelink-accent hover:bg-hopelink-accent/90"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Mark as Completed
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ) : (
          <Dialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
            <DialogContent className="sm:max-w-xl">
              <DialogHeader>
                <DialogTitle>{selectedActivity.title}</DialogTitle>
              </DialogHeader>
              <div className="p-4">
                <p className="text-muted-foreground mb-6">{selectedActivity.description}</p>
                <div className="my-6">
                  {getActivityComponent(selectedActivity)}
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedActivity(null)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => handleCompleteActivity(selectedActivity.id)}
                  className="bg-hopelink-accent hover:bg-hopelink-accent/90"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Mark as Completed
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )
      )}
    </div>
  );
};

export default ProgramFlowView;
