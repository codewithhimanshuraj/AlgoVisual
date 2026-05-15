import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Code2, Terminal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const CodePlayground = () => {
  const { theme } = useTheme();
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// Write your code here\nconsole.log("Hello, World!");');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const defaultCodes = {
    javascript: '// Write your JavaScript code here\nconsole.log("Hello, World!");',
    python: '# Write your Python code here\nprint("Hello, World!")',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
    java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}'
  };

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    setCode(defaultCodes[lang]);
  };

  const LANGUAGE_VERSIONS = {
    javascript: '18.15.0',
    python: '3.10.0',
    cpp: '10.2.0',
    java: '15.0.2'
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Running code...\n');
    
    try {
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: language === 'cpp' ? 'c++' : language,
          version: LANGUAGE_VERSIONS[language] || '*',
          files: [
            {
              content: code,
            },
          ],
        }),
      });
      
      const data = await response.json();
      
      if (data.run && data.run.output) {
        setOutput(data.run.output);
      } else if (data.message) {
        setOutput(`API Error: ${data.message}`);
      } else {
        setOutput('Code executed with no output.');
      }
    } catch (err) {
      setOutput(`Error: ${err.message}\nMake sure you have an active internet connection to execute code.`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] p-6 flex flex-col items-center">
      <div className="w-full max-w-7xl glass rounded-2xl p-6 mb-6 flex flex-wrap gap-6 items-center justify-between">
        <div className="flex items-center gap-4">
          <Code2 className="text-primary-500 w-8 h-8" />
          <h2 className="text-2xl font-bold">Code Playground</h2>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <select 
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary-500"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>
          
          <button 
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center gap-2 px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 shadow-lg shadow-primary-500/30"
          >
            <Play size={18} /> {isRunning ? 'Running...' : 'Run Code'}
          </button>
        </div>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6 h-[70vh]">
        <div className="lg:col-span-2 glass rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <Editor
            height="100%"
            language={language}
            theme={theme === 'dark' ? 'vs-dark' : 'light'}
            value={code}
            onChange={(val) => setCode(val)}
            options={{
              minimap: { enabled: false },
              fontSize: 16,
              wordWrap: 'on',
              padding: { top: 20 }
            }}
          />
        </div>
        
        <div className="glass rounded-2xl p-6 flex flex-col border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4 text-gray-700 dark:text-gray-300 font-semibold border-b border-gray-200 dark:border-gray-700 pb-2">
            <Terminal size={20} />
            Output Console
          </div>
          <div className="flex-1 bg-black/5 dark:bg-black/40 rounded-xl p-4 font-mono text-sm overflow-auto whitespace-pre-wrap">
            {output || 'Run code to see output...'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;
