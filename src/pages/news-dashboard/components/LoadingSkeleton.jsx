import React from 'react';

const LoadingSkeleton = ({ isListView = false, count = 6 }) => {
  if (isListView) {
    return (
      <div className="space-y-4">
        {Array.from({ length: count })?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6 animate-pulse">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-24 h-16 bg-muted rounded-md"></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                  <div className="ml-4 h-6 w-24 bg-muted rounded-full"></div>
                </div>
                <div className="space-y-2 mb-3">
                  <div className="h-3 bg-muted rounded w-full"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-3 bg-muted rounded w-16"></div>
                    <div className="h-3 bg-muted rounded w-12"></div>
                  </div>
                  <div className="h-3 bg-muted rounded w-8"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count })?.map((_, index) => (
        <div key={index} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
          <div className="aspect-video bg-muted"></div>
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="h-6 w-24 bg-muted rounded-full"></div>
            </div>
            <div className="space-y-2 mb-3">
              <div className="h-5 bg-muted rounded w-full"></div>
              <div className="h-5 bg-muted rounded w-3/4"></div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-muted rounded w-full"></div>
              <div className="h-3 bg-muted rounded w-5/6"></div>
              <div className="h-3 bg-muted rounded w-2/3"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-3 bg-muted rounded w-16"></div>
                <div className="h-3 bg-muted rounded w-12"></div>
              </div>
              <div className="h-3 bg-muted rounded w-8"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;