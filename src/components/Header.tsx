
import React from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 border-b">
      <div className="container max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BookOpen className="h-7 w-7 text-recipe-terracotta" />
          <h1 className="text-2xl font-display font-semibold">My Recipes</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link to="/" className="text-sm font-medium">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/favorites" className="text-sm font-medium">Favorites</Link>
          </Button>
          <Button className="bg-recipe-green hover:bg-recipe-green/90" asChild>
            <Link to="/add-recipe" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>New Recipe</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
