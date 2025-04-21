import { useEffect, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { DEFAULT_CPP_CODE } from '../lib/utils';

interface EditorProps {
  onChange: (value: string) => void;
  defaultValue?: string;
  theme?: string;
}

export function Editor({ onChange, defaultValue = DEFAULT_CPP_CODE, theme = 'vs-dark' }: EditorProps) {
  const [editorMounted, setEditorMounted] = useState(false);
  const [editorContent, setEditorContent] = useState(defaultValue);

  useEffect(() => {
    if (editorMounted) {
      onChange(editorContent);
    }
  }, [editorContent, editorMounted, onChange]);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setEditorContent(value);
    }
  };

  return (
    <div className="w-full h-full">
      <MonacoEditor
        height="100%"
        language="cpp"
        value={editorContent}
        theme={theme}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          fontSize: 14,
          wordWrap: 'on',
          automaticLayout: true,
          renderLineHighlight: 'all',
          suggestOnTriggerCharacters: true,
        }}
        onMount={() => setEditorMounted(true)}
      />
    </div>
  );
}