import React, { useState, useRef, useEffect } from 'react';
import { Network, Play, RotateCcw, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const GraphVisualizer = () => {
  const [nodes, setNodes] = useState([
    { id: 0, x: 100, y: 100 },
    { id: 1, x: 300, y: 100 },
    { id: 2, x: 200, y: 250 },
  ]);
  const [edges, setEdges] = useState([
    { source: 0, target: 1 },
    { source: 1, target: 2 },
    { source: 2, target: 0 },
  ]);
  
  const [mode, setMode] = useState('select'); // select, addNode, addEdge, delete
  const [selectedNode, setSelectedNode] = useState(null);
  const [algorithm, setAlgorithm] = useState('bfs');
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [visited, setVisited] = useState([]);
  const [activeEdge, setActiveEdge] = useState(null);
  const [startNode, setStartNode] = useState(0);

  const svgRef = useRef(null);

  const handleSvgClick = (e) => {
    if (mode !== 'addNode' || isVisualizing) return;
    
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setNodes([...nodes, { id: nodes.length, x, y }]);
  };

  const handleNodeClick = (e, id) => {
    e.stopPropagation();
    if (isVisualizing) return;

    if (mode === 'addEdge') {
      if (selectedNode === null) {
        setSelectedNode(id);
      } else {
        if (selectedNode !== id) {
          // Check if edge exists
          const exists = edges.find(e => 
            (e.source === selectedNode && e.target === id) || 
            (e.source === id && e.target === selectedNode)
          );
          if (!exists) {
            setEdges([...edges, { source: selectedNode, target: id }]);
          }
        }
        setSelectedNode(null);
      }
    } else if (mode === 'delete') {
      setNodes(nodes.filter(n => n.id !== id));
      setEdges(edges.filter(e => e.source !== id && e.target !== id));
      if (startNode === id) setStartNode(nodes.length > 1 ? nodes.find(n => n.id !== id).id : 0);
    } else if (mode === 'select') {
      setStartNode(id);
    }
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const runBFS = async () => {
    setIsVisualizing(true);
    setVisited([]);
    setActiveEdge(null);
    
    let queue = [startNode];
    let visitedNodes = new Set([startNode]);
    let visitedArr = [];

    while (queue.length > 0) {
      let current = queue.shift();
      visitedArr.push(current);
      setVisited([...visitedArr]);
      await sleep(800);

      const neighbors = edges
        .filter(e => e.source === current || e.target === current)
        .map(e => e.source === current ? e.target : e.source);

      for (let neighbor of neighbors) {
        if (!visitedNodes.has(neighbor)) {
          setActiveEdge({ source: current, target: neighbor });
          await sleep(500);
          
          visitedNodes.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    setActiveEdge(null);
    setIsVisualizing(false);
  };

  const runDFS = async () => {
    setIsVisualizing(true);
    setVisited([]);
    setActiveEdge(null);
    
    let visitedNodes = new Set();
    let visitedArr = [];

    const dfs = async (node) => {
      visitedNodes.add(node);
      visitedArr.push(node);
      setVisited([...visitedArr]);
      await sleep(800);

      const neighbors = edges
        .filter(e => e.source === node || e.target === node)
        .map(e => e.source === node ? e.target : e.source);

      for (let neighbor of neighbors) {
        if (!visitedNodes.has(neighbor)) {
          setActiveEdge({ source: node, target: neighbor });
          await sleep(500);
          await dfs(neighbor);
        }
      }
    };

    await dfs(startNode);
    setActiveEdge(null);
    setIsVisualizing(false);
  };

  const handleStart = () => {
    if (algorithm === 'bfs') runBFS();
    else runDFS();
  };

  const resetGraph = () => {
    setVisited([]);
    setActiveEdge(null);
    setIsVisualizing(false);
  };

  const clearAll = () => {
    setNodes([]);
    setEdges([]);
    setVisited([]);
    setActiveEdge(null);
    setStartNode(0);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] p-6 flex flex-col items-center">
      <div className="w-full max-w-6xl glass rounded-2xl p-6 mb-6 flex flex-wrap gap-6 items-center justify-between">
        <div className="flex items-center gap-4">
          <Network className="text-primary-500 w-8 h-8" />
          <h2 className="text-2xl font-bold">Graph Visualizer</h2>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button 
              onClick={() => setMode('select')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === 'select' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-500'}`}
            >Select Start</button>
            <button 
              onClick={() => setMode('addNode')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === 'addNode' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-500'}`}
            >Add Node</button>
            <button 
              onClick={() => setMode('addEdge')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === 'addEdge' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-500'}`}
            >Add Edge</button>
            <button 
              onClick={() => setMode('delete')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === 'delete' ? 'bg-red-500 text-white shadow-sm' : 'text-gray-500'}`}
            ><Trash2 size={16}/></button>
          </div>

          <select 
            disabled={isVisualizing}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary-500"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
          >
            <option value="bfs">Breadth First Search (BFS)</option>
            <option value="dfs">Depth First Search (DFS)</option>
          </select>
          
          <div className="flex gap-2">
            <button 
              onClick={resetGraph}
              disabled={isVisualizing}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 transition-colors disabled:opacity-50"
              title="Reset Traversal"
            ><RotateCcw size={20} /></button>
            
            <button 
              onClick={handleStart}
              disabled={isVisualizing || nodes.length === 0}
              className="flex items-center gap-2 px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 shadow-lg"
            >
              <Play size={18} /> {isVisualizing ? 'Running...' : 'Start'}
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl glass rounded-2xl p-4 h-[65vh] flex relative">
        <svg 
          ref={svgRef}
          className="w-full h-full cursor-crosshair border border-gray-200 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-black/20"
          onClick={handleSvgClick}
        >
          {/* Edges */}
          {edges.map((edge, idx) => {
            const source = nodes.find(n => n.id === edge.source);
            const target = nodes.find(n => n.id === edge.target);
            if (!source || !target) return null;
            
            const isActive = activeEdge && 
              ((activeEdge.source === source.id && activeEdge.target === target.id) || 
               (activeEdge.target === source.id && activeEdge.source === target.id));

            return (
              <line 
                key={idx}
                x1={source.x} y1={source.y}
                x2={target.x} y2={target.y}
                stroke={isActive ? '#eab308' : '#cbd5e1'}
                strokeWidth={isActive ? 4 : 2}
                className="transition-all duration-300"
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const isVisited = visited.includes(node.id);
            const isStart = startNode === node.id;
            const isSelected = selectedNode === node.id;

            let fill = '#3b82f6'; // default blue
            if (isVisited) fill = '#22c55e'; // green visited
            if (isStart) fill = '#a855f7'; // purple start node
            if (isSelected) fill = '#f97316'; // orange selected

            return (
              <g 
                key={node.id} 
                transform={`translate(${node.x},${node.y})`}
                onClick={(e) => handleNodeClick(e, node.id)}
                className="cursor-pointer"
              >
                <circle 
                  r="20" 
                  fill={fill} 
                  className={`transition-colors duration-300 hover:stroke-2 hover:stroke-white ${mode === 'delete' ? 'hover:fill-red-500' : ''}`}
                />
                <text 
                  textAnchor="middle" 
                  dy=".3em" 
                  fill="white" 
                  className="font-bold text-sm pointer-events-none"
                >
                  {node.id}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="absolute bottom-6 left-8 bg-white/90 dark:bg-gray-800/90 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-sm">
          <div className="font-bold mb-2 text-gray-700 dark:text-gray-300">Legend</div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-500"></div> Start Node</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Unvisited</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div> Visited</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphVisualizer;
