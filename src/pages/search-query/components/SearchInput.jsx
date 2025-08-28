import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchInput = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (query?.trim()) {
      onSearch(query?.trim());
    }
  };

  const exampleQueries = [
    "Did the President really say that about climate change?",
    "Is the unemployment rate actually at a 50-year low?",
    "https://example-news-site.com/breaking-political-story"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e?.target?.value)}
            placeholder="Enter a claim to verify or paste a news article URL..."
            className="w-full pl-12 pr-20 py-4 text-base border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent shadow-sm"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!query?.trim() || isLoading}
            loading={isLoading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            iconName="ArrowRight"
            iconPosition="right"
          >
            Verify
          </Button>
        </div>
      </form>
      {/* Example Queries */}
      <div className="mt-6">
        <p className="text-sm text-muted-foreground mb-3 font-body">Try these examples:</p>
        <div className="space-y-2">
          {exampleQueries?.map((example, index) => (
            <button
              key={index}
              onClick={() => setQuery(example)}
              className="block w-full text-left p-3 text-sm bg-muted hover:bg-muted/80 rounded-md transition-colors duration-200 border border-transparent hover:border-border"
              disabled={isLoading}
            >
              <Icon name="Quote" size={14} className="inline mr-2 text-muted-foreground" />
              <span className="font-body">{example}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchInput;