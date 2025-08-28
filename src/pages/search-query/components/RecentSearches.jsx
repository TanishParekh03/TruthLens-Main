import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentSearches = ({ searches, onSearchSelect, onClearAll }) => {
  if (!searches || searches?.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-foreground">Recent Searches</h3>
        <button
          onClick={onClearAll}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-body"
        >
          Clear all
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {searches?.map((search, index) => (
          <button
            key={index}
            onClick={() => onSearchSelect(search?.query)}
            className="inline-flex items-center space-x-2 px-3 py-2 bg-card border border-border rounded-full text-sm text-foreground hover:bg-muted transition-colors duration-200 group"
          >
            <Icon 
              name="Clock" 
              size={14} 
              className="text-muted-foreground group-hover:text-foreground transition-colors duration-200" 
            />
            <span className="font-body max-w-xs truncate">{search?.query}</span>
            <span className="text-xs text-muted-foreground">
              {search?.timestamp}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;