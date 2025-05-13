
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Heart, Activity as ActivityIcon, Zap } from 'lucide-react';
import { HealthData, AIFeedback } from '@/types';
import { HeartRateChart } from '../charts/HeartRateChart';
import { AccelerometerChart } from '../charts/AccelerometerChart';
import { GyroscopeChart } from '../charts/GyroscopeChart';
import { Badge } from '@/components/ui/badge';

interface ProgressTrackingProps {
  healthData: HealthData;
  aiFeedback: AIFeedback;
}

const ProgressTracking: React.FC<ProgressTrackingProps> = ({ healthData, aiFeedback }) => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-hopelink-primary flex items-center gap-2">
              <BarChart size={20} />
              Progress & AI Tracking
            </CardTitle>
            <CardDescription>Monitor your health metrics and performance</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant={healthData.deviceConnected ? "default" : "outline"}
              className={healthData.deviceConnected ? "bg-hopelink-accent" : ""}
            >
              {healthData.deviceConnected ? "Device Connected" : "Device Disconnected"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Feedback Card */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Zap size={16} className="text-hopelink-primary" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{aiFeedback.summary}</p>
              
              <div className="space-y-3">
                {aiFeedback.improvements.map((improvement, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{improvement.metric}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${
                        improvement.direction === 'up' 
                          ? 'text-hopelink-accent' 
                          : 'text-hopelink-warning'
                      }`}>
                        {improvement.direction === 'up' ? '+' : '-'}{improvement.percentage}%
                      </span>
                      <div className={`w-4 h-4 flex items-center justify-center rounded-full ${
                        improvement.direction === 'up' 
                          ? 'bg-hopelink-accent/20 text-hopelink-accent' 
                          : 'bg-hopelink-warning/20 text-hopelink-warning'
                      }`}>
                        {improvement.direction === 'up' ? '↑' : '↓'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Suggestions:</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {aiFeedback.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="inline-block rounded-full w-4 h-4 bg-hopelink-primary/20 text-hopelink-primary text-center flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
          
          {/* Heart Rate Chart */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Heart size={16} className="text-hopelink-warning" />
                Heart Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <HeartRateChart 
                data={healthData.heartRate} 
                timestamps={healthData.heartRateTimestamps} 
              />
            </CardContent>
          </Card>
          
          {/* Accelerometer Data */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <ActivityIcon size={16} className="text-hopelink-accent" />
                Accelerometer Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AccelerometerChart 
                dataX={healthData.accelerometerX}
                dataY={healthData.accelerometerY}
                dataZ={healthData.accelerometerZ}
                timestamps={healthData.accelerometerTimestamps}
              />
            </CardContent>
          </Card>
          
          {/* Gyroscope Data */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <ActivityIcon size={16} className="text-hopelink-primary" />
                Gyroscope Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <GyroscopeChart 
                dataX={healthData.gyroscopeX}
                dataY={healthData.gyroscopeY}
                dataZ={healthData.gyroscopeZ}
                timestamps={healthData.gyroscopeTimestamps}
              />
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTracking;
