import React from 'react';

import Button from '../../../components/ui/Button';

const ViewToggle = ({ isListView, onToggleView }) => {
  return (
    <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
      <Button
        variant={!isListView ? "default" : "ghost"}
        size="sm"
        onClick={() => onToggleView(false)}
        iconName="Grid3X3"
        iconSize={16}
        className={`px-3 py-2 ${!isListView ? 'shadow-sm' : ''}`}
      >
        Grid
      </Button>
      <Button
        variant={isListView ? "default" : "ghost"}
        size="sm"
        onClick={() => onToggleView(true)}
        iconName="List"
        iconSize={16}
        className={`px-3 py-2 ${isListView ? 'shadow-sm' : ''}`}
      >
        List
      </Button>
    </div>
  );
};

export default ViewToggle;