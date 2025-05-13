
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import { DailyMotivation } from '@/types';

interface MotivationCardProps {
  motivation: DailyMotivation;
}

const MotivationCard: React.FC<MotivationCardProps> = ({ motivation }) => {
  return (
    <Card className="shadow-sm bg-gradient-to-br from-hopelink-primary/5 to-hopelink-accent/5 border border-hopelink-primary/10 hover-scale">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <Quote size={24} className="text-hopelink-primary opacity-70 mb-2" />
          <p className="text-lg font-medium italic">{motivation.quote}</p>
          <p className="text-sm text-muted-foreground mt-2">— {motivation.author}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotivationCard;
