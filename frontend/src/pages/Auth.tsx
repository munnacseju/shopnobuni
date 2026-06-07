import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', address: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const url = isLogin ? 'http://localhost:8080/api/auth/login' : 'http://localhost:8080/api/auth/register';
        
        try {
            const res = await axios.post(url, formData);
            login(res.data);
            navigate(-1); // Go back to where we came from
        } catch (err: any) {
            setError(err.response?.data || 'Authentication failed');
        }
    };

    return (
        <div className="container page-section" style={{ maxWidth: '500px' }}>
            <div className="admin-card">
                <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>{isLogin ? 'Login' : 'Create Account'}</h1>
                {error && <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" name="name" className="form-control" value={formData.name} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Delivery Address</label>
                                <textarea name="address" className="form-control" value={formData.address} onChange={handleInputChange} required style={{ height: '80px' }} />
                            </div>
                        </>
                    )}
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" className="form-control" value={formData.email} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" className="form-control" value={formData.password} onChange={handleInputChange} required />
                    </div>
                    
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        {isLogin ? 'Sign In' : 'Register'}
                    </button>
                    
                    <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                        <button type="button" className="nav-link" onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}>
                            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Auth;
