import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Breadcrumb from '../../components/ui/Breadcrumb';
import HeroSection from './components/HeroSection';
import MethodologySection from './components/MethodologySection';
import CredibilityScoreSection from './components/CredibilityScoreSection';
import TrustSignalsSection from './components/TrustSignalsSection';
import FAQSection from './components/FAQSection';
import ExampleAssessmentSection from './components/ExampleAssessmentSection';

const AboutMethodology = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/news-dashboard' },
    { label: 'About & Methodology' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>About & Methodology - TruthLens</title>
        <meta 
          name="description" 
          content="Learn about TruthLens methodology, credibility scoring system, and transparent fact-checking processes. Discover how we verify news credibility through AI-driven analysis." 
        />
        <meta name="keywords" content="fact checking methodology, news verification, credibility scoring, AI analysis, journalism standards" />
        <meta property="og:title" content="About & Methodology - TruthLens" />
        <meta property="og:description" content="Transparent methodology and credibility scoring system for news verification" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <HeroSection />
        <MethodologySection />
        <CredibilityScoreSection />
        <ExampleAssessmentSection />
        <TrustSignalsSection />
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
};

export default AboutMethodology;