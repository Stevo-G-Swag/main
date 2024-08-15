import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth/authContext';
import mockAIService from '../utils/mockAIService';
import CodeEditor from './CodeEditor';
import io from 'socket.io-client';

const ThoughtToCode = () => {
  const [thought, setThought] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [socket, setSocket] = useState(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const newSocket = io('http://localhost:5001');
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('codeUpdate', (updatedCode) => {
        setCode(updatedCode);
      });
    }
  }, [socket]);

  const handleThoughtChange = (e) => {
    setThought(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleConvert = async () => {
    try {
      const generatedCode = await mockAIService.convertThoughtToCode(thought, language);
      setCode(generatedCode);
      if (socket) {
        socket.emit('codeGenerated', { userId: authContext.user._id, code: generatedCode });
      }
    } catch (error) {
      console.error('Error converting thought to code:', error);
    }
  };

  const handleCodeChange = (value) => {
    setCode(value);
    if (socket) {
      socket.emit('codeUpdated', { userId: authContext.user._id, code: value });
    }
  };

  return (
    <div>
      <h2>Thought-to-Code Conversion</h2>
      <div>
        <textarea
          value={thought}
          onChange={handleThoughtChange}
          placeholder="Enter your thought here..."
          rows={4}
          cols={50}
        />
      </div>
      <div>
        <select value={language} onChange={handleLanguageChange}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="csharp">C#</option>
        </select>
        <button onClick={handleConvert}>Convert to Code</button>
      </div>
      <CodeEditor code={code} language={language} onChange={handleCodeChange} />
    </div>
  );
};

export default ThoughtToCode;