import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchFilters = ({ filters, onFiltersChange, onReset }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const dateRanges = [
    { value: 'all', label: 'All time' },
    { value: '24h', label: 'Last 24 hours' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '1y', label: 'Last year' }
  ];

  const sourceTypes = [
    { value: 'all', label: 'All sources' },
    { value: 'news', label: 'News outlets' },
    { value: 'fact-check', label: 'Fact-checkers' },
    { value: 'government', label: 'Government' },
    { value: 'academic', label: 'Academic' }
  ];

  const topicCategories = [
    { value: 'all', label: 'All topics' },
    { value: 'politics', label: 'Politics' },
    { value: 'economy', label: 'Economy' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'environment', label: 'Environment' },
    { value: 'education', label: 'Education' },
    { value: 'foreign-policy', label: 'Foreign Policy' }
  ];

  const handleFilterChange = (filterType, value) => {
    onFiltersChange({
      ...filters,
      [filterType]: value
    });
  };

  const hasActiveFilters = filters?.dateRange !== 'all' || 
                          filters?.sourceType !== 'all' || 
                          filters?.topic !== 'all';

  return (
    <div className="w-full max-w-4xl mx-auto mt-6">
      <div className="bg-card border border-border rounded-lg shadow-sm">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors duration-200"
        >
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={18} className="text-muted-foreground" />
            <span className="font-medium text-foreground font-body">Advanced Filters</span>
            {hasActiveFilters && (
              <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                Active
              </span>
            )}
          </div>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={18} 
            className="text-muted-foreground" 
          />
        </button>

        {isExpanded && (
          <div className="border-t border-border p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 font-body">
                  Date Range
                </label>
                <select
                  value={filters?.dateRange}
                  onChange={(e) => handleFilterChange('dateRange', e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  {dateRanges?.map((range) => (
                    <option key={range?.value} value={range?.value}>
                      {range?.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Source Type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 font-body">
                  Source Type
                </label>
                <select
                  value={filters?.sourceType}
                  onChange={(e) => handleFilterChange('sourceType', e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  {sourceTypes?.map((type) => (
                    <option key={type?.value} value={type?.value}>
                      {type?.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Topic Category */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 font-body">
                  Topic Category
                </label>
                <select
                  value={filters?.topic}
                  onChange={(e) => handleFilterChange('topic', e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  {topicCategories?.map((category) => (
                    <option key={category?.value} value={category?.value}>
                      {category?.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Reset Button */}
            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={onReset}
                  iconName="RotateCcw"
                  iconPosition="left"
                  size="sm"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;