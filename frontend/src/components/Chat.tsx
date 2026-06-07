import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Chat = () => {
    const { user, isAuthenticated } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const adminId = 1; // Admin ID from DataLoader

    useEffect(() => {
        if (isOpen && isAuthenticated) {
            fetchMessages();
            const interval = setInterval(fetchMessages, 3000);
            return () => clearInterval(interval);
        }
    }, [isOpen, isAuthenticated]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchMessages = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/chat/conversation?userId1=${user?.id}&userId2=${adminId}`);
            setMessages(res.data);
        } catch (err) {
            console.error("Chat error:", err);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const payload = {
            sender: { id: user?.id },
            receiver: { id: adminId },
            content: newMessage
        };

        try {
            await axios.post('http://localhost:8080/api/chat/send', payload);
            setNewMessage('');
            fetchMessages();
        } catch (err) {
            console.error("Send error:", err);
        }
    };

    if (!isAuthenticated) return null;

    return (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 2000 }}>
            {isOpen ? (
                <div style={{ 
                    width: '350px', 
                    height: '500px', 
                    background: 'white', 
                    borderRadius: '16px', 
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}>
                    <div style={{ background: 'var(--primary)', color: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '600' }}>Shopno Buni Support</span>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.2rem', cursor: 'pointer' }}>×</button>
                    </div>
                    
                    <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {messages.length === 0 ? (
                            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '2rem' }}>How can we help you today?</p>
                        ) : (
                            messages.map((msg, idx) => (
                                <div key={idx} style={{ 
                                    maxWidth: '80%', 
                                    padding: '0.75rem 1rem', 
                                    borderRadius: '12px',
                                    fontSize: '0.9rem',
                                    alignSelf: msg.sender.id === user?.id ? 'flex-end' : 'flex-start',
                                    background: msg.sender.id === user?.id ? 'var(--primary)' : '#f1f5f9',
                                    color: msg.sender.id === user?.id ? 'white' : 'var(--text-main)'
                                }}>
                                    {msg.content}
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSendMessage} style={{ padding: '1rem', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '0.5rem' }}>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Type a message..." 
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            style={{ borderRadius: '999px' }}
                        />
                        <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1rem', borderRadius: '999px' }}>Send</button>
                    </form>
                </div>
            ) : (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="btn btn-primary" 
                    style={{ 
                        width: '60px', 
                        height: '60px', 
                        borderRadius: '50%', 
                        fontSize: '1.5rem', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        boxShadow: '0 4px 12px rgba(91, 33, 182, 0.3)'
                    }}
                >
                    💬
                </button>
            )}
        </div>
    );
};

export default Chat;
