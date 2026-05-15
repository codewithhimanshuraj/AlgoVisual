import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Code, BookOpen, Trophy } from 'lucide-react';

const Home = () => {
  const features = [
    { title: 'Interactive Visualizers', icon: <Play className="w-8 h-8 text-blue-500" />, desc: 'Watch algorithms come to life with beautiful animations.', link: '/sorting' },
    { title: 'Code Playground', icon: <Code className="w-8 h-8 text-green-500" />, desc: 'Write, run, and test your code in our Monaco-powered editor.', link: '/playground' },
    { title: 'Theory & Notes', icon: <BookOpen className="w-8 h-8 text-purple-500" />, desc: 'Learn the concepts, time complexity, and use cases.', link: '/theory' },
    { title: 'Leaderboard', icon: <Trophy className="w-8 h-8 text-yellow-500" />, desc: 'Compete with others and track your learning streak.', link: '/leaderboard' }
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
          Master Algorithms with <br/>
          <span className="text-gradient">Visual Learning</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10">
          The ultimate platform to understand, visualize, and practice Data Structures and Algorithms. 
          Built for students, interview prep, and coding enthusiasts.
        </p>
        
        <div className="flex gap-4 justify-center mb-20">
          <Link to="/sorting" className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg shadow-primary-500/30">
            Start Visualizing
          </Link>
          <Link to="/register" className="px-8 py-4 glass hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold text-lg transition-all transform hover:scale-105">
            Create Account
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Link to={feature.link} className="glass p-6 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 group block h-full">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-full mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400">{feature.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
