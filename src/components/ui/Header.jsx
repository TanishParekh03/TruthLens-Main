import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { path: '/news-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/search-query', label: 'Search', icon: 'Search' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    // Handle search submission
    setIsSearchExpanded(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <Link to="/news-dashboard" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <Icon name="Shield" size={20} color="white" strokeWidth={2.5} />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-heading font-bold text-xl text-foreground">TruthLens</h1>
                <p className="font-caption text-xs text-muted-foreground -mt-1">News Credibility Verification</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/10 border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {!isSearchExpanded ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSearch}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon name="Search" size={20} />
                </Button>
              ) : (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search claims or stories..."
                      className="w-64 pl-10 pr-4 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                      autoFocus
                    />
                    <Icon 
                      name="Search" 
                      size={16} 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={toggleSearch}
                    className="ml-2 text-muted-foreground hover:text-foreground"
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </form>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="md:hidden text-muted-foreground hover:text-foreground"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <nav className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    isActivePath(item?.path)
                      ? 'text-primary bg-primary/10 border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
      {/* Search Overlay for Mobile */}
      {isSearchExpanded && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-card border-b border-border shadow-card z-40">
          <form onSubmit={handleSearchSubmit} className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search claims or stories..."
                className="w-full pl-10 pr-4 py-3 text-base border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                autoFocus
              />
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
            </div>
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;