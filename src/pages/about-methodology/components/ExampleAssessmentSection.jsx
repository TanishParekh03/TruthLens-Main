import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ExampleAssessmentSection = () => {
  const [selectedExample, setSelectedExample] = useState('example1');

  const examples = [
    {
      id: 'example1',
      title: 'Political Claim Assessment',
      claim: 'Senator Johnson voted against the infrastructure bill 15 times in the past year',
      initialScore: 78,
      finalScore: 85,
      label: 'Likely True',
      labelColor: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20',
      steps: [
        {
          step: 'Claim Extraction',
          description: 'AI identifies specific verifiable claim about voting record',
          result: 'Extracted: Senator name, bill type, vote count, timeframe',
          icon: 'Search'
        },
        {
          step: 'Source Verification',
          description: 'Cross-reference with official congressional voting records',
          result: 'Found 14 votes against infrastructure bills in 12 months',
          icon: 'Database'
        },
        {
          step: 'Context Analysis',
          description: 'Evaluate timeframe accuracy and bill categorization',
          result: 'Timeframe accurate, bills correctly categorized as infrastructure',
          icon: 'Calendar'
        },
        {
          step: 'Final Assessment',
          description: 'Minor discrepancy in count (14 vs 15) but substantially accurate',
          result: 'Score: 85/100 - Likely True with minor numerical variance',
          icon: 'CheckCircle'
        }
      ]
    },
    {
      id: 'example2',
      title: 'Breaking News Verification',
      claim: 'Major earthquake hits California, magnitude 7.2, causing widespread damage',
      initialScore: 45,
      finalScore: 92,
      label: 'Likely True',
      labelColor: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20',
      steps: [
        {
          step: 'Real-time Monitoring',
          description: 'Automated detection of breaking news claim',
          result: 'Claim detected across 15+ news sources within 30 minutes',
          icon: 'Zap'
        },
        {
          step: 'Official Verification',
          description: 'Cross-check with USGS earthquake monitoring systems',
          result: 'USGS confirms 7.1 magnitude earthquake (slight variance)',
          icon: 'Shield'
        },
        {
          step: 'Source Validation',
          description: 'Verify reporting sources and eyewitness accounts',
          result: 'Multiple credible sources, official emergency responses',
          icon: 'Users'
        },
        {
          step: 'Damage Assessment',
          description: 'Evaluate claims about widespread damage',
          result: 'Emergency services confirm significant infrastructure damage',
          icon: 'AlertTriangle'
        }
      ]
    },
    {
      id: 'example3',
      title: 'Disputed Claim Analysis',
      claim: 'New study shows 90% effectiveness rate for controversial treatment',
      initialScore: 65,
      finalScore: 52,
      label: 'Disputed',
      labelColor: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20',
      steps: [
        {
          step: 'Study Identification',
          description: 'Locate and verify the referenced research study',
          result: 'Study found but not yet peer-reviewed, small sample size',
          icon: 'BookOpen'
        },
        {
          step: 'Methodology Review',
          description: 'Assess study design and statistical validity',
          result: 'Methodology concerns: limited control group, short duration',
          icon: 'BarChart'
        },
        {
          step: 'Expert Consultation',
          description: 'Gather opinions from relevant medical experts',
          result: 'Mixed expert opinions, calls for larger studies',
          icon: 'UserCheck'
        },
        {
          step: 'Consensus Analysis',
          description: 'Evaluate against established medical consensus',
          result: 'Conflicts with current medical consensus, requires more evidence',
          icon: 'Scale'
        }
      ]
    }
  ];

  const currentExample = examples?.find(ex => ex?.id === selectedExample);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Assessment Examples
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
            Step-by-step breakdowns of how Neutral Mirror evaluates different types of claims and news stories
          </p>
        </div>

   
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {examples?.map((example) => (
            <button
              key={example?.id}
              onClick={() => setSelectedExample(example?.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                selectedExample === example?.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
              }`}
            >
              {example?.title}
            </button>
          ))}
        </div>

     
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
         
          <div className="p-6 border-b border-border">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-heading font-bold text-xl text-foreground">
                {currentExample?.title}
              </h3>
              <div className={`px-4 py-2 rounded-lg ${currentExample?.bgColor} ${currentExample?.borderColor} border`}>
                <span className={`font-heading font-bold ${currentExample?.labelColor}`}>
                  {currentExample?.label}
                </span>
                <span className="font-data text-sm text-muted-foreground ml-2">
                  {currentExample?.finalScore}/100
                </span>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-heading font-semibold text-foreground mb-2">
                Claim to Verify:
              </h4>
              <p className="font-body text-foreground italic">
                "{currentExample?.claim}"
              </p>
            </div>
          </div>

       
          <div className="p-6">
            <div className="space-y-6">
              {currentExample?.steps?.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name={step?.icon} size={20} className="text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-data text-sm text-primary font-medium">
                        Step {index + 1}
                      </span>
                      <h4 className="font-heading font-semibold text-foreground">
                        {step?.step}
                      </h4>
                    </div>
                    
                    <p className="font-body text-muted-foreground mb-3 leading-relaxed">
                      {step?.description}
                    </p>
                    
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="font-body text-sm text-foreground">
                        <span className="font-semibold">Result: </span>
                        {step?.result}
                      </p>
                    </div>
                  </div>
                  
                  {index < currentExample?.steps?.length - 1 && (
                    <div className="absolute left-9 mt-12 w-px h-6 bg-border"></div>
                  )}
                </div>
              ))}
            </div>

    
            <div className="mt-8 p-4 bg-muted/20 rounded-lg">
              <h4 className="font-heading font-semibold text-foreground mb-3">
                Score Evolution
              </h4>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="font-body text-sm text-muted-foreground">Initial:</span>
                  <span className="font-data font-bold text-foreground">
                    {currentExample?.initialScore}/100
                  </span>
                </div>
                <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                <div className="flex items-center space-x-2">
                  <span className="font-body text-sm text-muted-foreground">Final:</span>
                  <span className={`font-data font-bold ${currentExample?.labelColor}`}>
                    {currentExample?.finalScore}/100
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-accent/10 border border-accent/20 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={20} className="text-accent mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-2">
                Interactive Assessment
              </h4>
              <p className="font-body text-sm text-foreground leading-relaxed">
                These examples demonstrate our transparent assessment process. In the actual application, users can click on any credibility score to see a similar step-by-step breakdown of how we reached our conclusion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExampleAssessmentSection;