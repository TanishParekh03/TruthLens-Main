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
      headline: "Senate Passes Bipartisan Infrastructure Bill with 69-30 Vote",
      summary: "The $1.2 trillion infrastructure package includes funding for roads, bridges, broadband, and clean energy initiatives across the United States.",
      source: "Associated Press",
      credibilityStatus: "Likely True",
      publishedAt: "2 hours ago",
      views: "12.5K",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXOh7pNN4DBJ5r4pevJvuWtH8PYtjI5dkE6Q&s",
      topics: ["politics", "economy"]
    },
    {
      id: 2,
      headline: "Claims About Voting Machine Tampering Lack Evidence, Officials Say",
      summary: "Election security experts and state officials refute allegations of widespread voting machine manipulation in recent elections.",
      source: "Reuters",
      credibilityStatus: "Likely False",
      publishedAt: "4 hours ago",
      views: "8.9K",
      image: "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?w=800&h=600&fit=crop",
      topics: ["politics"]
    },
    {
      id: 3,
      headline: "New Climate Report Shows Mixed Progress on Emission Targets",
      summary: "While renewable energy adoption increases, overall carbon emissions remain above Paris Agreement goals according to latest UN assessment.",
      source: "BBC News",
      credibilityStatus: "Disputed",
      publishedAt: "6 hours ago",
      views: "15.2K",
      image: "https://images.ctfassets.net/cxgxgstp8r5d/5fBHkBRDInyf5CExLh2ox0/3a6f83c1675d8058096167d389124ef0/2022IRA_ShareReductions_en_title_lg.jpg",
      topics: ["climate", "politics"]
    },
    {
      id: 4,
      headline: "Healthcare Reform Bill Advances Through House Committee",
      summary: "Proposed legislation aims to reduce prescription drug costs and expand Medicare coverage for dental and vision care.",
      source: "Washington Post",
      credibilityStatus: "Likely True",
      publishedAt: "8 hours ago",
      views: "9.7K",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
      topics: ["healthcare", "politics"]
    },
    {
      id: 5,
      headline: "Tech Giants Face New Antitrust Legislation in Congress",
      summary: "Bipartisan coalition introduces bills targeting market dominance of major technology companies and data privacy concerns.",
      source: "Wall Street Journal",
      credibilityStatus: "Likely True",
      publishedAt: "10 hours ago",
      views: "11.3K",
      image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?w=800&h=600&fit=crop",
      topics: ["technology", "politics"]
    },
    {
      id: 6,
      headline: "Unemployment Rate Drops to Lowest Level Since Pandemic",
      summary: "Labor Department reports 3.7% unemployment rate as job market continues recovery with 250,000 new positions added last month.",
      source: "CNBC",
      credibilityStatus: "Likely True",
      publishedAt: "12 hours ago",
      views: "18.4K",
      image: "https://tse1.mm.bing.net/th/id/OIP.BHrD0Xro-zR2FVTFIJY80AHaEK?pid=Api&P=0&h=180",
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

      return credibilityMatch || topicMatch || dateMatch;
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
        <title>News Dashboard - Neutral Mirror</title>
        <meta name="description" content="Discover trending political news stories with AI-driven credibility assessments. Verify claims and compare multiple source perspectives." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
     
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center">
                <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
                  Political News Credibility Dashboard
                </h1>
                <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                  Stay informed with AI-verified political news. Get instant credibility assessments and compare multiple source perspectives.
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