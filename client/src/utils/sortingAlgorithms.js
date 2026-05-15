export const generateRandomArray = (length, min = 10, max = 100) => {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1) + min));
};

export const bubbleSort = async (array, setArray, setComparing, setSwapping, setSorted, speed) => {
  let arr = [...array];
  let sortedIndices = [];
  
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      setComparing([j, j + 1]);
      await sleep(speed);
      
      if (arr[j] > arr[j + 1]) {
        setSwapping([j, j + 1]);
        await sleep(speed);
        
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        setArray([...arr]);
      }
      setSwapping([]);
    }
    sortedIndices.push(arr.length - i - 1);
    setSorted([...sortedIndices]);
  }
  setComparing([]);
  setSorted(Array.from({ length: arr.length }, (_, i) => i));
};

// Selection Sort, Insertion Sort, etc., can be added here
export const selectionSort = async (array, setArray, setComparing, setSwapping, setSorted, speed) => {
  let arr = [...array];
  let sortedIndices = [];
  
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      setComparing([minIdx, j]);
      await sleep(speed);
      
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    if (minIdx !== i) {
      setSwapping([i, minIdx]);
      await sleep(speed);
      let temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
      setArray([...arr]);
      setSwapping([]);
    }
    sortedIndices.push(i);
    setSorted([...sortedIndices]);
  }
  setComparing([]);
  setSorted(Array.from({ length: arr.length }, (_, i) => i));
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
