
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="border-b sticky top-0 bg-background z-10">
      <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-xl">Recipe Collection</Link>
        
        <nav className="flex items-center gap-4">
          <Link to="/" className="text-sm hover:text-primary transition-colors">All Recipes</Link>
          <Link to="/favorites" className="text-sm hover:text-primary transition-colors">Favorites</Link>
          <Link to="/add-recipe">
            <Button variant="outline" size="sm">Add Recipe</Button>
          </Link>
          {user && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={signOut}
            >
              Logout
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
