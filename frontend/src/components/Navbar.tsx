import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
    cartCount: number;
}

const Navbar = ({ cartCount }: NavbarProps) => {
    const location = useLocation();
    const { isAuthenticated, isAdmin, logout, user } = useAuth();

    const isActive = (path: string) => location.pathname === path ? 'active' : '';

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="navbar-brand">Shopno Buni</Link>
                <div className="navbar-links">
                    <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
                    <Link to="/offers" className={`nav-link ${isActive('/offers')}`}>Offers</Link>
                    {isAdmin && <Link to="/admin" className={`nav-link ${isActive('/admin')}`}>Admin</Link>}
                    <Link to="/cart" className={`nav-link cart-link ${isActive('/cart')}`}>
                        Cart ({cartCount})
                    </Link>
                    {isAuthenticated ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Hi, {user?.name.split(' ')[0]}</span>
                            <button onClick={logout} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', color: '#ef4444' }}>Logout</button>
                        </div>
                    ) : (
                        <Link to="/auth" className={`nav-link ${isActive('/auth')}`} style={{ fontWeight: '700', color: 'var(--primary)' }}>Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
