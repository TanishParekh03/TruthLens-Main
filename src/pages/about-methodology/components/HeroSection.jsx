import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: "url(/assets/images/ai-in-fake-news.jpg)" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50" />
      {/* Animated background blobs (subtle, beneath overlay) */}
      <div className="absolute inset-0 -z-10">
        <div className="nm-blob nm-blob-animate-slow w-72 h-72 rounded-full bg-primary/20 -top-16 -left-10"></div>
        <div className="nm-blob nm-blob-animate w-80 h-80 rounded-full bg-accent/20 -bottom-24 right-0"></div>
        <div className="nm-blob nm-blob-animate-fast w-64 h-64 rounded-full bg-success/20 top-1/3 -right-16"></div>
      </div>
      <div className="max-w-4xl mx-auto text-center relative">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary/90 rounded-2xl flex items-center justify-center shadow-lg">
            <Icon name="NeutralMirror" size={32} color="white" strokeWidth={2.5} />
          </div>
        </div>
        <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
          Verify the Truth
        </h1>
        <p className="font-body text-lg sm:text-xl text-white/80 mb-8 leading-relaxed max-w-3xl mx-auto">
          AI-powered credibility analysis to cut through misinformation. Scan articles, verify claims, and see transparent evidence.
        </p>
        <div className="flex justify-center">
          <Button asChild size="lg">
            <a href="/search-query">Verify the Truth</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;