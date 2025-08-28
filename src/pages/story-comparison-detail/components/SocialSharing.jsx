import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialSharing = ({ storyData }) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = window.location?.href;
  const shareTitle = `TruthLens Analysis: ${storyData?.title}`;
  const shareText = `Verified news analysis with ${storyData?.credibilityStatus} credibility rating. Check the facts before sharing! #TruthLens #FactCheck`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard?.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const shareOptions = [
    {
      name: 'Twitter',
      icon: 'Twitter',
      color: 'hover:bg-blue-50 hover:text-blue-600',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'hover:bg-blue-50 hover:text-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'hover:bg-blue-50 hover:text-blue-800',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'WhatsApp',
      icon: 'MessageCircle',
      color: 'hover:bg-green-50 hover:text-green-600',
      url: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`
    }
  ];

  const handleShare = (url) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Share2" size={20} className="text-primary" />
        <h3 className="font-heading font-semibold text-foreground">Share Verified Information</h3>
      </div>
     
      <div className="bg-warning/10 border border-warning/20 rounded-md p-4 mb-4">
        <div className="flex items-start space-x-2">
          <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-heading font-medium text-warning text-sm mb-1">
              Share Responsibly
            </h4>
            <p className="font-body text-xs text-warning/80 leading-relaxed">
              When sharing this story, include our credibility analysis to help others make informed decisions. 
              Always verify information before sharing on social media.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="font-body text-sm text-muted-foreground mb-2 block">
          Suggested Share Text (includes credibility info):
        </label>
        <div className="bg-muted/30 border border-border rounded-md p-3">
          <p className="font-body text-sm text-foreground leading-relaxed">
            {shareText}
          </p>
        </div>
      </div>
    
      <div className="space-y-3 mb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {shareOptions?.map((option) => (
            <Button
              key={option?.name}
              variant="outline"
              size="sm"
              onClick={() => handleShare(option?.url)}
              className={`transition-colors duration-200 ${option?.color}`}
              iconName={option?.icon}
              iconPosition="left"
            >
              {option?.name}
            </Button>
          ))}
        </div>
      </div>
  
      <div className="pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-muted/30 border border-border rounded-md px-3 py-2">
            <p className="font-data text-sm text-muted-foreground truncate">
              {shareUrl}
            </p>
          </div>
          <Button
            variant={copied ? "success" : "outline"}
            size="sm"
            onClick={handleCopyLink}
            iconName={copied ? "Check" : "Copy"}
            iconPosition="left"
          >
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
      </div>
   
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="font-data text-lg font-bold text-primary">{storyData?.shareCount || 0}</div>
            <div className="font-caption text-xs text-muted-foreground">Total Shares</div>
          </div>
          <div>
            <div className="font-data text-lg font-bold text-primary">{storyData?.verifiedShares || 0}</div>
            <div className="font-caption text-xs text-muted-foreground">Verified Shares</div>
          </div>
          <div>
            <div className="font-data text-lg font-bold text-success">
              {storyData?.verifiedShares && storyData?.shareCount ? 
                Math.round((storyData?.verifiedShares / storyData?.shareCount) * 100) : 0}%
            </div>
            <div className="font-caption text-xs text-muted-foreground">Accuracy Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialSharing;