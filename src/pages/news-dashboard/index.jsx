import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import StoryCard from './components/StoryCard';
import FilterChips from './components/FilterChips';
import ViewToggle from './components/ViewToggle';
import LoadingSkeleton from './components/LoadingSkeleton';
import StatsOverview from './components/StatsOverview';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const NewsDashboard = () => {
  const [isListView, setIsListView] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stories, setStories] = useState([]);
  const [displayedStories, setDisplayedStories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const mockStories = [
    {
      id: 1,
      headline: "BJP Claims 370 Million People Lifted Out of Poverty Under Modi Government",
      summary: "Government data shows significant reduction in multidimensional poverty between 2015-2023, though opposition questions methodology and timeframe calculations.",
      source: "The Hindu",
      sourceIdeology: "center",
      credibilityStatus: "Disputed",
      publishedAt: "2 hours ago",
      views: "45.2K",
      image: "/assets/images/economy.jpg",
      topics: ["politics", "economy"]
    },
    {
      id: 2,
      headline: "Congress Alleges EVM Manipulation in Recent Assembly Elections",
      summary: "Opposition party demands return to paper ballots citing discrepancies in exit polls vs results, Election Commission refutes claims with technical evidence.",
      source: "NDTV",
      sourceIdeology: "left",
      credibilityStatus: "Likely False",
      publishedAt: "4 hours ago",
      views: "38.7K",
      image: "/assets/images/election.jpg",
      topics: ["politics"]
    },
    {
      id: 3,
      headline: "Supreme Court Upholds Abrogation of Article 370 in Jammu & Kashmir",
      summary: "Five-judge Constitution bench validates 2019 decision while directing restoration of statehood, mixed reactions from political parties across spectrum.",
      source: "The Indian Express",
      sourceIdeology: "center",
      credibilityStatus: "Likely True",
      publishedAt: "6 hours ago",
      views: "67.3K",
      image: "/assets/images/society.jpg",
      topics: ["politics", "law"]
    },
    {
      id: 4,
      headline: "Ayushman Bharat Reaches 50 Crore Beneficiaries Milestone",
      summary: "Government's flagship health insurance scheme crosses major enrollment target, though concerns remain about rural implementation and hospital empanelment.",
      source: "Times of India",
      sourceIdeology: "right",
      credibilityStatus: "Likely True",
      publishedAt: "8 hours ago",
      views: "29.1K",
      image: "/assets/images/health.jpg",
      topics: ["healthcare", "politics"]
    },
    {
      id: 5,
      headline: "Digital India Initiative Shows 89% Internet Penetration Claim Disputed",
      summary: "Government reports near-universal internet access, but independent studies suggest significant rural-urban divide and quality gaps persist.",
      source: "The Wire",
      sourceIdeology: "left",
      credibilityStatus: "Disputed",
      publishedAt: "10 hours ago",
      views: "22.8K",
      image: "/assets/images/aifakenews.jpg",
      topics: ["technology", "politics"]
    },
    {
      id: 6,
      headline: "India's GDP Growth Rate of 7.2% Fastest Among Major Economies",
      summary: "Latest quarterly data positions India ahead of China and US in growth metrics, though economists debate sustainability and employment generation.",
      source: "Economic Times",
      sourceIdeology: "right",
      credibilityStatus: "Likely True",
      publishedAt: "12 hours ago",
      views: "52.4K",
      image: "/assets/images/economy.jpg",
      topics: ["economy", "politics"]
    }
  ];

  
  const mockStats = {
    storiesVerified: 1247,
    likelyTrue: 892,
    likelyFalse: 203,
    disputed: 152
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setStories(mockStories);
      setDisplayedStories(mockStories);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
  
    if (activeFilters?.length === 0) {
      setDisplayedStories(stories);
      return;
    }

    const filtered = stories?.filter(story => {
      const credibilityMatch = activeFilters?.some(filter => {
        switch (filter) {
          case 'likely-true':
            return story?.credibilityStatus === 'Likely True';
          case 'likely-false':
            return story?.credibilityStatus === 'Likely False';
          case 'disputed':
            return story?.credibilityStatus === 'Disputed';
          default:
            return false;
        }
      });

      const topicMatch = activeFilters?.some(filter => 
        story?.topics?.includes(filter)
      );

      const ideologyMatch = activeFilters?.some(filter => {
        switch (filter) {
          case 'left':
            return story?.sourceIdeology === 'left';
          case 'center':
            return story?.sourceIdeology === 'center';
          case 'right':
            return story?.sourceIdeology === 'right';
          default:
            return false;
        }
      });

      const dateMatch = activeFilters?.some(filter => {
  
        const hoursAgo = parseInt(story?.publishedAt?.split(' ')?.[0]);
        switch (filter) {
          case 'today':
            return hoursAgo <= 24;
          case 'week':
            return hoursAgo <= 168; 
          case 'month':
            return hoursAgo <= 720; 
          default:
            return false;
        }
      });

      return credibilityMatch || topicMatch || ideologyMatch || dateMatch;
    });

    setDisplayedStories(filtered);
  }, [activeFilters, stories]);

  const handleToggleView = (listView) => {
    setIsListView(listView);
  };

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  const handleClearFilters = () => {
    setActiveFilters([]);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <>
      <Helmet>
        <title>Indian Political News Dashboard - TruthLens</title>
        <meta name="description" content="Discover trending Indian political news stories with AI-driven credibility assessments. Compare Left, Center, and Right-leaning source perspectives." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
     
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center">
                <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
                  Indian Political News Credibility Dashboard
                </h1>
                <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                  Stay informed with AI-verified Indian political news. Get instant credibility assessments and compare perspectives across Left, Center, and Right-leaning sources.
                </p>
                
             
                <StatsOverview stats={mockStats} />
              </div>
            </div>
          </div>

       
          <div className="bg-card border-b border-border sticky top-16 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleFilters}
                    iconName="Filter"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Filters {activeFilters?.length > 0 && `(${activeFilters?.length})`}
                  </Button>
                  
                  <div className="text-sm text-muted-foreground">
                    {displayedStories?.length} stories
                  </div>
                </div>

                <ViewToggle 
                  isListView={isListView} 
                  onToggleView={handleToggleView} 
                />
              </div>
            </div>
          </div>

        
          {showFilters && (
            <FilterChips
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          )}

      
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {isLoading ? (
              <LoadingSkeleton isListView={isListView} count={6} />
            ) : displayedStories?.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  No stories found
                </h3>
                <p className="text-muted-foreground font-body mb-4">
                  Try adjusting your filters or check back later for new stories.
                </p>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className={isListView ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}>
                {displayedStories?.map((story) => (
                  <StoryCard
                    key={story?.id}
                    story={story}
                    isListView={isListView}
                  />
                ))}
              </div>
            )}

         
            {!isLoading && displayedStories?.length > 0 && (
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="ChevronDown"
                  iconPosition="right"
                >
                  Load More Stories
                </Button>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default NewsDashboard;