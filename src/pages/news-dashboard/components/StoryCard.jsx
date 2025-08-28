import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const StoryCard = ({ story, isListView = false }) => {
  const getCredibilityColor = (status) => {
    switch (status) {
      case 'Likely True':
        return 'text-success bg-success/10 border-success/20';
      case 'Likely False':
        return 'text-error bg-error/10 border-error/20';
      case 'Disputed':
        return 'text-warning bg-warning/10 border-warning/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getCredibilityIcon = (status) => {
    switch (status) {
      case 'Likely True':
        return 'CheckCircle';
      case 'Likely False':
        return 'XCircle';
      case 'Disputed':
        return 'AlertTriangle';
      default:
        return 'HelpCircle';
    }
  };

  if (isListView) {
    return (
      <Link
        to={`/story-comparison-detail?id=${story?.id}`}
        className="block bg-card border border-border rounded-lg p-6 hover:shadow-card transition-all duration-200 hover:border-primary/20 group"
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-24 h-16 overflow-hidden rounded-md">
            <Image
              src={story?.image}
              alt={story?.headline}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-heading font-semibold text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
                {story?.headline}
              </h3>
              <div className={`ml-4 flex-shrink-0 px-3 py-1 rounded-full border text-sm font-semibold ${getCredibilityColor(story?.credibilityStatus)}`}>
                <div className="flex items-center space-x-1">
                  <Icon name={getCredibilityIcon(story?.credibilityStatus)} size={14} />
                  <span>{story?.credibilityStatus}</span>
                </div>
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm font-body mb-3 line-clamp-2">
              {story?.summary}
            </p>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-4">
                <span className="font-medium">{story?.source}</span>
                <span>{story?.publishedAt}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Eye" size={12} />
                <span>{story?.views}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/story-comparison-detail?id=${story?.id}`}
      className="block bg-card border border-border rounded-lg overflow-hidden hover:shadow-card transition-all duration-200 hover:border-primary/20 group"
    >
      <div className="aspect-video overflow-hidden">
        <Image
          src={story?.image}
          alt={story?.headline}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className={`px-3 py-1 rounded-full border text-sm font-semibold ${getCredibilityColor(story?.credibilityStatus)}`}>
            <div className="flex items-center space-x-1">
              <Icon name={getCredibilityIcon(story?.credibilityStatus)} size={14} />
              <span>{story?.credibilityStatus}</span>
            </div>
          </div>
        </div>
        
        <h3 className="font-heading font-semibold text-lg text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {story?.headline}
        </h3>
        
        <p className="text-muted-foreground text-sm font-body mb-4 line-clamp-3">
          {story?.summary}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span className="font-medium">{story?.source}</span>
            <span>{story?.publishedAt}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Eye" size={12} />
            <span>{story?.views}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StoryCard;