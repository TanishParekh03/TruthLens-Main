import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const IdeologySection = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const ideologyCategories = [
    {
      id: 'left',
      title: 'Left-Leaning Sources',
      icon: 'ArrowLeft',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      description: 'Sources that generally favor progressive policies and social reform',
      characteristics: [
        'Support for expanded government role in social welfare',
        'Advocacy for minority rights and social justice',
        'Critical of business-friendly policies that may increase inequality',
        'Emphasis on environmental protection and climate action',
        'Support for secular governance and minority protection'
      ],
      examples: [
        'The Wire - Independent journalism with progressive perspective',
        'NDTV - Mainstream news with center-left editorial stance',
        'The Hindu - National daily with liberal editorial positions',
        'Scroll.in - Digital publication with progressive viewpoints'
      ]
    },
    {
      id: 'center',
      title: 'Center Sources',
      icon: 'Circle',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      description: 'Sources that strive for balanced reporting across political perspectives',
      characteristics: [
        'Balanced coverage of multiple political viewpoints',
        'Focus on factual reporting over editorial positions',
        'Present arguments from different sides of issues',
        'Moderate editorial stances on contentious topics',
        'Emphasis on institutional credibility and professional journalism'
      ],
      examples: [
        'The Indian Express - Established daily with balanced reporting',
        'Mint - Business-focused with balanced political coverage',
        'PTI (Press Trust of India) - National news agency',
        'BBC Hindi - International perspective on Indian affairs'
      ]
    },
    {
      id: 'right',
      title: 'Right-Leaning Sources',
      icon: 'ArrowRight',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      description: 'Sources that generally favor conservative policies and traditional values',
      characteristics: [
        'Support for free market policies and business growth',
        'Emphasis on national security and strong governance',
        'Advocacy for traditional cultural and religious values',
        'Support for reduced government intervention in economy',
        'Focus on nationalist themes and cultural identity'
      ],
      examples: [
        'Times of India - Mainstream daily with pro-business editorial stance',
        'Economic Times - Business publication supporting market-friendly policies',
        'India Today - News magazine with moderate conservative perspective',
        'Zee News - Television news with nationalist editorial approach'
      ]
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Ideological Classification System
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
            Understanding how we categorize Indian news sources across the political spectrum to provide balanced perspective analysis
          </p>
        </div>

        <div className="mb-8 bg-card border border-border rounded-lg p-6">
          <h3 className="font-heading font-semibold text-xl text-foreground mb-4">
            Why Ideological Classification Matters
          </h3>
          <p className="font-body text-muted-foreground mb-4">
            In India's diverse media landscape, news sources often reflect different political perspectives. Our classification system helps users understand potential bias and compare how the same story is covered across the political spectrum.
          </p>
          <div className="bg-muted/50 border border-border rounded-lg p-4">
            <p className="font-body text-sm text-muted-foreground">
              <strong>Important:</strong> Ideological classification does not indicate credibility. Sources across all categories can produce accurate, well-researched journalism. This system is designed to provide transparency about perspective, not to judge quality.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:gap-8">
          {ideologyCategories?.map((category) => (
            <div key={category?.id} className={`bg-card border ${category?.borderColor} rounded-xl shadow-sm overflow-hidden`}>
              <button
                onClick={() => toggleSection(category?.id)}
                className="w-full p-6 text-left hover:bg-muted/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 ${category?.bgColor} rounded-lg flex items-center justify-center border ${category?.borderColor}`}>
                      <Icon name={category?.icon} size={24} className={category?.color} />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                      {category?.title}
                    </h3>
                    <p className="font-body text-muted-foreground">
                      {category?.description}
                    </p>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <Icon 
                      name={expandedSection === category?.id ? "ChevronUp" : "ChevronDown"} 
                      size={20} 
                      className="text-muted-foreground" 
                    />
                  </div>
                </div>
              </button>

              {expandedSection === category?.id && (
                <div className="px-6 pb-6 border-t border-border bg-muted/20">
                  <div className="pt-6 grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-heading font-semibold text-foreground mb-3">
                        Key Characteristics
                      </h4>
                      <ul className="space-y-2">
                        {category?.characteristics?.map((characteristic, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <Icon name="Check" size={16} className={`${category?.color} mt-0.5 flex-shrink-0`} />
                            <span className="font-body text-sm text-foreground">{characteristic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-heading font-semibold text-foreground mb-3">
                        Example Sources
                      </h4>
                      <ul className="space-y-2">
                        {category?.examples?.map((example, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <Icon name="ArrowRight" size={16} className={`${category?.color} mt-0.5 flex-shrink-0`} />
                            <span className="font-body text-sm text-foreground">{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-card border border-border rounded-lg p-6">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
            How We Determine Classification
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-foreground mb-2">Editorial Analysis</h4>
              <p className="font-body text-sm text-muted-foreground">
                Review of editorial positions, opinion pieces, and commentary over time to identify consistent political leanings.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Coverage Patterns</h4>
              <p className="font-body text-sm text-muted-foreground">
                Analysis of how stories are framed, which issues receive emphasis, and the tone of political coverage.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Expert Assessment</h4>
              <p className="font-body text-sm text-muted-foreground">
                Input from media scholars, journalism experts, and analysis of third-party media bias assessments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdeologySection;
