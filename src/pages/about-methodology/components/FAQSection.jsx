import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqs = [
    {
      id: 'accuracy',
      question: 'How accurate are TruthLens credibility assessments?',
      answer: `Our system achieves approximately 85-90% accuracy in credibility assessments based on continuous validation against verified fact-checking outcomes.\n\nAccuracy varies by content type:\n• Political claims: 87% accuracy\n• Breaking news: 82% accuracy\n• Historical facts: 92% accuracy\n• Scientific claims: 89% accuracy\n\nWe continuously monitor and improve our accuracy through machine learning and expert feedback.`
    },
    {
      id: 'bias',
      question: 'How does TruthLens detect and handle bias?',
      answer: `We employ multiple strategies to identify and mitigate bias:\n\n• Language analysis to detect emotionally charged or partisan terminology\n• Source diversity requirements for comprehensive coverage\n• Political balance scoring across different viewpoints\n• Expert review panels with diverse perspectives\n• Transparent disclosure of potential bias indicators\n\nOur goal is not to eliminate all perspective, but to clearly identify when bias may influence credibility assessment.`
    },
    {
      id: 'sources',
      question: 'What sources does TruthLens use for verification?',
      answer: `Our verification process draws from multiple authoritative sources:\n\n• Government databases and official records\n• Academic institutions and peer-reviewed research\n• Established fact-checking organizations (Snopes, PolitiFact, FactCheck.org)\n• Primary source documents and interviews\n• International news agencies (Reuters, AP, BBC)\n• Expert interviews and professional analysis\n\nWe maintain a database of over 500 verified sources, regularly audited for credibility and reliability.`
    },
    {
      id: 'updates',
      question: 'How often is information updated?',
      answer: `TruthLens operates on multiple update cycles:\n\n• Real-time monitoring: Continuous scanning of news sources\n• Credibility assessments: Updated within 2-4 hours of story publication\n• Source verification: Daily validation of source reliability\n• Algorithm improvements: Weekly refinements based on performance data\n• Major methodology updates: Quarterly reviews with expert panels\n\nBreaking news and rapidly evolving stories receive priority processing with updates every 30 minutes.`
    },
    {
      id: 'limitations',
      question: 'What are the limitations of automated fact-checking?',
      answer: `We acknowledge several important limitations:\n\n• Context dependency: Automated systems may miss nuanced context\n• Emerging claims: New information may not yet be verifiable\n• Opinion vs. fact: Difficulty distinguishing subjective opinions from factual claims\n• Language barriers: Reduced accuracy for non-English content\n• Source availability: Limited by accessible verification sources\n\nWe address these through human oversight, transparent uncertainty indicators, and continuous system improvements.`
    },
    {
      id: 'feedback',
      question: 'How can users provide feedback or report errors?',
      answer: `We encourage user feedback through multiple channels:\n\n• Report button on each credibility assessment\n• Detailed feedback forms for specific corrections\n• Community discussion forums for broader issues\n• Direct email contact for urgent corrections\n• Monthly user surveys for system improvements\n\nAll feedback is reviewed by our editorial team within 24 hours, with corrections implemented as needed and users notified of outcomes.`
    }
  ];

  const toggleFAQ = (faqId) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            Common questions about our methodology, accuracy, and processes
          </p>
        </div>

        <div className="space-y-4">
          {faqs?.map((faq) => (
            <div key={faq?.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleFAQ(faq?.id)}
                className="w-full p-6 text-left hover:bg-muted/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-semibold text-lg text-foreground pr-4">
                    {faq?.question}
                  </h3>
                  <Icon 
                    name={expandedFAQ === faq?.id ? "Minus" : "Plus"} 
                    size={20} 
                    className="text-muted-foreground flex-shrink-0" 
                  />
                </div>
              </button>

              {expandedFAQ === faq?.id && (
                <div className="px-6 pb-6 border-t border-border bg-muted/20">
                  <div className="pt-4">
                    <div className="prose prose-sm max-w-none">
                      {faq?.answer?.split('\n\n')?.map((paragraph, idx) => (
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

        {/* Contact Section */}
        <div className="mt-12 bg-card border border-border rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="MessageCircle" size={28} className="text-primary" />
          </div>
          
          <h3 className="font-heading font-bold text-xl text-foreground mb-4">
            Still have questions?
          </h3>
          
          <p className="font-body text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our team is committed to transparency and continuous improvement. Reach out with any questions about our methodology or suggestions for enhancement.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Mail" size={16} className="text-primary" />
              <span className="font-data">feedback@truthlens.com</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={16} className="text-primary" />
              <span className="font-body">Response within 24 hours</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;