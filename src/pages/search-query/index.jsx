import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SearchInput from './components/SearchInput';
import RecentSearches from './components/RecentSearches';
import SearchResults from './components/SearchResults';
import SearchFilters from './components/SearchFilters';

const SearchQuery = () => {
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: 'all',
    sourceType: 'all',
    topic: 'all'
  });

  // Mock recent searches data
  const mockRecentSearches = [
    {
      query: "Did inflation really drop to 3.2% last month?",
      timestamp: "2 hours ago"
    },
    {
      query: "Is the new infrastructure bill worth $1.2 trillion?",
      timestamp: "1 day ago"
    },
    {
      query: "https://politicalnews.com/breaking-election-story",
      timestamp: "3 days ago"
    }
  ];

  // Mock search result data
  const mockSearchResult = {
    status: "Likely True",
    confidence: 85,
    summary: `Based on our analysis of multiple credible sources, this claim appears to be largely accurate. The statement aligns with official government data and has been corroborated by several independent fact-checking organizations. However, some context and nuance should be considered when interpreting this information.`,
    keyFindings: [
      "Official government statistics support the main claim",
      "Multiple independent sources confirm the core facts",
      "Timeline and context are accurately represented",
      "No significant contradictory evidence found"
    ],
    sources: [
      {
        outlet: "Associated Press",
        credibility: "High",
        excerpt: "Government data released today confirms the reported figures, with additional context showing a broader trend over the past quarter.",
        date: "Aug 15, 2025",
        type: "News Report",
        url: "https://apnews.com/example-story"
      },
      {
        outlet: "PolitiFact",
        credibility: "High",
        excerpt: "Our fact-check analysis rates this claim as 'Mostly True' based on available evidence and official documentation.",
        date: "Aug 14, 2025",
        type: "Fact-Check",
        url: "https://politifact.com/example-factcheck"
      },
      {
        outlet: "Reuters",
        credibility: "High",
        excerpt: "Independent verification through multiple government agencies supports the accuracy of these reported statistics.",
        date: "Aug 13, 2025",
        type: "News Report",
        url: "https://reuters.com/example-verification"
      }
    ]
  };

  useEffect(() => {
    setRecentSearches(mockRecentSearches);
  }, []);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setSearchResult(null);

    // Add to recent searches
    const newSearch = {
      query,
      timestamp: "Just now"
    };
    setRecentSearches(prev => [newSearch, ...prev?.slice(0, 4)]);

    // Simulate API call
    setTimeout(() => {
      setSearchResult(mockSearchResult);
      setIsLoading(false);
    }, 2000);
  };

  const handleSearchSelect = (query) => {
    handleSearch(query);
  };

  const handleClearRecentSearches = () => {
    setRecentSearches([]);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      dateRange: 'all',
      sourceType: 'all',
      topic: 'all'
    });
  };

  const breadcrumbItems = [
    { href: '/news-dashboard', label: 'Dashboard' },
    { label: 'Claim Verifier' }
  ];

  return (
    <>
      <Helmet>

        <title>Claim Verifier - Neutral Mirror</title>
        <title>Search & Query - Neutral Mirror</title>

        <meta name="description" content="Verify specific claims and article URLs through AI-powered fact-checking analysis with Neutral Mirror." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumb items={breadcrumbItems} />
            
            {/* Page Header */}
            <div className="text-center mb-8">
              <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
                Claim Verifier
              </h1>
              <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                Enter any political claim or paste a news article URL to get instant AI-powered fact-checking and credibility analysis.
              </p>
            </div>

            {/* Search Input */}
            <SearchInput onSearch={handleSearch} isLoading={isLoading} />

            {/* Advanced Filters */}
            <SearchFilters 
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onReset={handleResetFilters}
            />

            {/* Recent Searches */}
            <RecentSearches 
              searches={recentSearches}
              onSearchSelect={handleSearchSelect}
              onClearAll={handleClearRecentSearches}
            />

            {/* Search Results */}
            <SearchResults result={searchResult} isLoading={isLoading} />

            {/* Help Section */}
            {!searchResult && !isLoading && (
              <div className="w-full max-w-4xl mx-auto mt-12">
                <div className="bg-muted/50 border border-border rounded-lg p-6">
                  <h3 className="font-heading font-semibold text-foreground mb-4">
                    How to Use Claim Verifier
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-foreground mb-2 font-body">Text Claims</h4>
                      <p className="text-sm text-muted-foreground font-body">
                        Enter any political statement, statistic, or claim you want to verify. Our AI will analyze it against multiple sources.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2 font-body">Article URLs</h4>
                      <p className="text-sm text-muted-foreground font-body">
                        Paste a link to any news article or blog post to get a comprehensive credibility assessment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SearchQuery;
