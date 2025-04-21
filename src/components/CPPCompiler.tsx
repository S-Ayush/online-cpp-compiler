import React, { useState, useEffect } from 'react';
import { Editor } from './Editor';
import { Terminal } from './Terminal';
import { Toolbar } from './Toolbar';
import { StatusBar } from './StatusBar';
import { CompilerService } from './CompilerService';
import { DEFAULT_CPP_CODE } from '../lib/utils';
import { cn } from '../lib/utils';

// @ts-ignore - Using dynamic import for SplitPane to handle SSR compatibility issues
const SplitPane = React.lazy(() => import('react-split-pane'));

export function CPPCompiler() {
  const [code, setCode] = useState(DEFAULT_CPP_CODE);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState<'idle' | 'compiling' | 'success' | 'error'>('idle');
  const [executionTime, setExecutionTime] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const compilerService = CompilerService.getInstance();

  const editorTheme = isDarkTheme ? 'vs-dark' : 'vs';

  const handleRunCode = async () => {
    try {
      setIsRunning(true);
      setStatus('compiling');
      setOutput('');
      
      const startTime = performance.now();
      
      const result = await compilerService.compileAndRun(code);
      
      const endTime = performance.now();
      setExecutionTime(Math.round(endTime - startTime));
      
      setOutput(result.output);
      setStatus(result.error ? 'error' : 'success');
    } catch (error) {
      setOutput(`Execution error: ${error}`);
      setStatus('error');
    } finally {
      setIsRunning(false);
    }
  };

  const handleStopExecution = async () => {
    await compilerService.stop();
    setIsRunning(false);
    setStatus('idle');
    setOutput('Execution stopped by user.');
  };

  const handleSaveCode = () => {
    try {
      const blob = new Blob([code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'code.cpp';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to save code:', error);
    }
  };

  const handleLoadCode = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.cpp,.h,.cc,.c';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          setCode(content);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleThemeToggle = () => {
    setIsDarkTheme(prev => !prev);
  };

  return (
    <div className={cn(
      "flex flex-col h-screen",
      isDarkTheme ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
    )}>
      <Toolbar 
        onRun={handleRunCode}
        onStop={handleStopExecution}
        onSave={handleSaveCode}
        onLoad={handleLoadCode}
        onThemeToggle={handleThemeToggle}
        isRunning={isRunning}
        isDarkTheme={isDarkTheme}
      />
      
      <div className="flex-1 overflow-hidden">
        <React.Suspense fallback={<div>Loading editor...</div>}>
          <SplitPane 
            split="horizontal" 
            defaultSize="60%" 
            minSize={100}
            maxSize={-100}
            style={{ 
              position: 'relative', 
              height: 'calc(100vh - 80px)' 
            }}
            paneStyle={{ overflow: 'auto' }}
            resizerStyle={{
              background: isDarkTheme ? '#374151' : '#e5e7eb',
              height: '6px',
              cursor: 'row-resize',
              zIndex: 1
            }}
          >
            <Editor 
              onChange={setCode}
              defaultValue={code}
              theme={editorTheme}
            />
            <Terminal 
              output={output} 
              isLoading={isRunning && !output} 
              error={status === 'error'} 
            />
          </SplitPane>
        </React.Suspense>
      </div>
      
      <StatusBar 
        status={status} 
        executionTime={executionTime}
        isDarkTheme={isDarkTheme}
      />
    </div>
  );
}