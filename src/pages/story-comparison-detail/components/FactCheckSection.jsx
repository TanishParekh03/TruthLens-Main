import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FactCheckSection = ({ factChecks }) => {
  const [expandedCheck, setExpandedCheck] = useState(null);

  const getVerificationColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'verified':
        return 'text-success bg-success/10 border-success/20';
      case 'partially verified':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'false':
        return 'text-error bg-error/10 border-error/20';
      case 'unverified':
        return 'text-muted-foreground bg-muted border-border';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getVerificationIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'verified':
        return 'CheckCircle';
      case 'partially verified':
        return 'AlertTriangle';
      case 'false':
        return 'XCircle';
      case 'unverified':
        return 'HelpCircle';
      default:
        return 'HelpCircle';
    }
  };

  const toggleExpanded = (index) => {
    setExpandedCheck(expandedCheck === index ? null : index);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Shield" size={20} className="text-primary" />
        <h3 className="font-heading font-semibold text-foreground">Fact-Check Analysis</h3>
        <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
          {factChecks?.length} Claims Verified
        </span>
      </div>
      <div className="space-y-4">
        {factChecks?.map((check, index) => (
          <div key={index} className="border border-border rounded-lg overflow-hidden">
            {/* Header */}
            <div className="p-4 bg-muted/30">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-heading font-medium text-foreground mb-1">
                    {check?.claim}
                  </h4>
                  <p className="font-body text-sm text-muted-foreground">
                    Source: {check?.source}
                  </p>
                </div>
                <div className={`flex items-center space-x-1 px-3 py-1 rounded-full border text-sm ml-4 ${getVerificationColor(check?.status)}`}>
                  <Icon 
                    name={getVerificationIcon(check?.status)} 
                    size={14} 
                  />
                  <span className="font-medium">{check?.status}</span>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleExpanded(index)}
                className="mt-2"
                iconName={expandedCheck === index ? "ChevronUp" : "ChevronDown"}
                iconPosition="right"
              >
                {expandedCheck === index ? 'Hide Details' : 'Show Details'}
              </Button>
            </div>

            {/* Expanded Content */}
            {expandedCheck === index && (
              <div className="p-4 border-t border-border">
                <div className="space-y-4">
                  {/* Explanation */}
                  <div>
                    <h5 className="font-heading font-medium text-foreground mb-2">Analysis</h5>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {check?.explanation}
                    </p>
                  </div>

                  {/* Evidence */}
                  {check?.evidence && check?.evidence?.length > 0 && (
                    <div>
                      <h5 className="font-heading font-medium text-foreground mb-2">Supporting Evidence</h5>
                      <div className="space-y-2">
                        {check?.evidence?.map((evidence, evidenceIndex) => (
                          <div key={evidenceIndex} className="flex items-start space-x-2">
                            <Icon name="ExternalLink" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <a
                                href={evidence?.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-body text-sm text-primary hover:text-primary/80 transition-colors duration-200"
                              >
                                {evidence?.title}
                              </a>
                              <p className="font-caption text-xs text-muted-foreground mt-1">
                                {evidence?.source} • {new Date(evidence.date)?.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Methodology */}
                  <div className="bg-primary/5 border border-primary/20 rounded-md p-3">
                    <div className="flex items-start space-x-2">
                      <Icon name="Info" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h6 className="font-heading font-medium text-primary text-sm mb-1">
                          Verification Method
                        </h6>
                        <p className="font-body text-xs text-primary/80">
                          {check?.methodology}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Confidence Score */}
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm text-muted-foreground">Confidence Level</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${check?.confidence}%` }}
                        ></div>
                      </div>
                      <span className="font-data text-sm font-bold text-primary">{check?.confidence}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="font-data text-lg font-bold text-success">
              {factChecks?.filter(check => check?.status?.toLowerCase() === 'verified')?.length}
            </div>
            <div className="font-caption text-xs text-muted-foreground">Verified</div>
          </div>
          <div>
            <div className="font-data text-lg font-bold text-warning">
              {factChecks?.filter(check => check?.status?.toLowerCase() === 'partially verified')?.length}
            </div>
            <div className="font-caption text-xs text-muted-foreground">Partial</div>
          </div>
          <div>
            <div className="font-data text-lg font-bold text-error">
              {factChecks?.filter(check => check?.status?.toLowerCase() === 'false')?.length}
            </div>
            <div className="font-caption text-xs text-muted-foreground">False</div>
          </div>
          <div>
            <div className="font-data text-lg font-bold text-muted-foreground">
              {factChecks?.filter(check => check?.status?.toLowerCase() === 'unverified')?.length}
            </div>
            <div className="font-caption text-xs text-muted-foreground">Unverified</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactCheckSection;