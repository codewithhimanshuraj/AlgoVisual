import React, { useState, useEffect } from 'react';
import { Map, Play, RotateCcw } from 'lucide-react';

const ROWS = 20;
const COLS = 40;
const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState([]);
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [isVisualizing, setIsVisualizing] = useState(false);

  useEffect(() => {
    const initialGrid = createInitialGrid();
    setGrid(initialGrid);
  }, []);

  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
      isPath: false,
    };
  };

  const createInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < COLS; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };

  const handleMouseDown = (row, col) => {
    if (isVisualizing) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setIsMousePressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!isMousePressed || isVisualizing) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setIsMousePressed(false);
  };

  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    if (node.isStart || node.isFinish) return newGrid;
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const visualizeBFS = async () => {
    setIsVisualizing(true);
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    
    let queue = [startNode];
    startNode.isVisited = true;
    let newGrid = [...grid];

    while (queue.length > 0) {
      let current = queue.shift();
      if (current.isWall) continue;
      
      if (current.row !== START_NODE_ROW || current.col !== START_NODE_COL) {
        if (current.row !== FINISH_NODE_ROW || current.col !== FINISH_NODE_COL) {
          newGrid[current.row][current.col] = { ...current, isVisited: true };
          setGrid([...newGrid]);
          await sleep(10);
        }
      }

      if (current.row === finishNode.row && current.col === finishNode.col) {
        await animatePath(current);
        setIsVisualizing(false);
        return;
      }

      const neighbors = getUnvisitedNeighbors(current, newGrid);
      for (const neighbor of neighbors) {
        neighbor.isVisited = true;
        neighbor.previousNode = current;
        queue.push(neighbor);
      }
    }
    setIsVisualizing(false);
  };

  const getUnvisitedNeighbors = (node, grid) => {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < ROWS - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < COLS - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
  };

  const animatePath = async (finishNode) => {
    let current = finishNode.previousNode;
    let newGrid = [...grid];
    while (current !== null && current.previousNode !== null) {
      newGrid[current.row][current.col] = { ...current, isPath: true };
      setGrid([...newGrid]);
      await sleep(30);
      current = current.previousNode;
    }
  };

  const clearGrid = () => {
    if (isVisualizing) return;
    setGrid(createInitialGrid());
  };

  return (
    <div className="min-h-[calc(100vh-80px)] p-6 flex flex-col items-center">
      <div className="w-full max-w-7xl glass rounded-2xl p-6 mb-6 flex flex-wrap gap-6 items-center justify-between">
        <div className="flex items-center gap-4">
          <Map className="text-primary-500 w-8 h-8" />
          <h2 className="text-2xl font-bold">Pathfinding Visualizer</h2>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={clearGrid} 
            disabled={isVisualizing}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
          >
            <RotateCcw size={18} /> Clear Board
          </button>
          <button 
            onClick={visualizeBFS} 
            disabled={isVisualizing}
            className="flex items-center gap-2 px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 shadow-lg"
          >
            <Play size={18} /> {isVisualizing ? 'Visualizing...' : 'Start BFS'}
          </button>
        </div>
      </div>

      <div className="w-full max-w-7xl glass rounded-2xl p-4 flex flex-col items-center overflow-x-auto">
        <p className="mb-4 text-sm text-gray-500">Drag to create walls. Green = Start, Red = Finish</p>
        
        <div 
          className="grid gap-0 border border-gray-300 dark:border-gray-600 shadow-inner"
          style={{ gridTemplateColumns: `repeat(${COLS}, 25px)` }}
          onMouseLeave={handleMouseUp}
        >
          {grid.map((row, rowIdx) => {
            return row.map((node, nodeIdx) => {
              const { row, col, isStart, isFinish, isWall, isVisited, isPath } = node;
              
              let extraClass = 'bg-white dark:bg-gray-800';
              if (isStart) extraClass = 'bg-green-500 scale-110 z-10 rounded-sm shadow-lg shadow-green-500/50';
              else if (isFinish) extraClass = 'bg-red-500 scale-110 z-10 rounded-sm shadow-lg shadow-red-500/50';
              else if (isWall) extraClass = 'bg-gray-800 dark:bg-gray-400 scale-95 rounded-sm';
              else if (isPath) extraClass = 'bg-yellow-400 scale-105 rounded-sm shadow-md';
              else if (isVisited) extraClass = 'bg-blue-300 dark:bg-blue-700 scale-95 rounded-sm opacity-80';

              return (
                <div
                  key={`${row}-${col}`}
                  id={`node-${row}-${col}`}
                  className={`w-[25px] h-[25px] border-[0.5px] border-blue-100 dark:border-gray-700 transition-all duration-300 ${extraClass}`}
                  onMouseDown={() => handleMouseDown(row, col)}
                  onMouseEnter={() => handleMouseEnter(row, col)}
                  onMouseUp={() => handleMouseUp()}
                ></div>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
};

export default PathfindingVisualizer;
