import React from 'react';
import Icon from '../../../components/AppIcon';

const CredibilityScoreSection = () => {
  const scoreRanges = [
    {
      label: 'Likely True',
      range: '80-100',
      color: 'success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20',
      textColor: 'text-success',
      icon: 'CheckCircle',
      description: 'High confidence in factual accuracy with strong source verification',
      criteria: [
        'Multiple authoritative sources confirm claims',
        'Primary evidence supports all key facts',
        'No significant contradictory evidence found',
        'Source has strong credibility track record'
      ]
    },
    {
      label: 'Disputed',
      range: '40-79',
      color: 'warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20',
      textColor: 'text-warning',
      icon: 'AlertTriangle',
      description: 'Mixed evidence or conflicting information requires careful consideration',
      criteria: [
        'Some claims verified, others lack evidence',
        'Conflicting reports from different sources',
        'Partial information or missing context',
        'Source credibility varies across claims'
      ]
    },
    {
      label: 'Likely False',
      range: '0-39',
      color: 'error',
      bgColor: 'bg-error/10',
      borderColor: 'border-error/20',
      textColor: 'text-error',
      icon: 'XCircle',
      description: 'Low confidence due to contradictory evidence or unreliable sources',
      criteria: [
        'Claims contradicted by authoritative sources',
        'Lack of credible supporting evidence',
        'Source has poor credibility track record',
        'Information appears to be misleading'
      ]
    }
  ];

  const scoringFactors = [
    {
      factor: 'Source Reliability',
      weight: '30%',
      description: 'Historical accuracy, editorial standards, and journalistic reputation'
    },
    {
      factor: 'Factual Accuracy',
      weight: '40%',
      description: 'Verification of specific claims against authoritative databases'
    },
    {
      factor: 'Source Consistency',
      weight: '20%',
      description: 'Agreement across multiple independent sources'
    },
    {
      factor: 'Context & Timeliness',
      weight: '10%',
      description: 'Relevance, recency, and appropriate contextual framing'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Credibility Scoring System
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
            Our transparent scoring methodology helps you quickly assess the reliability of news stories and claims
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-16">
          {scoreRanges?.map((score) => (
            <div key={score?.label} className={`${score?.bgColor} ${score?.borderColor} border-2 rounded-xl p-6`}>
              <div className="flex items-center space-x-3 mb-4">
                <Icon name={score?.icon} size={24} className={score?.textColor} />
                <div>
                  <h3 className="font-heading font-bold text-xl text-foreground">
                    {score?.label}
                  </h3>
                  <span className="font-data text-sm text-muted-foreground">
                    Score: {score?.range}
                  </span>
                </div>
              </div>
              
              <p className="font-body text-foreground mb-4 leading-relaxed">
                {score?.description}
              </p>
              
              <div className="space-y-2">
                <h4 className="font-heading font-semibold text-sm text-foreground mb-2">
                  Key Criteria:
                </h4>
                {score?.criteria?.map((criterion, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className={`${score?.textColor} mt-0.5 flex-shrink-0`} />
                    <span className="font-body text-sm text-foreground">
                      {criterion}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

  
        <div className="bg-card border border-border rounded-xl p-8">
          <h3 className="font-heading font-bold text-2xl text-foreground mb-6 text-center">
            Scoring Factors & Weights
          </h3>
          
          <div className="grid gap-6 md:grid-cols-2">
            {scoringFactors?.map((factor, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="font-data font-bold text-primary">
                    {factor?.weight}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-heading font-semibold text-foreground mb-2">
                    {factor?.factor}
                  </h4>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {factor?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-accent mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-heading font-semibold text-foreground mb-2">
                  Continuous Improvement
                </h4>
                <p className="font-body text-sm text-foreground leading-relaxed">
                  Our scoring algorithm is continuously refined based on user feedback, accuracy tracking, and emerging best practices in fact-checking and journalism.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredibilityScoreSection;