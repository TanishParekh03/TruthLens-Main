import React from 'react';
import Icon from '../../../components/AppIcon';

const TimelineVisualization = ({ timeline }) => {
  const formatTime = (dateString) => {
    return new Date(dateString)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getOutletColor = (index) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-orange-500',
      'bg-red-500',
      'bg-indigo-500',
      'bg-pink-500',
      'bg-teal-500'
    ];
    return colors?.[index % colors?.length];
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Clock" size={20} className="text-primary" />
        <h3 className="font-heading font-semibold text-foreground">Story Timeline</h3>
      </div>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
        
        <div className="space-y-4">
          {timeline?.map((event, index) => (
            <div key={index} className="relative flex items-start space-x-4">
              {/* Timeline dot */}
              <div className={`relative z-10 w-8 h-8 rounded-full ${getOutletColor(index)} flex items-center justify-center flex-shrink-0`}>
                <Icon name="Newspaper" size={14} color="white" />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-heading font-medium text-foreground truncate">
                    {event?.outlet}
                  </h4>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground flex-shrink-0 ml-2">
                    <span className="font-caption">{formatDate(event?.timestamp)}</span>
                    <span className="font-data">{formatTime(event?.timestamp)}</span>
                  </div>
                </div>
                
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-2">
                  {event?.headline}
                </p>
                
                {event?.keyUpdate && (
                  <div className="bg-primary/5 border border-primary/20 rounded-md p-2">
                    <p className="font-body text-xs text-primary font-medium">
                      Key Update: {event?.keyUpdate}
                    </p>
                  </div>
                )}
                
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Icon name="Eye" size={12} />
                    <span className="font-caption">{event?.views?.toLocaleString() || '0'} views</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Icon name="Share2" size={12} />
                    <span className="font-caption">{event?.shares?.toLocaleString() || '0'} shares</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="font-data text-lg font-bold text-primary">{timeline?.length}</div>
            <div className="font-caption text-xs text-muted-foreground">Sources</div>
          </div>
          <div>
            <div className="font-data text-lg font-bold text-primary">
              {Math.round((new Date(timeline[timeline.length - 1]?.timestamp) - new Date(timeline[0]?.timestamp)) / (1000 * 60 * 60))}h
            </div>
            <div className="font-caption text-xs text-muted-foreground">Spread Time</div>
          </div>
          <div>
            <div className="font-data text-lg font-bold text-primary">
              {timeline?.reduce((sum, event) => sum + (event?.views || 0), 0)?.toLocaleString()}
            </div>
            <div className="font-caption text-xs text-muted-foreground">Total Views</div>
          </div>
          <div>
            <div className="font-data text-lg font-bold text-primary">
              {timeline?.reduce((sum, event) => sum + (event?.shares || 0), 0)?.toLocaleString()}
            </div>
            <div className="font-caption text-xs text-muted-foreground">Total Shares</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineVisualization;