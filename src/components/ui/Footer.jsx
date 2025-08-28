import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = [
    { path: '/about-methodology', label: 'About & Methodology', icon: 'Info' },
  ];

  const trustSignals = [
    { name: 'Verified Sources', icon: 'CheckCircle' },
    { name: 'Transparent Process', icon: 'Eye' },
    { name: 'Independent Analysis', icon: 'Scale' },
  ];

  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand and Mission */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="NeutralMirror" size={20} color="white" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-foreground">Neutral Mirror</h3>
                <p className="font-caption text-sm text-muted-foreground -mt-1">News Credibility Verification</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed font-body">
              Empowering informed decision-making through transparent, data-driven news verification and credibility analysis.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-foreground">Learn More</h4>
            <nav className="space-y-2">
              {footerLinks?.map((link) => (
                <Link
                  key={link?.path}
                  to={link?.path}
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                >
                  <Icon 
                    name={link?.icon} 
                    size={16} 
                    className="group-hover:text-primary transition-colors duration-200" 
                  />
                  <span>{link?.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Trust Signals */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-foreground">Our Commitment</h4>
            <div className="space-y-3">
              {trustSignals?.map((signal) => (
                <div key={signal?.name} className="flex items-center space-x-2">
                  <Icon 
                    name={signal?.icon} 
                    size={16} 
                    className="text-success flex-shrink-0" 
                  />
                  <span className="text-sm text-muted-foreground font-body">{signal?.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="font-data">© {currentYear} Neutral Mirror</span>
              <span className="hidden sm:inline">•</span>
              <span className="font-body">Committed to factual accuracy</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Shield" size={14} className="text-success" />
              <span className="font-body">Secure & Private</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;