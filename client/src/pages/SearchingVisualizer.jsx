import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Search } from 'lucide-react';
import { generateRandomArray } from '../utils/sortingAlgorithms';

const SearchingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [size, setSize] = useState(20);
  const [speed, setSpeed] = useState(50);
  const [algorithm, setAlgorithm] = useState('linear');
  const [target, setTarget] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(-1);
  const [leftIndex, setLeftIndex] = useState(-1);
  const [rightIndex, setRightIndex] = useState(-1);

  useEffect(() => {
    resetArray();
  }, [size, algorithm]);

  const resetArray = () => {
    if (isSearching) return;
    let newArr = generateRandomArray(size, 10, 99);
    if (algorithm === 'binary') {
      newArr.sort((a, b) => a - b);
    }
    setArray(newArr);
    setCurrentIndex(-1);
    setFoundIndex(-1);
    setLeftIndex(-1);
    setRightIndex(-1);
    // Select a random target that exists in the array
    setTarget(newArr[Math.floor(Math.random() * newArr.length)].toString());
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const linearSearch = async (delay) => {
    const targetNum = parseInt(target);
    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i);
      await sleep(delay);
      
      if (array[i] === targetNum) {
        setFoundIndex(i);
        return;
      }
    }
    setFoundIndex(-2); // -2 means not found
  };

  const binarySearch = async (delay) => {
    const targetNum = parseInt(target);
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
      setLeftIndex(left);
      setRightIndex(right);
      await sleep(delay);

      let mid = Math.floor((left + right) / 2);
      setCurrentIndex(mid);
      await sleep(delay);

      if (array[mid] === targetNum) {
        setFoundIndex(mid);
        return;
      } else if (array[mid] < targetNum) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    setFoundIndex(-2);
  };

  const handleSearch = async () => {
    if (isSearching || !target) return;
    setIsSearching(true);
    setCurrentIndex(-1);
    setFoundIndex(-1);
    setLeftIndex(-1);
    setRightIndex(-1);
    
    const delay = 600 - (speed * 5); // 100ms to 550ms

    if (algorithm === 'linear') {
      await linearSearch(delay);
    } else if (algorithm === 'binary') {
      await binarySearch(delay);
    }
    
    setIsSearching(false);
  };

  const getBoxStyle = (idx) => {
    if (foundIndex === idx) return 'bg-green-500 text-white scale-110 shadow-lg shadow-green-500/50 z-10';
    if (currentIndex === idx) return 'bg-yellow-400 text-black scale-110 shadow-lg shadow-yellow-400/50 z-10';
    if (algorithm === 'binary') {
      if (idx === leftIndex) return 'border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/30';
      if (idx === rightIndex) return 'border-r-4 border-blue-500 bg-blue-50 dark:bg-blue-900/30';
      if (leftIndex !== -1 && (idx < leftIndex || idx > rightIndex)) return 'opacity-30 bg-gray-200 dark:bg-gray-800 text-gray-400';
    }
    return 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm';
  };

  return (
    <div className="min-h-[calc(100vh-80px)] p-6 flex flex-col items-center">
      <div className="w-full max-w-6xl glass rounded-2xl p-6 mb-12 flex flex-wrap gap-6 items-center justify-between">
        <div className="flex items-center gap-4">
          <Search className="text-primary-500 w-8 h-8" />
          <h2 className="text-2xl font-bold">Searching Visualizer</h2>
        </div>

        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Algorithm</label>
            <select 
              disabled={isSearching}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500"
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
            >
              <option value="linear">Linear Search</option>
              <option value="binary">Binary Search (Sorted Array)</option>
            </select>
          </div>

          <div className="flex flex-col w-32">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 flex justify-between">
              <span>Array Size</span>
              <span>{size}</span>
            </label>
            <input 
              type="range" 
              min="5" max="30" 
              value={size} 
              disabled={isSearching}
              onChange={(e) => setSize(Number(e.target.value))}
              className="accent-primary-500"
            />
          </div>

          <div className="flex flex-col w-32">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 flex justify-between">
              <span>Speed</span>
              <span>{speed}%</span>
            </label>
            <input 
              type="range" 
              min="10" max="100" 
              value={speed} 
              disabled={isSearching}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="accent-primary-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Target</label>
            <input 
              type="number" 
              disabled={isSearching}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-24 outline-none focus:ring-2 focus:ring-primary-500"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={resetArray} 
            disabled={isSearching}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
          >
            <RotateCcw size={18} /> Reset
          </button>
          <button 
            onClick={handleSearch} 
            disabled={isSearching || !target}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-colors disabled:opacity-50 shadow-lg shadow-primary-500/30"
          >
            <Play size={18} /> {isSearching ? 'Searching...' : 'Start'}
          </button>
        </div>
      </div>

      {foundIndex === -2 && (
        <div className="mb-8 px-6 py-3 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-lg font-bold text-lg animate-pulse">
          Target {target} not found in array!
        </div>
      )}

      {foundIndex >= 0 && (
        <div className="mb-8 px-6 py-3 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-lg font-bold text-lg animate-bounce">
          Target {target} found at index {foundIndex}!
        </div>
      )}

      <div className="w-full max-w-6xl flex flex-wrap justify-center gap-4">
        {array.map((value, idx) => (
          <motion.div
            key={idx}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`flex flex-col items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl font-bold text-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 ${getBoxStyle(idx)}`}
          >
            {value}
            <span className="text-[10px] text-gray-400 absolute -bottom-5">{idx}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SearchingVisualizer;
