import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import type { User } from '../types';

const AdminChat = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [showUserSearch, setShowUserSearch] = useState(false);
    const [userSearchTerm, setUserSearchTerm] = useState('');
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        fetchChatParticipants();
        fetchAllUsers();
        const interval = setInterval(fetchChatParticipants, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (selectedUser) {
            fetchConversation();
            const interval = setInterval(fetchConversation, 3000);
            return () => clearInterval(interval);
        }
    }, [selectedUser]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchChatParticipants = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/chat/admin/users?adminId=${user?.id}`);
            setUsers(res.data);
        } catch (err) {
            console.error("Fetch participants error:", err);
        }
    };

    const fetchAllUsers = async () => {
        // In a real app, you'd have an endpoint for this. For now, we'll just show participants.
        // But to fulfill the "send to specific user" requirement, we'll allow searching for any user.
        try {
            const res = await axios.get('http://localhost:8080/api/auth/users'); // Need to create this endpoint
            setAllUsers(res.data);
        } catch (err) {
            console.error("Fetch all users error:", err);
        }
    };

    const fetchConversation = async () => {
        if (!selectedUser) return;
        try {
            const res = await axios.get(`http://localhost:8080/api/chat/conversation?userId1=${user?.id}&userId2=${selectedUser.id}`);
            setMessages(res.data);
        } catch (err) {
            console.error("Fetch conv error:", err);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedUser) return;

        const payload = {
            sender: { id: user?.id },
            receiver: { id: selectedUser.id },
            content: newMessage
        };

        try {
            await axios.post('http://localhost:8080/api/chat/send', payload);
            setNewMessage('');
            fetchConversation();
            fetchChatParticipants(); // Refresh list to show the user if they weren't there
        } catch (err) {
            console.error("Send error:", err);
        }
    };

    const startNewChat = (u: User) => {
        setSelectedUser(u);
        setShowUserSearch(false);
        setMessages([]); // Clear messages immediately for visual feedback
        // fetchConversation will be triggered by useEffect
    };

    const filteredUsers = allUsers.filter(u => 
        u.id !== user?.id && 
        (u.name.toLowerCase().includes(userSearchTerm.toLowerCase()) || u.email.toLowerCase().includes(userSearchTerm.toLowerCase()))
    );

    return (
        <div className="admin-grid" style={{ gridTemplateColumns: '320px 1fr', height: '650px' }}>
            <div className="admin-card" style={{ padding: '0', display: 'flex', flexDirection: 'column', borderRight: '1px solid #e2e8f0' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0 }}>Messages</h3>
                    <button 
                        onClick={() => setShowUserSearch(!showUserSearch)}
                        className="btn btn-primary" 
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                    >
                        {showUserSearch ? 'Back' : '+ New'}
                    </button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {showUserSearch ? (
                        <div style={{ padding: '1rem' }}>
                            <input 
                                type="text" 
                                placeholder="Search all users..." 
                                className="form-control" 
                                style={{ marginBottom: '1rem' }}
                                value={userSearchTerm}
                                onChange={(e) => setUserSearchTerm(e.target.value)}
                            />
                            {filteredUsers.map(u => (
                                <div 
                                    key={u.id} 
                                    onClick={() => startNewChat(u)}
                                    style={{ padding: '0.75rem 1rem', cursor: 'pointer', borderRadius: '8px', marginBottom: '0.5rem', border: '1px solid #f1f5f9' }}
                                >
                                    <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{u.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.email}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        users.length === 0 ? (
                            <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No active chats</p>
                        ) : (
                            users.map(u => (
                                <div 
                                    key={u.id} 
                                    onClick={() => setSelectedUser(u)}
                                    style={{ 
                                        padding: '1.25rem 1.5rem', 
                                        cursor: 'pointer', 
                                        borderBottom: '1px solid #f1f5f9',
                                        background: selectedUser?.id === u.id ? '#f1f5f9' : 'transparent',
                                        transition: 'background 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}
                                >
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>
                                        {u.name.charAt(0)}
                                    </div>
                                    <div style={{ flex: 1, overflow: 'hidden' }}>
                                        <div style={{ fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.role.replace('ROLE_', '')}</div>
                                    </div>
                                </div>
                            ))
                        )
                    )}
                </div>
            </div>

            <div className="admin-card" style={{ padding: '0', display: 'flex', flexDirection: 'column' }}>
                {!selectedUser ? (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'var(--text-muted)', gap: '1rem' }}>
                        <div style={{ fontSize: '3rem' }}>✉️</div>
                        <h3>Select a conversation to begin</h3>
                        <p>You can also start a new chat with any registered user.</p>
                    </div>
                ) : (
                    <>
                        <div style={{ padding: '1rem 2rem', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '1rem', background: '#f8fafc' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>
                                {selectedUser.name.charAt(0)}
                            </div>
                            <div>
                                <h3 style={{ margin: 0 }}>{selectedUser.name}</h3>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{selectedUser.email}</div>
                            </div>
                        </div>
                        <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#ffffff' }}>
                            {messages.map((msg, idx) => {
                                const isMe = msg.sender.id === user?.id;
                                return (
                                    <div key={idx} style={{ 
                                        maxWidth: '70%', 
                                        padding: '0.875rem 1.25rem', 
                                        borderRadius: '16px',
                                        fontSize: '0.95rem',
                                        alignSelf: isMe ? 'flex-end' : 'flex-start',
                                        background: isMe ? 'var(--primary)' : '#f1f5f9',
                                        color: isMe ? 'white' : 'var(--text-main)',
                                        borderBottomRightRadius: isMe ? '2px' : '16px',
                                        borderBottomLeftRadius: isMe ? '16px' : '2px',
                                        boxShadow: 'var(--shadow-sm)'
                                    }}>
                                        {msg.content}
                                        <div style={{ fontSize: '0.65rem', marginTop: '0.4rem', opacity: 0.7, textAlign: isMe ? 'right' : 'left' }}>
                                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>
                        <form onSubmit={handleSendMessage} style={{ padding: '1.5rem 2rem', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '1rem', background: '#f8fafc' }}>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder={`Reply to ${selectedUser.name.split(' ')[0]}...`}
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                style={{ borderRadius: '999px', paddingLeft: '1.5rem' }}
                            />
                            <button type="submit" className="btn btn-primary" style={{ borderRadius: '999px', padding: '0.75rem 2rem' }}>Send</button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminChat;
