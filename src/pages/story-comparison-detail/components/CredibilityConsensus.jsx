import React from 'react';
import Icon from '../../../components/AppIcon';

const CredibilityConsensus = ({ consensus }) => {
  const getCredibilityColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'likely true':
        return 'text-success bg-success/10 border-success/20';
      case 'disputed':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'likely false':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getCredibilityIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'likely true':
        return 'CheckCircle';
      case 'disputed':
        return 'AlertTriangle';
      case 'likely false':
        return 'XCircle';
      default:
        return 'HelpCircle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-start space-x-4">
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${getCredibilityColor(consensus?.status)}`}>
          <Icon 
            name={getCredibilityIcon(consensus?.status)} 
            size={20} 
            className={getCredibilityColor(consensus?.status)?.split(' ')?.[0]} 
          />
          <span className="font-heading font-bold text-lg">{consensus?.status}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-heading font-semibold text-foreground">Confidence Score:</span>
            <span className="font-data text-lg font-bold text-primary">{consensus?.confidenceScore}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${consensus?.confidenceScore}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-heading font-semibold text-foreground mb-2">AI Analysis Summary</h3>
        <p className="font-body text-muted-foreground leading-relaxed">{consensus?.summary}</p>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <button className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors duration-200">
          <Icon name="Info" size={16} />
          <span className="font-body">Learn about our scoring methodology</span>
        </button>
      </div>
    </div>
  );
};

export default CredibilityConsensus;