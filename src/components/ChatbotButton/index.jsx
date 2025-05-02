import { useEffect, useRef, useState } from 'react';

export const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Welcome to DigiLearn Support! How can we help you today?',
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const socketRef = useRef(null);
  const userId = useRef(`user_${Date.now()}`);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize WebSocket connection to Rasa
    const socketUrl = 'ws://localhost:5005';
    socketRef.current = new WebSocket(socketUrl);

    socketRef.current.onopen = () => {
      console.log('Connected to Rasa server via WebSocket');
      // Send initial greeting
      const initMessage = {
        sender: userId.current,
        message: '/greet'
      };
      socketRef.current.send(JSON.stringify(initMessage));
    };

    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Bot response:', data);
        
        if (data.text) {
          setMessages(prev => [
            ...prev,
            {
              id: Date.now(),
              text: data.text,
              sender: 'bot',
            },
          ]);
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    socketRef.current.onclose = () => {
      console.log('Disconnected from Rasa');
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }
    };
  }, []);

  const handleSend = () => {
    if (input.trim() && socketRef.current?.readyState === WebSocket.OPEN) {
      const message = {
        id: Date.now(),
        text: input,
        sender: 'user',
      };
      setMessages(prev => [...prev, message]);

      // Send message to Rasa
      socketRef.current.send(JSON.stringify({
        sender: userId.current,
        message: input
      }));

      setInput('');
    }
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
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12" strokeWidth="2"/>
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
                className={`p-3 text-sm max-w-[80%] ${
                  message.sender === 'bot' 
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
              </div>
            ))}
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
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                style={{
                  borderRadius: '20px',
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                className="flex items-center justify-center text-white"
                style={{
                  background: 'linear-gradient(to right, #7C66DC, #4E97F3)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px'
                }}
                aria-label="Send message"
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
          </div>
        </div>
      )}
    </div>
  );
};