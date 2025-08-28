import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ 
  activeFilters, 
  onFilterChange, 
  onClearFilters 
}) => {
  const credibilityFilters = [
    { id: 'likely-true', label: 'Likely True', icon: 'CheckCircle', color: 'text-success border-success/20 bg-success/10' },
    { id: 'likely-false', label: 'Likely False', icon: 'XCircle', color: 'text-error border-error/20 bg-error/10' },
    { id: 'disputed', label: 'Disputed', icon: 'AlertTriangle', color: 'text-warning border-warning/20 bg-warning/10' }
  ];

  const topicFilters = [
    { id: 'politics', label: 'Politics', icon: 'Vote' },
    { id: 'economy', label: 'Economy', icon: 'TrendingUp' },
    { id: 'healthcare', label: 'Healthcare', icon: 'Heart' },
    { id: 'climate', label: 'Climate', icon: 'Leaf' },
    { id: 'technology', label: 'Technology', icon: 'Smartphone' }
  ];

  const dateFilters = [
    { id: 'today', label: 'Today', icon: 'Calendar' },
    { id: 'week', label: 'This Week', icon: 'Calendar' },
    { id: 'month', label: 'This Month', icon: 'Calendar' }
  ];

  const isFilterActive = (filterId) => activeFilters?.includes(filterId);

  const handleFilterClick = (filterId) => {
    if (isFilterActive(filterId)) {
      onFilterChange(activeFilters?.filter(id => id !== filterId));
    } else {
      onFilterChange([...activeFilters, filterId]);
    }
  };

  const hasActiveFilters = activeFilters?.length > 0;

  return (
    <div className="bg-card border-b border-border py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-foreground">Filter Stories</h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={14}
            >
              Clear All
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {/* Credibility Filters */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Credibility Status</h4>
            <div className="flex flex-wrap gap-2">
              {credibilityFilters?.map((filter) => (
                <button
                  key={filter?.id}
                  onClick={() => handleFilterClick(filter?.id)}
                  className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                    isFilterActive(filter?.id)
                      ? `${filter?.color} border-current`
                      : 'text-muted-foreground border-border bg-background hover:bg-muted'
                  }`}
                >
                  <Icon name={filter?.icon} size={14} />
                  <span>{filter?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Topic Filters */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Topics</h4>
            <div className="flex flex-wrap gap-2">
              {topicFilters?.map((filter) => (
                <button
                  key={filter?.id}
                  onClick={() => handleFilterClick(filter?.id)}
                  className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                    isFilterActive(filter?.id)
                      ? 'text-primary border-primary bg-primary/10' :'text-muted-foreground border-border bg-background hover:bg-muted'
                  }`}
                >
                  <Icon name={filter?.icon} size={14} />
                  <span>{filter?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date Filters */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Time Period</h4>
            <div className="flex flex-wrap gap-2">
              {dateFilters?.map((filter) => (
                <button
                  key={filter?.id}
                  onClick={() => handleFilterClick(filter?.id)}
                  className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                    isFilterActive(filter?.id)
                      ? 'text-primary border-primary bg-primary/10' :'text-muted-foreground border-border bg-background hover:bg-muted'
                  }`}
                >
                  <Icon name={filter?.icon} size={14} />
                  <span>{filter?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterChips;