import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import {
  fetchMessages,
  sendMessage,
  replyMessage,
  completeChat,
  fetchAppointmentStatus 
} from '../services/chatService'; 
import '../styles/ChatPage.css';

const ChatPage = () => { 
  const { appointmentId } = useParams(); 
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [replyInput, setReplyInput] = useState('');
  const [recipientId] = useState(1);  
  const [replyingTo, setReplyingTo] = useState(null); 
  const [status, setStatus] = useState('PENDING'); 

  useEffect(() => {
    const loadMessages = async () => {
      console.log(`Fetching messages for appointment ID: ${appointmentId}`); 
      try {
        const fetchedMessages = await fetchMessages(appointmentId); 
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    const loadStatus = async () => {
      try {
        const fetchedStatus = await fetchAppointmentStatus(appointmentId); 
        setStatus(fetchedStatus);
      } catch (error) {
        console.error('Error fetching appointment status:', error);
      }
    };

    loadMessages();
    loadStatus();

    const socket = new WebSocket('ws://your-websocket-url');

    socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      console.log(`New message received for appointment ID: ${appointmentId}`, newMessage); 
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return () => {
      socket.close(); 
    };
  }, [appointmentId]); 

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const tempMessage = {
      id: Date.now(), 
      sender_id: recipientId,
      content: input,
      appointmentId, 
    };

    setMessages((prevMessages) => [...prevMessages, tempMessage]);
    setInput('');

    console.log(`Sending message for appointment ID: ${appointmentId}`, tempMessage); 

    try {
      const newMessage = await sendMessage(recipientId, input, appointmentId);
      setMessages((prevMessages) => 
        prevMessages.map((msg) => (msg.id === tempMessage.id ? newMessage : msg))
      );
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages((prevMessages) => prevMessages.filter(msg => msg.id !== tempMessage.id));
    }
  };

  const handleReplyMessage = async (originalMessageId) => {
    if (!replyInput.trim()) return;

    console.log(`Replying to message ID: ${originalMessageId} for appointment ID: ${appointmentId}`); 

    try {
      const newReply = await replyMessage(originalMessageId, recipientId, replyInput, appointmentId);
      setMessages((prevMessages) => [...prevMessages, newReply]);
      setReplyInput('');
      setReplyingTo(null); 
    } catch (error) {
      console.error('Failed to send reply:', error);
    }
  };

  const handleCompleteChat = async () => {
    console.log(`Completing chat for appointment ID: ${appointmentId}`); 

    try {
      await completeChat(appointmentId);
      setMessages([]);  
      setStatus('ALMOST_COMPLETE'); 
      navigate('/my-appointments');
    } catch (error) {
      console.error('Failed to complete chat:', error);
    }
  };

  const isDisabled = 
    status === 'ALMOST_COMPLETE' || 
    status === 'COMPLETED' || 
    status === 'CANCELLED';

  return (
    <div className="container mx-auto mt-10 p-5">
      <h1 className="text-2xl font-bold mb-4">Chat with Therapist</h1>
      <div className="bg-white rounded-lg shadow-md p-5">
        <div className="h-96 overflow-y-auto border border-gray-200 rounded-md p-4 mb-4">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center">Start chatting now!</p>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`mb-4 ${replyingTo === msg.id ? 'bg-gray-100' : ''}`}>
                <div className={`mb-2 ${msg.sender_id === recipientId ? 'text-left' : 'text-right'}`}>
                  <span
                    className={`inline-block px-4 py-2 rounded-lg ${
                      msg.sender_id === recipientId ? 'bg-gray-300 text-gray-800' : 'bg-blue-500 text-white'
                    }`}
                  >
                    {msg.content}
                  </span>
                </div>
                
                <div className={`text-sm text-gray-600 ${msg.sender_id === recipientId ? 'text-left' : 'text-right'}`}>
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>

                {replyingTo === msg.id && (
                  <form onSubmit={() => handleReplyMessage(msg.id)} className="flex mb-2">
                    <input
                      type="text"
                      value={replyInput}
                      onChange={(e) => setReplyInput(e.target.value)}
                      placeholder="Type your reply..."
                      className="flex-grow border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isDisabled} 
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 text-white rounded-r-md px-4 py-2 hover:bg-blue-700 transition-colors"
                      disabled={isDisabled}
                    >
                      Reply
                    </button>
                  </form>
                )}
              </div>
            ))
          )}
        </div>
        <form onSubmit={handleSendMessage} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isDisabled} 
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-r-md px-4 py-2 hover:bg-blue-700 transition-colors"
            disabled={isDisabled} 
          >
            Send
          </button>
        </form>
        <button
          onClick={handleCompleteChat}
          className="mt-4 bg-red-600 text-white rounded-md px-4 py-2 hover:bg-red-700 transition-colors"
          disabled={isDisabled}
        >
          Complete Chat
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
