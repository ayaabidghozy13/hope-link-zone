
import React, { useState, useCallback } from 'react';
import { 
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection,
  ConnectionLineType,
  NodeTypes
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Program, Activity } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { CheckCircle, LockClosed, Play, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import ActivityItem from './ActivityItem';
import VideoActivity from '../activities/VideoActivity';
import AudioActivity from '../activities/AudioActivity';
import JournalActivity from '../activities/JournalActivity';
import WalkActivity from '../activities/WalkActivity';
import BreathingActivity from '../activities/BreathingActivity';

interface ProgramFlowViewProps {
  program: Program;
  onMarkComplete: (activityId: string) => void;
}

// Custom node component for activities
const ActivityNode = ({ data }: { data: any }) => {
  const activity = data.activity;
  const isLocked = data.isLocked;
  const isCompleted = activity.completed;

  return (
    <div 
      className={`p-3 rounded-md shadow-sm min-w-[180px] border transition-all ${
        isLocked 
          ? 'bg-gray-100 border-gray-300 opacity-70 cursor-not-allowed' 
          : isCompleted
            ? 'bg-hopelink-accent/20 border-hopelink-accent cursor-default'
            : 'bg-white border-hopelink-primary/30 hover:border-hopelink-primary cursor-pointer'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {data.icon}
          <span className="font-medium text-sm">{activity.title}</span>
        </div>
        <div>
          {isLocked && <LockClosed size={16} className="text-gray-500" />}
          {isCompleted && <CheckCircle size={16} className="text-hopelink-accent" />}
        </div>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-2">{activity.description}</p>
    </div>
  );
};

const nodeTypes: NodeTypes = {
  activityNode: ActivityNode,
};

const ProgramFlowView = ({ program, onMarkComplete }: ProgramFlowViewProps) => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const isMobile = useIsMobile();
  
  // Initialize nodes based on activities
  const initialNodes: Node[] = program.activities.map((activity) => {
    // Determine if node should be locked
    const isLocked = activity.order > 1 && 
      !program.activities.find(a => a.order === activity.order - 1)?.completed;
    
    // Get appropriate icon for activity type
    let icon;
    switch (activity.type) {
      case 'video':
        icon = <Play size={16} className="text-blue-500" />;
        break;
      case 'audio':
        icon = <Play size={16} className="text-purple-500" />;
        break;
      case 'journal':
        icon = <Play size={16} className="text-yellow-500" />;
        break;
      case 'walk':
        icon = <Play size={16} className="text-green-500" />;
        break;
      case 'breathing':
        icon = <Play size={16} className="text-cyan-500" />;
        break;
      default:
        icon = <Play size={16} className="text-hopelink-primary" />;
    }
    
    return {
      id: activity.id,
      type: 'activityNode',
      position: { x: 100 * activity.order, y: 50 * activity.order },
      data: { 
        activity, 
        isLocked,
        icon,
        onClick: () => !isLocked && !activity.completed && setSelectedActivity(activity)
      },
    };
  });

  // Create edges between activities based on order
  const initialEdges: Edge[] = program.activities
    .filter((_, index) => index < program.activities.length - 1)
    .map((activity, index) => ({
      id: `e-${activity.id}-${program.activities[index + 1].id}`,
      source: activity.id,
      target: program.activities[index + 1].id,
      type: 'smoothstep',
      animated: !program.activities[index + 1].completed, // animate if target not completed
    }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeClick = (event: React.MouseEvent, node: Node) => {
    if (node.data.isLocked || node.data.activity.completed) {
      return;
    }
    setSelectedActivity(node.data.activity);
  };

  const handleCompleteActivity = (activityId: string) => {
    onMarkComplete(activityId);
    setSelectedActivity(null);
    
    // Update nodes to reflect completed status and unlock next nodes
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === activityId) {
          // Mark this node as completed
          return {
            ...node,
            data: {
              ...node.data,
              activity: {
                ...node.data.activity,
                completed: true
              }
            }
          };
        }
        
        // Check if this node should be unlocked because previous node was completed
        const activity = program.activities.find(a => a.id === node.id);
        const previousActivity = activity && program.activities.find(a => a.order === activity.order - 1);
        
        if (previousActivity && previousActivity.id === activityId) {
          return {
            ...node,
            data: {
              ...node.data,
              isLocked: false
            }
          };
        }
        
        return node;
      })
    );
  };

  const renderActivityContent = () => {
    if (!selectedActivity) return null;

    switch (selectedActivity.type) {
      case 'video':
        return <VideoActivity activityContent={selectedActivity.content} />;
      case 'audio':
        return <AudioActivity activityContent={selectedActivity.content} />;
      case 'journal':
        return (
          <JournalActivity 
            activityId={selectedActivity.id} 
            onComplete={() => handleCompleteActivity(selectedActivity.id)} 
          />
        );
      case 'walk':
        return (
          <WalkActivity 
            duration={selectedActivity.duration || 10} 
            onComplete={() => handleCompleteActivity(selectedActivity.id)} 
          />
        );
      case 'breathing':
        return (
          <BreathingActivity 
            duration={selectedActivity.duration || 5} 
            onComplete={() => handleCompleteActivity(selectedActivity.id)} 
          />
        );
      default:
        return <div>Unsupported activity type</div>;
    }
  };

  const ActivityModal = () => {
    if (!selectedActivity) return null;

    if (isMobile) {
      return (
        <Drawer open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
          <DrawerContent className="max-h-[85vh]">
            <DrawerHeader>
              <DrawerTitle>{selectedActivity.title}</DrawerTitle>
              <p className="text-sm text-muted-foreground mt-2">{selectedActivity.description}</p>
            </DrawerHeader>
            <div className="p-4">
              {renderActivityContent()}
            </div>
            <DrawerFooter>
              <Button 
                onClick={() => handleCompleteActivity(selectedActivity.id)}
                className="w-full bg-hopelink-accent hover:bg-hopelink-accent/90"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as Completed
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" className="w-full">
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      );
    }

    return (
      <Dialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedActivity.title}</DialogTitle>
            <p className="text-sm text-muted-foreground mt-2">{selectedActivity.description}</p>
          </DialogHeader>
          <div className="my-4">
            {renderActivityContent()}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button 
              onClick={() => handleCompleteActivity(selectedActivity.id)}
              className="bg-hopelink-accent hover:bg-hopelink-accent/90"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Completed
            </Button>
            <Button variant="outline" onClick={() => setSelectedActivity(null)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="w-full h-[600px] border rounded-md bg-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        connectionLineType={ConnectionLineType.SmoothStep}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
      <ActivityModal />
    </div>
  );
};

export default ProgramFlowView;
