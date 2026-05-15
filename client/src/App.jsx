import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SortingVisualizer from './pages/SortingVisualizer';
import SearchingVisualizer from './pages/SearchingVisualizer';
import CodePlayground from './pages/CodePlayground';
import GraphVisualizer from './pages/GraphVisualizer';
import PathfindingVisualizer from './pages/PathfindingVisualizer';

function App() {
  return (
    <Router>
      <div className="min-h-screen relative overflow-x-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="relative z-10">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/sorting" element={<SortingVisualizer />} />
              <Route path="/searching" element={<SearchingVisualizer />} />
              <Route path="/playground" element={<CodePlayground />} />
              <Route path="/graphs" element={<GraphVisualizer />} />
              <Route path="/pathfinding" element={<PathfindingVisualizer />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
