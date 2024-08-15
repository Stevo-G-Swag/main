import React from 'react';
import Editor from "@monaco-editor/react";

const CodeEditor = ({ code, language, onChange }) => {
  return (
    <Editor
      height="50vh"
      language={language}
      value={code}
      onChange={onChange}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
      }}
    />
  );
};

export default CodeEditor;