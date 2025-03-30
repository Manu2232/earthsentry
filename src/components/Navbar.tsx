
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin, AlertTriangle, Home, Plus, List } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <AlertTriangle className="w-6 h-6 text-accent" />
          <span className="text-lg font-bold text-primary-700">EarthSentry</span>
        </Link>
        
        {/* Desktop navigation */}
        <nav className="hidden space-x-8 md:flex">
          <Link
            to="/"
            className="flex items-center px-1 text-sm font-medium transition-colors text-secondary hover:text-primary"
          >
            <Home className="w-4 h-4 mr-1" />
            Home
          </Link>
          <Link
            to="/report"
            className="flex items-center px-1 text-sm font-medium transition-colors text-secondary hover:text-primary"
          >
            <Plus className="w-4 h-4 mr-1" />
            Report
          </Link>
          <Link
            to="/reports"
            className="flex items-center px-1 text-sm font-medium transition-colors text-secondary hover:text-primary"
          >
            <List className="w-4 h-4 mr-1" />
            Reports
          </Link>
          <Link
            to="/map"
            className="flex items-center px-1 text-sm font-medium transition-colors text-secondary hover:text-primary"
          >
            <MapPin className="w-4 h-4 mr-1" />
            Map
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link to="/report" className="hidden md:inline-flex">
            <Button className="bg-accent hover:bg-accent/90">
              Report Illegal Mining
            </Button>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="p-2 text-gray-500 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="px-2 pt-2 pb-4 space-y-1 bg-white md:hidden">
          <Link
            to="/"
            className="flex items-center px-3 py-2 text-base font-medium rounded-md hover:bg-primary-50 text-secondary"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </Link>
          <Link
            to="/report"
            className="flex items-center px-3 py-2 text-base font-medium rounded-md hover:bg-primary-50 text-secondary"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Report
          </Link>
          <Link
            to="/reports"
            className="flex items-center px-3 py-2 text-base font-medium rounded-md hover:bg-primary-50 text-secondary"
            onClick={() => setMobileMenuOpen(false)}
          >
            <List className="w-5 h-5 mr-2" />
            Reports
          </Link>
          <Link
            to="/map"
            className="flex items-center px-3 py-2 text-base font-medium rounded-md hover:bg-primary-50 text-secondary"
            onClick={() => setMobileMenuOpen(false)}
          >
            <MapPin className="w-5 h-5 mr-2" />
            Map
          </Link>
          <Link
            to="/report"
            className="flex items-center w-full px-3 py-2 mt-4 text-base font-medium text-white rounded-md bg-accent"
            onClick={() => setMobileMenuOpen(false)}
          >
            Report Illegal Mining
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
