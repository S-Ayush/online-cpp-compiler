import React from 'react';
import { Code, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';

interface StatusBarProps {
  status: 'idle' | 'compiling' | 'success' | 'error';
  executionTime?: number;
  isDarkTheme: boolean;
}

export function StatusBar({ status, executionTime = 0, isDarkTheme }: StatusBarProps) {
  const statusText = {
    idle: 'Ready',
    compiling: 'Compiling...',
    success: 'Execution completed',
    error: 'Compilation failed'
  };

  const statusIcon = {
    idle: <Code size={16} />,
    compiling: <Clock size={16} className="animate-pulse" />,
    success: <Code size={16} />,
    error: <AlertTriangle size={16} />
  };

  const statusClass = {
    idle: 'text-gray-400',
    compiling: 'text-blue-400',
    success: 'text-green-400',
    error: 'text-red-400'
  };

  return (
    <div className={cn(
      "px-3 py-1 text-xs flex items-center justify-between border-t",
      isDarkTheme ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-gray-100 border-gray-300 text-gray-700"
    )}>
      <div className="flex items-center space-x-4">
        <div className={cn("flex items-center space-x-1", statusClass[status])}>
          {statusIcon[status]}
          <span>{statusText[status]}</span>
        </div>
        
        {status === 'success' && (
          <div className="flex items-center space-x-1 text-gray-400">
            <Clock size={16} />
            <span>{executionTime}ms</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <span>C++</span>
        <span>|</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}