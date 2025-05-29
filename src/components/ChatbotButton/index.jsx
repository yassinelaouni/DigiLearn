import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connecting'); // 'connecting', 'connected', 'disconnected', 'error'
  const reconnectAttempts = useRef(0);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Welcome to DigiLearn Support! How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Format time helper
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Connection status colors
  const connectionStatusColor = {
    connecting: 'bg-yellow-400',
    connected: 'bg-green-400',
    disconnected: 'bg-red-400',
    error: 'bg-red-500'
  };

  // Simulate connection status (replace with actual WebSocket/API connection logic)
  useEffect(() => {
    const timer = setTimeout(() => {
      setConnectionStatus('connected');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || connectionStatus !== 'connected') return;

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Call Rasa API
      const response = await axios.post('http://localhost:5005/webhooks/rest/webhook', {
        sender: 'user',
        message: text
      });

      const botResponses = response.data;

      if (botResponses.length === 0) {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: "🤖 I didn't understand that. Could you rephrase?",
          sender: 'bot',
          timestamp: new Date()
        }]);
      } else {
        botResponses.forEach((res, index) => {
          if (res.text) {
            setMessages(prev => [...prev, {
              id: prev.length + 1 + index,
              text: res.text,
              sender: 'bot',
              timestamp: new Date()
            }]);
          }
        });
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: '❌ Error communicating with the chatbot server',
        sender: 'bot',
        timestamp: new Date()
      }]);
      setConnectionStatus('error');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
          style={{
            background: 'linear-gradient(to right, #7C66DC, #4E97F3)',
            color: 'white'
          }}
          aria-label="Open chatbot"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="10" r="1" />
            <circle cx="8" cy="10" r="1" />
            <circle cx="16" cy="10" r="1" />
          </svg>
        </button>
      ) : (
        <div className="w-80 h-[500px] flex flex-col overflow-hidden bg-white" style={{
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          border: '1px solid #e5e7eb'
        }}>
          {/* Header */}
          <div
            className="text-white p-4"
            style={{
              background: 'linear-gradient(to right, #7C66DC, #4E97F3)',
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px'
            }}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="10" r="1" />
                  <circle cx="8" cy="10" r="1" />
                  <circle cx="16" cy="10" r="1" />
                </svg>
                <h3 className="font-bold">DigiLearn AI</h3>
                <span className={`h-2 w-2 rounded-full ml-2 ${connectionStatusColor[connectionStatus]}`}></span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
                aria-label="Close chatbot"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" />
                </svg>
              </button>
            </div>
            <p className="text-xs mt-1 opacity-90">How can I help you today?</p>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-3 text-sm max-w-[80%] relative ${message.sender === 'bot'
                  ? 'bg-gray-100 text-gray-800 mr-auto rounded-r-lg rounded-bl-lg'
                  : 'text-white ml-auto rounded-l-lg rounded-br-lg'
                  }`}
                style={{
                  background: message.sender === 'user'
                    ? 'linear-gradient(to right, #7C66DC, #4E97F3)'
                    : '',
                  borderRadius: message.sender === 'bot'
                    ? '0 12px 12px 12px'
                    : '12px 0 12px 12px'
                }}
              >
                {message.text}
                <span className="text-xs opacity-70 block mt-1 text-right">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            ))}
            {isTyping && (
              <div className="p-3 text-sm max-w-[80%] bg-gray-100 text-gray-800 mr-auto rounded-r-lg rounded-bl-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-3 bg-white" style={{
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={connectionStatus === 'connected' ? "Type your message..." : "Connecting..."}
                className="flex-1 border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                style={{
                  borderRadius: '20px',
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                ref={inputRef}
                disabled={connectionStatus !== 'connected'}
              />
              <button
                onClick={handleSend}
                className="flex items-center justify-center text-white disabled:opacity-50"
                style={{
                  background: 'linear-gradient(to right, #7C66DC, #4E97F3)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px'
                }}
                aria-label="Send message"
                disabled={!input.trim() || connectionStatus !== 'connected'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
              </button>
            </div>
            {connectionStatus !== 'connected' && (
              <p className="text-xs mt-1 text-center">
                {connectionStatus === 'connecting' ? (
                  <span className="text-yellow-600">Connecting to chatbot...</span>
                ) : (
                  <span className="text-red-500">Chatbot disconnected. {reconnectAttempts.current < 3 ? 'Reconnecting...' : 'Please refresh the page.'}</span>
                )}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotComponent