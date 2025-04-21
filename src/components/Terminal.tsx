import React, { useEffect, useRef } from 'react';
import { cn } from '../lib/utils';

interface TerminalProps {
  output: string;
  isLoading?: boolean;
  error?: boolean;
}

export function Terminal({ output, isLoading = false, error = false }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div 
      className="w-full h-full bg-gray-900 text-gray-200 font-mono text-sm overflow-auto p-4"
      ref={terminalRef}
    >
      <pre className={cn(
        "whitespace-pre-wrap", 
        error && "text-red-400",
        !error && "text-green-400"
      )}>
        {isLoading ? (
          <div className="flex items-center">
            <span className="inline-block mr-2">Compiling</span>
            <span className="animate-pulse">...</span>
          </div>
        ) : (
          output
        )}
      </pre>
    </div>
  );
}