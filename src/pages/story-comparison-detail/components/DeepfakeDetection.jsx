import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DeepfakeDetection = ({ mediaAnalysis }) => {
  const [selectedMedia, setSelectedMedia] = useState(0);

  const getRiskColor = (riskLevel) => {
    switch (riskLevel?.toLowerCase()) {
      case 'low':
        return 'text-success bg-success/10 border-success/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'high':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getRiskIcon = (riskLevel) => {
    switch (riskLevel?.toLowerCase()) {
      case 'low':
        return 'Shield';
      case 'medium':
        return 'AlertTriangle';
      case 'high':
        return 'AlertOctagon';
      default:
        return 'HelpCircle';
    }
  };

  if (!mediaAnalysis || mediaAnalysis?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Camera" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-foreground">Media Analysis</h3>
        </div>
        <div className="text-center py-8">
          <Icon name="ImageOff" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="font-body text-muted-foreground">No multimedia content found for analysis</p>
        </div>
      </div>
    );
  }

  const currentMedia = mediaAnalysis?.[selectedMedia];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Camera" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-foreground">Deepfake Detection</h3>
          <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
            {mediaAnalysis?.length} Media Analyzed
          </span>
        </div>
        
        {mediaAnalysis?.length > 1 && (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedMedia(Math.max(0, selectedMedia - 1))}
              disabled={selectedMedia === 0}
              iconName="ChevronLeft"
            >
              Prev
            </Button>
            <span className="font-caption text-sm text-muted-foreground">
              {selectedMedia + 1} of {mediaAnalysis?.length}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedMedia(Math.min(mediaAnalysis?.length - 1, selectedMedia + 1))}
              disabled={selectedMedia === mediaAnalysis?.length - 1}
              iconName="ChevronRight"
              iconPosition="right"
            >
              Next
            </Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Media Preview */}
        <div className="space-y-4">
          <div className="relative bg-muted rounded-lg overflow-hidden">
            {currentMedia?.type === 'image' ? (
              <Image
                src={currentMedia?.url}
                alt={currentMedia?.description || 'Media content'}
                className="w-full h-64 object-cover"
              />
            ) : (
              <div className="w-full h-64 flex items-center justify-center">
                <Icon name="Play" size={48} className="text-muted-foreground" />
              </div>
            )}
            
            {/* Risk Badge */}
            <div className={`absolute top-3 right-3 flex items-center space-x-1 px-3 py-1 rounded-full border ${getRiskColor(currentMedia?.riskLevel)}`}>
              <Icon 
                name={getRiskIcon(currentMedia?.riskLevel)} 
                size={14} 
              />
              <span className="font-medium text-sm">{currentMedia?.riskLevel} Risk</span>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-medium text-foreground mb-2">Media Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-body text-muted-foreground">Type:</span>
                <span className="font-data text-foreground">{currentMedia?.type?.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-muted-foreground">Source:</span>
                <span className="font-body text-foreground">{currentMedia?.source}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-muted-foreground">Upload Date:</span>
                <span className="font-data text-foreground">
                  {new Date(currentMedia.uploadDate)?.toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Results */}
        <div className="space-y-4">
          <div>
            <h4 className="font-heading font-medium text-foreground mb-3">Detection Results</h4>
            
            {/* Overall Score */}
            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-body text-sm text-muted-foreground">Authenticity Score</span>
                <span className="font-data text-lg font-bold text-primary">{currentMedia?.authenticityScore}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${currentMedia?.authenticityScore}%` }}
                ></div>
              </div>
            </div>

            {/* Detection Metrics */}
            <div className="space-y-3">
              {currentMedia?.detectionMetrics?.map((metric, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                  <div className="flex items-center space-x-2">
                    <Icon name="Zap" size={14} className="text-primary" />
                    <span className="font-body text-sm text-foreground">{metric?.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-muted rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          metric?.score >= 80 ? 'bg-success' : 
                          metric?.score >= 60 ? 'bg-warning' : 'bg-error'
                        }`}
                        style={{ width: `${metric?.score}%` }}
                      ></div>
                    </div>
                    <span className="font-data text-xs text-muted-foreground w-8 text-right">
                      {metric?.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analysis Summary */}
          <div className="bg-primary/5 border border-primary/20 rounded-md p-4">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-heading font-medium text-primary text-sm mb-1">
                  Analysis Summary
                </h5>
                <p className="font-body text-xs text-primary/80 leading-relaxed">
                  {currentMedia?.analysisSummary}
                </p>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="pt-4 border-t border-border">
            <button className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
              <Icon name="Settings" size={14} />
              <span className="font-body">View Technical Analysis Details</span>
              <Icon name="ChevronRight" size={12} />
            </button>
          </div>
        </div>
      </div>
      {/* Navigation Dots */}
      {mediaAnalysis?.length > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          {mediaAnalysis?.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedMedia(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === selectedMedia ? 'bg-primary' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DeepfakeDetection;