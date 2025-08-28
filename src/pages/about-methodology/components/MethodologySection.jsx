import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const MethodologySection = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const methodologySteps = [
    {
      id: 'collection',
      title: 'Data Collection',
      icon: 'Database',
      description: 'Automated aggregation from trusted news sources and fact-checking organizations',
      details: `Our system continuously monitors over 500 verified news sources, including major newspapers, broadcast networks, and established fact-checking organizations. We use RSS feeds, APIs, and web scraping to collect articles in real-time.\n\nSources are pre-vetted based on journalistic standards, editorial policies, and track record of accuracy. We maintain a dynamic source quality score that adjusts based on historical performance.`
    },
    {
      id: 'analysis',
      title: 'AI Analysis',
      icon: 'Brain',
      description: 'Natural language processing to identify claims and cross-reference facts',
      details: `Our AI system uses advanced natural language processing to:\n\n• Extract factual claims from news articles\n• Identify key entities, dates, and verifiable statements\n• Cross-reference claims against our knowledge base\n• Detect potential bias indicators in language and framing\n• Compare multiple source perspectives on the same story`
    },
    {
      id: 'verification',
      title: 'Fact Verification',
      icon: 'Search',
      description: 'Cross-referencing with authoritative databases and primary sources',
      details: `Each claim undergoes rigorous verification through:\n\n• Government databases and official records\n• Academic research and peer-reviewed studies\n• Historical archives and documented evidence\n• Expert interviews and authoritative statements\n• Real-time fact-checking from partner organizations`
    },
    {
      id: 'scoring',
      title: 'Credibility Scoring',
      icon: 'Target',
      description: 'Multi-factor assessment generating confidence scores and credibility labels',
      details: `Our credibility score considers:\n\n• Source reliability and track record (30%)\n• Factual accuracy of verifiable claims (40%)\n• Consistency across multiple sources (20%)\n• Timeliness and context relevance (10%)\n\nScores range from 0-100, with labels: Likely True (80-100), Disputed (40-79), Likely False (0-39)`
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Our Methodology
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
            A transparent, four-step process that combines AI technology with human oversight to deliver reliable credibility assessments
          </p>
        </div>

        <div className="grid gap-6 md:gap-8">
          {methodologySteps?.map((step, index) => (
            <div key={step?.id} className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection(step?.id)}
                className="w-full p-6 text-left hover:bg-muted/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={step?.icon} size={24} className="text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-data text-sm text-primary font-medium">
                        Step {index + 1}
                      </span>
                      <h3 className="font-heading font-semibold text-xl text-foreground">
                        {step?.title}
                      </h3>
                    </div>
                    <p className="font-body text-muted-foreground">
                      {step?.description}
                    </p>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <Icon 
                      name={expandedSection === step?.id ? "ChevronUp" : "ChevronDown"} 
                      size={20} 
                      className="text-muted-foreground" 
                    />
                  </div>
                </div>
              </button>

              {expandedSection === step?.id && (
                <div className="px-6 pb-6 border-t border-border bg-muted/20">
                  <div className="pt-4">
                    <div className="prose prose-sm max-w-none">
                      {step?.details?.split('\n\n')?.map((paragraph, idx) => (
                        <p key={idx} className="font-body text-foreground mb-4 last:mb-0 leading-relaxed">
                          {paragraph?.split('\n')?.map((line, lineIdx) => (
                            <React.Fragment key={lineIdx}>
                              {line}
                              {lineIdx < paragraph?.split('\n')?.length - 1 && <br />}
                            </React.Fragment>
                          ))}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;