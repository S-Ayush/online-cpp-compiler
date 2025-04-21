import React from 'react';
import { Play, StopCircle, Download, Upload, Save, Settings, Moon, Sun } from 'lucide-react';
import { cn } from '../lib/utils';

interface ToolbarProps {
  onRun: () => void;
  onStop?: () => void;
  onSave?: () => void;
  onLoad?: () => void;
  onThemeToggle: () => void;
  isRunning: boolean;
  isDarkTheme: boolean;
}

export function Toolbar({
  onRun,
  onStop,
  onSave,
  onLoad,
  onThemeToggle,
  isRunning,
  isDarkTheme
}: ToolbarProps) {
  return (
    <div className={cn(
      "p-2 border-b flex items-center", 
      isDarkTheme ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-300"
    )}>
      <div className="flex space-x-2">
        <button
          onClick={onRun}
          disabled={isRunning}
          className={cn(
            "p-1.5 rounded-md flex items-center",
            "transition-colors duration-200",
            isDarkTheme ? (
              isRunning 
                ? "bg-gray-700 text-gray-400" 
                : "bg-green-700 text-white hover:bg-green-600"
            ) : (
              isRunning 
                ? "bg-gray-200 text-gray-400" 
                : "bg-green-600 text-white hover:bg-green-500"
            )
          )}
          title="Run"
        >
          <Play size={20} />
          <span className="ml-1 hidden sm:inline">Run</span>
        </button>
        
        {onStop && (
          <button
            onClick={onStop}
            disabled={!isRunning}
            className={cn(
              "p-1.5 rounded-md flex items-center",
              "transition-colors duration-200",
              isDarkTheme ? (
                !isRunning 
                  ? "bg-gray-700 text-gray-400" 
                  : "bg-red-700 text-white hover:bg-red-600"
              ) : (
                !isRunning 
                  ? "bg-gray-200 text-gray-400" 
                  : "bg-red-600 text-white hover:bg-red-500"
              )
            )}
            title="Stop"
          >
            <StopCircle size={20} />
            <span className="ml-1 hidden sm:inline">Stop</span>
          </button>
        )}
      </div>
      
      <div className="flex-1"></div>
      
      <div className="flex space-x-2">
        {onSave && (
          <button
            onClick={onSave}
            className={cn(
              "p-1.5 rounded-md",
              "transition-colors duration-200",
              isDarkTheme 
                ? "text-gray-300 hover:bg-gray-700" 
                : "text-gray-700 hover:bg-gray-200"
            )}
            title="Save"
          >
            <Save size={20} />
          </button>
        )}
        
        {onLoad && (
          <button
            onClick={onLoad}
            className={cn(
              "p-1.5 rounded-md",
              "transition-colors duration-200",
              isDarkTheme 
                ? "text-gray-300 hover:bg-gray-700" 
                : "text-gray-700 hover:bg-gray-200"
            )}
            title="Load file"
          >
            <Upload size={20} />
          </button>
        )}
        
        <button
          onClick={onThemeToggle}
          className={cn(
            "p-1.5 rounded-md",
            "transition-colors duration-200",
            isDarkTheme 
              ? "text-gray-300 hover:bg-gray-700" 
              : "text-gray-700 hover:bg-gray-200"
          )}
          title={isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}
        >
          {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </div>
  );
}