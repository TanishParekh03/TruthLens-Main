import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ items = [] }) => {
  if (!items || items?.length === 0) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm font-body mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items?.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="text-muted-foreground mx-2 flex-shrink-0" 
              />
            )}
            
            {item?.href && index < items?.length - 1 ? (
              <Link
                to={item?.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 truncate max-w-xs sm:max-w-sm md:max-w-md"
                title={item?.label}
              >
                {item?.label}
              </Link>
            ) : (
              <span 
                className="text-foreground font-medium truncate max-w-xs sm:max-w-sm md:max-w-md"
                title={item?.label}
              >
                {item?.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;