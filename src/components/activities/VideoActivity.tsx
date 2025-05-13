
import React from 'react';

interface VideoActivityProps {
  activityContent: string;
}

const VideoActivity: React.FC<VideoActivityProps> = ({ activityContent }) => {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-md">
      <iframe 
        className="absolute inset-0 h-full w-full border-0"
        src={activityContent}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
        title="Activity Video"
      />
    </div>
  );
};

export default VideoActivity;
