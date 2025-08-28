import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CredibilityConsensus from './components/CredibilityConsensus';
import SourcePanel from './components/SourcePanel';
import TimelineVisualization from './components/TimelineVisualization';
import FactCheckSection from './components/FactCheckSection';
import DeepfakeDetection from './components/DeepfakeDetection';
import SocialSharing from './components/SocialSharing';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const StoryComparisonDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('sources');
  const [selectedSource, setSelectedSource] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Mock data for the story comparison
  const storyData = {
    id: "story-001",
    title: "Federal Reserve Announces New Interest Rate Policy Changes",
    category: "Economic Policy",
    lastUpdated: "2025-01-16T14:30:00Z",
    shareCount: 15420,
    verifiedShares: 12336,
    credibilityStatus: "Likely True"
  };

  const consensusData = {
    status: "Likely True",
    confidenceScore: 87,
    summary: `Based on analysis of 8 major news sources and cross-referencing with official Federal Reserve communications, this story appears to be accurate. The reported policy changes align with recent Fed statements and economic indicators. Minor discrepancies exist in specific percentage figures across sources, but the core information is consistent and verifiable.`
  };

  const sourcesData = [
    {
      id: "source-1",
      outlet: {
        name: "Reuters",
        logo: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&h=100&fit=crop&crop=center"
      },
      headline: "Fed Announces 0.25% Rate Cut to Stimulate Economic Growth",
      summary: "The Federal Reserve announced a quarter-point interest rate reduction, citing concerns about economic slowdown and inflation targets.",
      publishedAt: "2025-01-16T12:15:00Z",
      lastUpdated: "2025-01-16T13:45:00Z",
      credibilityStatus: "Likely True",
      keyPoints: [
        "Federal Reserve cuts interest rates by 0.25 percentage points",
        "Decision made to support economic growth amid global uncertainties",
        "Fed Chair emphasizes data-driven approach to future decisions",
        "Market reaction shows positive response to the announcement"
      ],
      discrepancies: [],
      originalUrl: "https://reuters.com/example-article"
    },
    {
      id: "source-2",
      outlet: {
        name: "Wall Street Journal",
        logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center"
      },
      headline: "Federal Reserve Cuts Rates by Quarter Point in Unanimous Decision",
      summary: "In a unanimous vote, the Federal Reserve lowered its benchmark interest rate, marking the first cut in over a year.",
      publishedAt: "2025-01-16T12:30:00Z",
      lastUpdated: "2025-01-16T14:00:00Z",
      credibilityStatus: "Likely True",
      keyPoints: [
        "Unanimous decision by Federal Open Market Committee",
        "First rate cut since March 2024",
        "Fed officials cite labor market concerns",
        "Forward guidance suggests cautious approach ahead"
      ],
      discrepancies: [
        {
          claim: "Reports \'first cut in over a year\' vs Reuters\' timeline",
          explanation: "Minor discrepancy in timeline reporting - WSJ refers to calendar year while Reuters uses 12-month period"
        }
      ],
      originalUrl: "https://wsj.com/example-article"
    },
    {
      id: "source-3",
      outlet: {
        name: "CNN Business",
        logo: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&h=100&fit=crop&crop=center"
      },
      headline: "Fed Slashes Interest Rates as Economic Concerns Mount",
      summary: "The Federal Reserve delivered an expected rate cut, but signals more aggressive action may be needed to address economic headwinds.",
      publishedAt: "2025-01-16T13:00:00Z",
      lastUpdated: "2025-01-16T14:15:00Z",
      credibilityStatus: "Disputed",
      keyPoints: [
        "Federal Reserve reduces rates by 0.25%",
        "Officials express concern about economic outlook",
        "Possibility of additional cuts in coming months",
        "Stock markets rally following announcement"
      ],
      discrepancies: [
        {
          claim: "Uses term \'slashes\' which implies larger cut than reported",
          explanation: "Sensationalized language may mislead readers about the magnitude of the rate change"
        },
        {
          claim: "Suggests \'more aggressive action\' without clear Fed statement",
          explanation: "Interpretation goes beyond official Fed communications and may be speculative"
        }
      ],
      originalUrl: "https://cnn.com/example-article"
    }
  ];

  const timelineData = [
    {
      outlet: "Federal Reserve",
      headline: "FOMC Meeting Concludes with Policy Decision",
      timestamp: "2025-01-16T12:00:00Z",
      keyUpdate: "Official announcement of 0.25% rate cut",
      views: 50000,
      shares: 2500
    },
    {
      outlet: "Reuters",
      headline: "Fed Announces 0.25% Rate Cut to Stimulate Economic Growth",
      timestamp: "2025-01-16T12:15:00Z",
      keyUpdate: "First major news outlet coverage",
      views: 125000,
      shares: 3200
    },
    {
      outlet: "Wall Street Journal",
      headline: "Federal Reserve Cuts Rates by Quarter Point in Unanimous Decision",
      timestamp: "2025-01-16T12:30:00Z",
      keyUpdate: "Emphasis on unanimous decision",
      views: 98000,
      shares: 2800
    },
    {
      outlet: "CNN Business",
      headline: "Fed Slashes Interest Rates as Economic Concerns Mount",
      timestamp: "2025-01-16T13:00:00Z",
      keyUpdate: "More dramatic framing of the decision",
      views: 87000,
      shares: 4100
    },
    {
      outlet: "Bloomberg",
      headline: "Fed Delivers Expected Rate Cut, Signals Cautious Path Ahead",
      timestamp: "2025-01-16T13:30:00Z",
      keyUpdate: "Focus on forward guidance",
      views: 76000,
      shares: 1900
    }
  ];

  const factChecksData = [
    {
      claim: "Federal Reserve cut interest rates by 0.25 percentage points",
      source: "Multiple outlets",
      status: "Verified",
      explanation: "This claim has been verified through official Federal Reserve press releases and FOMC meeting minutes. The 0.25% reduction is accurately reported across all major sources.",
      evidence: [
        {
          title: "Federal Reserve Press Release - January 16, 2025",
          url: "https://federalreserve.gov/newsevents/pressreleases",
          source: "Federal Reserve",
          date: "2025-01-16T12:00:00Z"
        },
        {
          title: "FOMC Meeting Statement",
          url: "https://federalreserve.gov/fomc/statement",
          source: "Federal Reserve",
          date: "2025-01-16T12:00:00Z"
        }
      ],
      methodology: "Cross-referenced with official Federal Reserve documentation and verified through multiple independent sources",
      confidence: 95
    },
    {
      claim: "Decision was unanimous among FOMC members",
      source: "Wall Street Journal, Reuters",
      status: "Verified",
      explanation: "FOMC meeting minutes confirm that all voting members supported the rate cut decision. This represents consensus among Federal Reserve officials.",
      evidence: [
        {
          title: "FOMC Voting Record - January 2025",
          url: "https://federalreserve.gov/fomc/votes",
          source: "Federal Reserve",
          date: "2025-01-16T12:00:00Z"
        }
      ],
      methodology: "Verified through official FOMC voting records and meeting transcripts",
      confidence: 92
    },
    {
      claim: "This is the first rate cut in over a year",
      source: "Wall Street Journal",
      status: "Partially Verified",
      explanation: "The timeline depends on the reference point. The last rate cut was in March 2024, making this statement accurate if referring to calendar year 2024, but the 12-month period interpretation varies.",
      evidence: [
        {
          title: "Federal Reserve Rate History",
          url: "https://federalreserve.gov/data/rates",
          source: "Federal Reserve",
          date: "2025-01-16T00:00:00Z"
        }
      ],
      methodology: "Historical rate data analysis with timeline verification",
      confidence: 78
    },
    {
      claim: "Fed signals more aggressive action may be needed",
      source: "CNN Business",
      status: "Unverified",
      explanation: "Official Fed communications do not explicitly suggest 'more aggressive action.' This appears to be editorial interpretation rather than direct quotation from Fed officials.",
      evidence: [
        {
          title: "Fed Chair Press Conference Transcript",
          url: "https://federalreserve.gov/mediacenter/transcript",
          source: "Federal Reserve",
          date: "2025-01-16T14:00:00Z"
        }
      ],
      methodology: "Analysis of official Fed statements and press conference transcripts",
      confidence: 65
    }
  ];

  const mediaAnalysisData = [
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=center",
      description: "Federal Reserve Building exterior shot",
      source: "Reuters",
      uploadDate: "2025-01-16T12:15:00Z",
      riskLevel: "Low",
      authenticityScore: 94,
      analysisSummary: "Image shows authentic Federal Reserve building exterior. No signs of digital manipulation detected. Metadata confirms recent capture date and location.",
      detectionMetrics: [
        { name: "Pixel Analysis", score: 96 },
        { name: "Metadata Verification", score: 98 },
        { name: "Compression Artifacts", score: 92 },
        { name: "Lighting Consistency", score: 94 },
        { name: "Shadow Analysis", score: 90 }
      ]
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop&crop=center",
      description: "Fed Chair speaking at press conference",
      source: "Wall Street Journal",
      uploadDate: "2025-01-16T14:00:00Z",
      riskLevel: "Low",
      authenticityScore: 91,
      analysisSummary: "Authentic press conference footage. Facial recognition confirms identity. No deepfake indicators detected in video analysis.",
      detectionMetrics: [
        { name: "Facial Recognition", score: 95 },
        { name: "Voice Analysis", score: 89 },
        { name: "Lip Sync Detection", score: 93 },
        { name: "Background Consistency", score: 88 },
        { name: "Temporal Coherence", score: 92 }
      ]
    }
  ];

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/news-dashboard' },
    { label: 'Story Analysis', href: null }
  ];

  const tabs = [
    { id: 'sources', label: 'Source Comparison', icon: 'Newspaper', count: sourcesData?.length },
    { id: 'timeline', label: 'Timeline', icon: 'Clock', count: timelineData?.length },
    { id: 'factcheck', label: 'Fact Check', icon: 'Shield', count: factChecksData?.length },
    { id: 'media', label: 'Media Analysis', icon: 'Camera', count: mediaAnalysisData?.length },
    { id: 'share', label: 'Share', icon: 'Share2', count: null }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBackToDashboard = () => {
    navigate('/news-dashboard');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'sources':
        return (
          <div className="space-y-6">
            {isMobile ? (
              // Mobile: Tabbed interface for sources
              (<div>
                <div className="flex space-x-1 mb-4 bg-muted p-1 rounded-lg overflow-x-auto">
                  {sourcesData?.map((source, index) => (
                    <button
                      key={source?.id}
                      onClick={() => setSelectedSource(index)}
                      className={`flex-shrink-0 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        selectedSource === index
                          ? 'bg-card text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {source?.outlet?.name}
                    </button>
                  ))}
                </div>
                <SourcePanel
                  source={sourcesData?.[selectedSource]}
                  isActive={true}
                  onSelect={() => {}}
                />
              </div>)
            ) : (
              // Desktop: Side-by-side panels
              (<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {sourcesData?.map((source, index) => (
                  <SourcePanel
                    key={source?.id}
                    source={source}
                    isActive={selectedSource === index}
                    onSelect={() => setSelectedSource(index)}
                  />
                ))}
              </div>)
            )}
          </div>
        );
      case 'timeline':
        return <TimelineVisualization timeline={timelineData} />;
      case 'factcheck':
        return <FactCheckSection factChecks={factChecksData} />;
      case 'media':
        return <DeepfakeDetection mediaAnalysis={mediaAnalysisData} />;
      case 'share':
        return <SocialSharing storyData={storyData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={handleBackToDashboard}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Dashboard
            </Button>
          </div>

          {/* Story Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                    {storyData?.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Last updated: {new Date(storyData.lastUpdated)?.toLocaleString()}
                  </span>
                </div>
                <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground leading-tight">
                  {storyData?.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Credibility Consensus */}
          <CredibilityConsensus consensus={consensusData} />

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                    {tab?.count !== null && (
                      <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full text-xs">
                        {tab?.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-8">
            {renderTabContent()}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StoryComparisonDetail;