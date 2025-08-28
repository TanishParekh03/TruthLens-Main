import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignalsSection = () => {
  const partnerships = [
    {
      name: 'International Fact-Checking Network',
      type: 'Fact-Checking Standards',
      description: 'Adheres to IFCN code of principles for transparency and accountability',
      icon: 'Shield',
      verified: true
    },
    {
      name: 'Associated Press',
      type: 'News Source Partner',
      description: 'Access to verified news content and fact-checking resources',
      icon: 'Newspaper',
      verified: true
    },
    {
      name: 'Reuters Fact Check',
      type: 'Verification Partner',
      description: 'Cross-reference verification with established fact-checking database',
      icon: 'CheckCircle',
      verified: true
    },
    {
      name: 'Poynter Institute',
      type: 'Methodology Advisor',
      description: 'Guidance on best practices in journalism and fact-checking',
      icon: 'BookOpen',
      verified: true
    }
  ];

  const securityFeatures = [
    {
      title: 'SSL Encryption',
      description: 'All data transmission secured with 256-bit SSL encryption',
      icon: 'Lock',
      status: 'Active'
    },
    {
      title: 'Data Privacy',
      description: 'No personal data collection or tracking without explicit consent',
      icon: 'Eye',
      status: 'Compliant'
    },
    {
      title: 'Source Protection',
      description: 'Confidential sources and whistleblower information protected',
      icon: 'UserCheck',
      status: 'Secured'
    },
    {
      title: 'Regular Audits',
      description: 'Monthly security audits and vulnerability assessments',
      icon: 'Search',
      status: 'Current'
    }
  ];

  const certifications = [
    {
      name: 'ISO 27001',
      description: 'Information Security Management',
      icon: 'Award',
      validUntil: '2025-12-31'
    },
    {
      name: 'SOC 2 Type II',
      description: 'Security & Availability Controls',
      icon: 'Shield',
      validUntil: '2025-08-15'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Trust & Security
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
            Our commitment to transparency, security, and ethical journalism through verified partnerships and industry certifications
          </p>
        </div>

        {/* Partnerships */}
        <div className="mb-16">
          <h3 className="font-heading font-bold text-2xl text-foreground mb-8 text-center">
            Trusted Partnerships
          </h3>
          
          <div className="grid gap-6 md:grid-cols-2">
            {partnerships?.map((partner, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name={partner?.icon} size={24} className="text-success" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-heading font-semibold text-foreground">
                        {partner?.name}
                      </h4>
                      {partner?.verified && (
                        <Icon name="BadgeCheck" size={16} className="text-success" />
                      )}
                    </div>
                    
                    <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md mb-3">
                      {partner?.type}
                    </span>
                    
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {partner?.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Features */}
        <div className="mb-16">
          <h3 className="font-heading font-bold text-2xl text-foreground mb-8 text-center">
            Security & Privacy
          </h3>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {securityFeatures?.map((feature, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name={feature?.icon} size={20} className="text-accent" />
                </div>
                
                <h4 className="font-heading font-semibold text-foreground mb-2">
                  {feature?.title}
                </h4>
                
                <p className="font-body text-xs text-muted-foreground mb-3 leading-relaxed">
                  {feature?.description}
                </p>
                
                <span className="inline-block px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-md">
                  {feature?.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-muted/30 rounded-xl p-8">
          <h3 className="font-heading font-bold text-2xl text-foreground mb-6 text-center">
            Industry Certifications
          </h3>
          
          <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
            {certifications?.map((cert, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={cert?.icon} size={28} className="text-primary" />
                </div>
                
                <h4 className="font-heading font-bold text-lg text-foreground mb-2">
                  {cert?.name}
                </h4>
                
                <p className="font-body text-sm text-muted-foreground mb-4">
                  {cert?.description}
                </p>
                
                <div className="flex items-center justify-center space-x-2 text-xs text-success">
                  <Icon name="Calendar" size={14} />
                  <span className="font-data">Valid until {new Date(cert.validUntil)?.toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="font-body text-sm text-muted-foreground">
              All certifications are independently verified and regularly audited for compliance
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignalsSection;