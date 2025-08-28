import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  return (
    <section> 
      <div className="absolute inset-0 -z-10">
        <div className="nm-blob nm-blob-animate-slow w-72 h-72 rounded-full bg-primary/20 -top-16 -left-10"></div>
        <div className="nm-blob nm-blob-animate w-80 h-80 rounded-full bg-accent/20 -bottom-24 right-0"></div>
        <div className="nm-blob nm-blob-animate-fast w-64 h-64 rounded-full bg-success/20 top-1/3 -right-16"></div>
      </div>
      <div className="max-w-4xl mx-auto text-center relative">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl flex  items-center justify-center shadow-lg"
          style={{ backgroundColor: "rgb(30, 58, 138)" }}>
            <Icon name="NeutralMirror" size={32} color="white" strokeWidth={2.5} />
          </div>
        </div>
        <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
          About Neutral Mirror
        </h2>
        <p className="font-body text-lg sm:text-xl mb-8 leading-relaxed max-w-3xl mx-auto">
          AI-powered credibility analysis to cut through misinformation. Scan articles, verify claims, and see transparent evidence.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
          <div className="flex items-center space-x-2 bg-card px-4 py-2 rounded-full border border-border shadow-sm">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-foreground">Verified Sources</span>
          </div>
          <div className="flex items-center space-x-2 bg-card px-4 py-2 rounded-full border border-border shadow-sm">
            <Icon name="Eye" size={16} className="text-accent" />
            <span className="text-foreground">Transparent Process</span>
          </div>
          <div className="flex items-center space-x-2 bg-card px-4 py-2 rounded-full border border-border shadow-sm">
            <Icon name="Scale" size={16} className="text-primary" />
            <span className="text-foreground">Independent Analysis</span>
          </div>
        </div>
        <br></br>
        <br></br>
        <div className="flex justify-center">
          <Button asChild size="lg">
            <a href="/search-query">Verify the Truth</a>
          </Button>
        </div>
        <br></br>
        <br></br>
      </div>
    </section>
  );
};

export default HeroSection;
