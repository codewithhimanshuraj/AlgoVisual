import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Settings, BarChart2 } from 'lucide-react';
import { generateRandomArray, bubbleSort, selectionSort } from '../utils/sortingAlgorithms';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [size, setSize] = useState(30);
  const [speed, setSpeed] = useState(50);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [isSorting, setIsSorting] = useState(false);
  
  // Highlighting states
  const [comparing, setComparing] = useState([]);
  const [swapping, setSwapping] = useState([]);
  const [sorted, setSorted] = useState([]);

  useEffect(() => {
    resetArray();
  }, [size]);

  const resetArray = () => {
    if (isSorting) return;
    setArray(generateRandomArray(size, 10, 300));
    setComparing([]);
    setSwapping([]);
    setSorted([]);
  };

  const handleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    
    // Convert slider speed (1-100) to delay (ms)
    // Higher slider value = faster speed = lower delay
    const delay = 110 - speed;

    if (algorithm === 'bubble') {
      await bubbleSort(array, setArray, setComparing, setSwapping, setSorted, delay);
    } else if (algorithm === 'selection') {
      await selectionSort(array, setArray, setComparing, setSwapping, setSorted, delay);
    }
    
    setIsSorting(false);
  };

  const getBarColor = (index) => {
    if (sorted.includes(index)) return '#22c55e'; // Green for sorted
    if (swapping.includes(index)) return '#ef4444'; // Red for swapping
    if (comparing.includes(index)) return '#eab308'; // Yellow for comparing
    return '#3b82f6'; // Default Blue
  };

  return (
    <div className="min-h-[calc(100vh-80px)] p-6 flex flex-col items-center">
      <div className="w-full max-w-6xl glass rounded-2xl p-6 mb-8 flex flex-wrap gap-6 items-center justify-between">
        <div className="flex items-center gap-4">
          <BarChart2 className="text-primary-500 w-8 h-8" />
          <h2 className="text-2xl font-bold">Sorting Visualizer</h2>
        </div>

        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Algorithm</label>
            <select 
              disabled={isSorting}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500"
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
            >
              <option value="bubble">Bubble Sort</option>
              <option value="selection">Selection Sort</option>
              <option value="insertion" disabled>Insertion Sort (Soon)</option>
              <option value="merge" disabled>Merge Sort (Soon)</option>
              <option value="quick" disabled>Quick Sort (Soon)</option>
            </select>
          </div>

          <div className="flex flex-col w-32">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 flex justify-between">
              <span>Array Size</span>
              <span>{size}</span>
            </label>
            <input 
              type="range" 
              min="10" max="100" 
              value={size} 
              disabled={isSorting}
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
              disabled={isSorting}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="accent-primary-500"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={resetArray} 
            disabled={isSorting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
          >
            <RotateCcw size={18} /> Reset
          </button>
          <button 
            onClick={handleSort} 
            disabled={isSorting}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-colors disabled:opacity-50 shadow-lg shadow-primary-500/30"
          >
            <Play size={18} /> {isSorting ? 'Sorting...' : 'Start'}
          </button>
        </div>
      </div>

      <div className="w-full max-w-6xl glass rounded-2xl p-8 h-[60vh] flex items-end justify-center gap-[2px]">
        {array.map((value, idx) => (
          <motion.div
            key={idx}
            layout
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="rounded-t-sm w-full"
            style={{
              height: `${(value / 300) * 100}%`,
              backgroundColor: getBarColor(idx),
            }}
          ></motion.div>
        ))}
      </div>
      
      <div className="w-full max-w-6xl mt-4 flex gap-4 text-sm font-medium justify-center">
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-blue-500"></div> Unsorted</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-yellow-500"></div> Comparing</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-red-500"></div> Swapping</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-green-500"></div> Sorted</div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
