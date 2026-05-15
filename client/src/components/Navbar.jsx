import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Sun, Moon, LogOut, User, Code2 } from 'lucide-react';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <nav className="glass sticky top-0 z-50 px-6 py-4 flex justify-between items-center transition-all duration-300">
      <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-gradient">
        <Code2 className="text-primary-500" />
        AlgoVisual
      </Link>
      
      <div className="flex items-center gap-6">
        <div className="hidden md:flex gap-4">
          <Link to="/sorting" className="hover:text-primary-500 transition-colors">Sorting</Link>
          <Link to="/searching" className="hover:text-primary-500 transition-colors">Searching</Link>
          <Link to="/graphs" className="hover:text-primary-500 transition-colors">Graphs</Link>
          <Link to="/pathfinding" className="hover:text-primary-500 transition-colors">Pathfinding</Link>
          <Link to="/playground" className="hover:text-primary-500 transition-colors">Playground</Link>
        </div>

        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
        </button>

        {user ? (
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-2 hover:text-primary-500">
              <User size={20} />
              <span className="hidden sm:inline">{user.name}</span>
            </Link>
            <button 
              onClick={logout}
              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link to="/login" className="px-4 py-2 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              Login
            </Link>
            <Link to="/register" className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
