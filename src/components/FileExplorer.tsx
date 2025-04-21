import React, { useState } from 'react';
import { 
  FolderOpen, 
  FileCode, 
  ChevronRight, 
  ChevronDown, 
  Plus, 
  Trash2 
} from 'lucide-react';
import { cn } from '../lib/utils';

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
}

interface FileExplorerProps {
  onFileSelect: (fileId: string, fileName: string) => void;
  isDarkTheme: boolean;
}

export function FileExplorer({ onFileSelect, isDarkTheme }: FileExplorerProps) {
  const [files, setFiles] = useState<FileNode[]>([
    {
      id: '1',
      name: 'src',
      type: 'folder',
      children: [
        {
          id: '2',
          name: 'main.cpp',
          type: 'file'
        },
        {
          id: '3',
          name: 'utils.h',
          type: 'file'
        }
      ]
    },
    {
      id: '4',
      name: 'examples',
      type: 'folder',
      children: [
        {
          id: '5',
          name: 'hello_world.cpp',
          type: 'file'
        }
      ]
    }
  ]);

  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    '1': true,
    '4': true
  });

  const toggleFolder = (id: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderFileTree = (nodes: FileNode[], level = 0) => {
    return nodes.map(node => (
      <div key={node.id} style={{ paddingLeft: `${level * 12}px` }}>
        <div 
          className={cn(
            "flex items-center py-1 px-2 rounded-md cursor-pointer",
            "hover:bg-opacity-10",
            isDarkTheme 
              ? "hover:bg-gray-600" 
              : "hover:bg-gray-300"
          )}
          onClick={() => node.type === 'folder' 
            ? toggleFolder(node.id) 
            : onFileSelect(node.id, node.name)
          }
        >
          {node.type === 'folder' ? (
            <>
              {expandedFolders[node.id] ? (
                <ChevronDown size={16} className="mr-1" />
              ) : (
                <ChevronRight size={16} className="mr-1" />
              )}
              <FolderOpen 
                size={16} 
                className={cn(
                  "mr-1",
                  isDarkTheme ? "text-blue-300" : "text-blue-600"
                )} 
              />
            </>
          ) : (
            <>
              <div className="w-4 mr-1"></div>
              <FileCode 
                size={16} 
                className={cn(
                  "mr-1",
                  isDarkTheme ? "text-green-300" : "text-green-600"
                )} 
              />
            </>
          )}
          <span className="text-sm truncate">{node.name}</span>
        </div>
        
        {node.type === 'folder' && expandedFolders[node.id] && node.children && (
          <div>
            {renderFileTree(node.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className={cn(
      "w-full h-full overflow-auto p-2",
      isDarkTheme ? "bg-gray-800" : "bg-gray-100"
    )}>
      <div className="flex items-center justify-between mb-2 px-2">
        <h3 className="text-sm font-bold">EXPLORER</h3>
        <button 
          className={cn(
            "p-1 rounded hover:bg-opacity-10",
            isDarkTheme ? "hover:bg-gray-600" : "hover:bg-gray-300"
          )}
        >
          <Plus size={16} />
        </button>
      </div>
      {renderFileTree(files)}
    </div>
  );
}