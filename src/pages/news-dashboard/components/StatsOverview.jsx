import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ stats }) => {
  const statItems = [
    {
      label: 'Stories Verified Today',
      value: stats?.storiesVerified,
      icon: 'Shield',
      color: 'text-primary'
    },
    {
      label: 'Likely True',
      value: stats?.likelyTrue,
      icon: 'CheckCircle',
      color: 'text-success'
    },
    {
      label: 'Likely False',
      value: stats?.likelyFalse,
      icon: 'XCircle',
      color: 'text-error'
    },
    {
      label: 'Disputed',
      value: stats?.disputed,
      icon: 'AlertTriangle',
      color: 'text-warning'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems?.map((item, index) => (
          <div key={index} className="text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-muted mb-3 ${item?.color}`}>
              <Icon name={item?.icon} size={24} />
            </div>
            <div className="font-heading font-bold text-2xl text-foreground mb-1">
              {item?.value?.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground font-body">
              {item?.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsOverview;