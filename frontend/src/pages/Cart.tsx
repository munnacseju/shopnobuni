import type { CartItem } from '../types';
import { createOrder } from '../api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface CartProps {
    cart: CartItem[];
    removeFromCart: (id: number) => void;
    clearCart: () => void;
}

const Cart = ({ cart, removeFromCart, clearCart }: CartProps) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    const handleCheckout = () => {
        if (cart.length === 0) return;
        if (!user) {
            navigate('/auth');
            return;
        }

        const order = {
            user: { id: user.id },
            items: cart.map(item => ({
                product: { id: item.product.id },
                quantity: item.quantity,
                price: item.product.price
            })),
            totalAmount: total
        };

        createOrder(order)
            .then(res => {
                alert(`Success! Your order #${res.data.id} has been placed. We will deliver to: ${user.address}`);
                clearCart();
                navigate("/");
            })
            .catch(err => {
                console.error("Error placing order:", err);
                alert("Failed to place order. Please try again.");
            });
    };

    if (cart.length === 0) {
        return (
            <div className="container page-section" style={{ textAlign: 'center' }}>
                <h2 style={{ color: 'var(--text-muted)' }}>Your cart is empty</h2>
                <button className="btn btn-primary" style={{ marginTop: '2rem' }} onClick={() => navigate('/')}>Browse Collections</button>
            </div>
        );
    }

    return (
        <div className="container page-section">
            <h1 style={{ marginBottom: '3rem' }}>Your Shopping Bag</h1>
            
            <div className="admin-grid" style={{ gridTemplateColumns: '1fr 400px' }}>
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(item => (
                                <tr key={item.product.id}>
                                    <td style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                        <img src={item.product.imageUrl} alt={item.product.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                                        <div>
                                            <div style={{ fontWeight: '600' }}>{item.product.name}</div>
                                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>৳ {item.product.price}</div>
                                        </div>
                                    </td>
                                    <td>{item.quantity}</td>
                                    <td style={{ fontWeight: '600' }}>৳ {item.product.price * item.quantity}</td>
                                    <td>
                                        <button onClick={() => removeFromCart(item.product.id)} style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: '600', cursor: 'pointer' }}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="admin-card">
                    <h2 style={{ marginBottom: '1.5rem', fontFamily: 'Inter, sans-serif' }}>Summary</h2>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span>Subtotal</span>
                        <span>৳ {total}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontWeight: '700', fontSize: '1.25rem', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                        <span>Order Total</span>
                        <span style={{ color: 'var(--primary)' }}>৳ {total}</span>
                    </div>
                    
                    <div style={{ marginBottom: '2rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                        <h4 style={{ marginBottom: '0.5rem' }}>Shipping Details</h4>
                        <div style={{ fontWeight: '600' }}>{user?.name}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{user?.address}</div>
                    </div>

                    <button onClick={handleCheckout} className="btn btn-primary" style={{ width: '100%' }}>Confirm Order</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
