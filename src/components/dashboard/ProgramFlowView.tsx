
import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Background,
  Controls,
  MiniMap,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Lock, Play } from 'lucide-react';
import { Activity, ActivityType } from '@/types';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import VideoActivity from '../activities/VideoActivity';
import AudioActivity from '../activities/AudioActivity';
import JournalActivity from '../activities/JournalActivity';
import WalkActivity from '../activities/WalkActivity';
import BreathingActivity from '../activities/BreathingActivity';

interface ProgramFlowViewProps {
  activities: Activity[];
  onActivityComplete: (activityId: string) => void;
}

interface ActivityNodeData {
  activity: Activity;
  isLocked: boolean;
  onActivityComplete: (activityId: string) => void;
}

const ActivityNode = ({ data }: { data: ActivityNodeData }) => {
  const { activity, isLocked, onActivityComplete } = data;
  const [isOpen, setIsOpen] = useState(false);

  const getIcon = (type: ActivityType) => {
    switch (type) {
      case 'video':
        return '🎥';
      case 'audio':
        return '🎵';
      case 'journal':
        return '✍️';
      case 'breathing':
        return '🌬️';
      case 'walk':
        return '🚶';
      default:
        return '📋';
    }
  };

  const handleComplete = () => {
    onActivityComplete(activity.id);
    setIsOpen(false);
  };

  const renderActivityContent = () => {
    switch (activity.type) {
      case 'video':
        return <VideoActivity activityContent={activity.content || ''} />;
      case 'audio':
        return <AudioActivity activityContent={activity.content || ''} />;
      case 'journal':
        return <JournalActivity activityId={activity.id} onComplete={handleComplete} />;
      case 'walk':
        return <WalkActivity duration={activity.duration || 15} onComplete={handleComplete} />;
      case 'breathing':
        return <BreathingActivity duration={activity.duration || 5} onComplete={handleComplete} />;
      default:
        return <div>Activity content not available</div>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card 
          className={`w-48 cursor-pointer transition-all duration-200 hover:shadow-md ${
            isLocked ? 'opacity-50 cursor-not-allowed' : ''
          } ${activity.completed ? 'border-hopelink-accent bg-hopelink-accent/10' : ''}`}
          onClick={isLocked ? undefined : () => setIsOpen(true)}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl">{getIcon(activity.type)}</span>
              {activity.completed ? (
                <CheckCircle className="h-5 w-5 text-hopelink-accent" />
              ) : isLocked ? (
                <Lock className="h-5 w-5 text-gray-400" />
              ) : (
                <Play className="h-5 w-5 text-hopelink-primary" />
              )}
            </div>
            <CardTitle className="text-sm font-medium">{activity.title}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Badge variant={activity.completed ? "default" : isLocked ? "secondary" : "outline"} className="text-xs">
              {activity.completed ? "Completed" : isLocked ? "Locked" : "Available"}
            </Badge>
          </CardContent>
        </Card>
      </DialogTrigger>
      
      {!isLocked && (
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-2xl">{getIcon(activity.type)}</span>
              {activity.title}
            </DialogTitle>
            <DialogDescription>{activity.description}</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {renderActivityContent()}
          </div>
          {!activity.completed && (activity.type === 'video' || activity.type === 'audio') && (
            <div className="flex justify-end mt-4">
              <Button onClick={handleComplete} className="hover-scale">
                Mark as Complete
              </Button>
            </div>
          )}
        </DialogContent>
      )}
    </Dialog>
  );
};

const ProgramFlowView: React.FC<ProgramFlowViewProps> = ({ activities, onActivityComplete }) => {
  // Create nodes from activities
  const createNodes = useCallback(() => {
    return activities.map((activity, index) => {
      const isLocked = index > 0 && !activities[index - 1].completed;
      
      return {
        id: activity.id,
        type: 'default',
        position: { 
          x: (index % 3) * 250, 
          y: Math.floor(index / 3) * 200 
        },
        data: {
          activity,
          isLocked,
          onActivityComplete,
        },
      } as Node<ActivityNodeData>;
    });
  }, [activities, onActivityComplete]);

  // Create edges between sequential activities
  const createEdges = useCallback(() => {
    return activities.slice(0, -1).map((activity, index) => ({
      id: `e${activity.id}-${activities[index + 1].id}`,
      source: activity.id,
      target: activities[index + 1].id,
      type: 'smoothstep',
      animated: !activity.completed,
      style: { 
        stroke: activity.completed ? '#5EB47C' : '#d1d5db',
        strokeWidth: 2,
      },
    })) as Edge[];
  }, [activities]);

  const [nodes, setNodes, onNodesChange] = useNodesState(createNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState(createEdges());

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // Update nodes when activities change
  React.useEffect(() => {
    setNodes(createNodes());
    setEdges(createEdges());
  }, [activities, createNodes, createEdges, setNodes, setEdges]);

  const nodeTypes = {
    default: ActivityNode,
  };

  return (
    <div className="h-[600px] w-full rounded-lg border bg-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default ProgramFlowView;
