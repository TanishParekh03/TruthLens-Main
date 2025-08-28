import React from 'react';
import Icon from '../../../components/AppIcon';

const SearchResults = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin">
              <Icon name="Loader2" size={24} className="text-primary" />
            </div>
            <span className="text-foreground font-body">Analyzing claim with AI...</span>
          </div>
          <div className="mt-4 space-y-3">
            <div className="h-4 bg-muted rounded animate-pulse"></div>
            <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!result) return null;

  const getCredibilityColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'likely true':
        return 'text-success bg-success/10 border-success/20';
      case 'likely false':
        return 'text-error bg-error/10 border-error/20';
      case 'disputed':
        return 'text-warning bg-warning/10 border-warning/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getConfidenceColor = (score) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 space-y-6">
      {/* Main Result */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCredibilityColor(result?.status)}`}>
                {result?.status}
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground font-body">Confidence:</span>
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getConfidenceColor(result?.confidence)} transition-all duration-300`}
                    style={{ width: `${result?.confidence}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-foreground">{result?.confidence}%</span>
              </div>
            </div>
            <h2 className="font-heading font-semibold text-lg text-foreground mb-3">
              Verification Summary
            </h2>
            <p className="text-foreground font-body leading-relaxed">
              {result?.summary}
            </p>
          </div>
        </div>

        {/* Key Findings */}
        {result?.keyFindings && result?.keyFindings?.length > 0 && (
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="font-heading font-medium text-foreground mb-3">Key Findings</h3>
            <ul className="space-y-2">
              {result?.keyFindings?.map((finding, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground font-body">{finding}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* Sources Section */}
      {result?.sources && result?.sources?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="font-heading font-semibold text-foreground mb-4">
            Supporting Sources & Fact-Checks
          </h3>
          <div className="space-y-4">
            {result?.sources?.map((source, index) => (
              <div key={index} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors duration-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-foreground font-body">{source?.outlet}</h4>
                      <span className={`px-2 py-0.5 rounded text-xs ${getCredibilityColor(source?.credibility)}`}>
                        {source?.credibility}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground font-body mb-2">{source?.excerpt}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{source?.date}</span>
                      <span>•</span>
                      <span>{source?.type}</span>
                    </div>
                  </div>
                  <a
                    href={source?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors duration-200 ml-4"
                  >
                    <Icon name="ExternalLink" size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;