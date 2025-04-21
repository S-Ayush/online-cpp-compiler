import React, { useState } from 'react';
import { CPPCompiler } from './components/CPPCompiler';
import { FileExplorer } from './components/FileExplorer';
import { Code, MenuIcon, X } from 'lucide-react';
import { cn } from './lib/utils';

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(prev => !prev);
  };

  return (
    <div className={cn(
      "flex flex-col h-screen",
      isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-gray-800"
    )}>
      {/* App bar */}
      <div className={cn(
        "h-12 flex items-center px-4 border-b",
        isDarkTheme ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-300"
      )}>
        <button 
          onClick={toggleSidebar}
          className={cn(
            "p-1.5 rounded-md mr-2",
            "transition-colors duration-200",
            isDarkTheme 
              ? "hover:bg-gray-700" 
              : "hover:bg-gray-200"
          )}
        >
          {showSidebar ? <X size={20} /> : <MenuIcon size={20} />}
        </button>
        
        <div className="flex items-center">
          <Code size={24} className="mr-2 text-blue-500" />
          <h1 className="text-lg font-semibold">C++ Online Compiler</h1>
        </div>
        
        <div className="flex-1"></div>
        
        <div className="text-sm opacity-70">
          <span>v1.0.0</span>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {showSidebar && (
          <div className={cn(
            "w-48 lg:w-64 border-r",
            isDarkTheme ? "border-gray-700" : "border-gray-300"
          )}>
            <FileExplorer 
              onFileSelect={(id, name) => {
                console.log('Selected file:', id, name);
                // In a real app, this would load the file content
              }} 
              isDarkTheme={isDarkTheme}
            />
          </div>
        )}
        
        {/* Editor + Terminal */}
        <div className="flex-1">
          <CPPCompiler />
        </div>
      </div>
    </div>
  );
}

export default App;