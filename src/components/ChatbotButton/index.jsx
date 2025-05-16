import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export const ChatbotButton = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Welcome to DigiLearn Support! How can we help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const sessionId = useRef(`user_${Date.now()}`);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const message = inputMessage.trim();
    if (message === '') return;

    // Add user message to chat
    const newMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);
    setConnectionError(false);

    try {
      // Send message to Rasa server
      const response = await axios.post('http://localhost:5005/webhooks/rest/webhook', {
        sender: sessionId.current,
        message: message,
      });

      // Add bot responses to chat
      if (response.data && response.data.length > 0) {
        const botMessages = response.data.map((msg, index) => ({
          id: Date.now() + index,
          text: msg.text,
          sender: 'bot',
          timestamp: new Date(),
        }));
        setMessages((prev) => [...prev, ...botMessages]);
      }
    } catch (error) {
      console.error('Error communicating with chatbot:', error);
      setConnectionError(true);
      // Add error message to chat
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "Désolé, je n'ai pas pu me connecter au serveur. Veuillez réessayer.",
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all"
          style={{
            background: 'linear-gradient(to right, #7C66DC, #4E97F3)',
            color: 'white'
          }}
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
        <div className="w-80 h-[500px] flex flex-col overflow-hidden" style={{
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
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
                aria-label="Fermer le chatbot"
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
                className={`p-3 max-w-[80%] rounded-lg ${message.sender === 'bot'
                  ? 'bg-gray-100 text-gray-800 mr-auto rounded-bl-none'
                  : 'bg-blue-500 text-white ml-auto rounded-br-none'
                  }`}
              >
                <p>{message.text}</p>
                <p className="text-xs opacity-70 mt-1 text-right">
                  {formatTime(message.timestamp)}
                </p>
              </div>
            ))}
            {isTyping && (
              <div className="p-3 max-w-[80%] bg-gray-100 rounded-lg rounded-bl-none mr-auto">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tapez votre message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isTyping}
              />
              <button
                onClick={sendMessage}
                disabled={inputMessage.trim() === '' || isTyping}
                className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center disabled:opacity-50"
                aria-label="Envoyer le message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};