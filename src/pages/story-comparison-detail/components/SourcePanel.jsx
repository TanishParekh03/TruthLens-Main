import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SourcePanel = ({ source, isActive, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div 
      className={`bg-card border rounded-lg transition-all duration-200 ${
        isActive ? 'border-primary shadow-card' : 'border-border hover:border-primary/50'
      }`}
      onClick={onSelect}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Image 
              src={source?.outlet?.logo} 
              alt={`${source?.outlet?.name} logo`}
              className="w-8 h-8 rounded object-cover"
            />
            <div>
              <h3 className="font-heading font-semibold text-foreground">{source?.outlet?.name}</h3>
              <p className="font-caption text-xs text-muted-foreground">{formatDate(source?.publishedAt)}</p>
            </div>
          </div>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border text-xs ${getCredibilityColor(source?.credibilityStatus)}`}>
            <Icon 
              name={getCredibilityIcon(source?.credibilityStatus)} 
              size={12} 
            />
            <span className="font-medium">{source?.credibilityStatus}</span>
          </div>
        </div>
        
        <h2 className="font-heading font-bold text-lg text-foreground leading-tight mb-2">
          {source?.headline}
        </h2>
        
        <p className="font-body text-sm text-muted-foreground leading-relaxed">
          {source?.summary}
        </p>
      </div>
      {/* Content */}
      <div className="p-4">
        <div className="space-y-3">
          {source?.keyPoints?.map((point, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Icon name="ArrowRight" size={14} className="text-primary mt-0.5 flex-shrink-0" />
              <span className="font-body text-sm text-foreground">{point}</span>
            </div>
          ))}
        </div>

        {/* Discrepancies */}
        {source?.discrepancies && source?.discrepancies?.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <button
              onClick={(e) => {
                e?.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="flex items-center space-x-2 text-sm text-warning hover:text-warning/80 transition-colors duration-200"
            >
              <Icon name="AlertTriangle" size={16} />
              <span className="font-body font-medium">Factual Discrepancies ({source?.discrepancies?.length})</span>
              <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={14} />
            </button>
            
            {isExpanded && (
              <div className="mt-3 space-y-2">
                {source?.discrepancies?.map((discrepancy, index) => (
                  <div key={index} className="bg-warning/5 border border-warning/20 rounded-md p-3">
                    <p className="font-body text-sm text-foreground mb-1">{discrepancy?.claim}</p>
                    <p className="font-body text-xs text-muted-foreground">{discrepancy?.explanation}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <a
            href={source?.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors duration-200"
            onClick={(e) => e?.stopPropagation()}
          >
            <Icon name="ExternalLink" size={14} />
            <span className="font-body">Read Original</span>
          </a>
          
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Clock" size={12} />
            <span className="font-caption">Updated {formatDate(source?.lastUpdated)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourcePanel;