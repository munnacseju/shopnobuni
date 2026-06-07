import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../api';
import type { Product } from '../types';
import axios from 'axios';

interface ProductDetailsProps {
    addToCart: (product: Product) => void;
}

interface Review {
    id: number;
    rating: number;
    comment: string;
    user: { name: string };
}

const API_URL = 'http://localhost:8080/api';

const ProductDetails = ({ addToCart }: ProductDetailsProps) => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (id) {
            getProduct(parseInt(id)).then(res => setProduct(res.data)).catch(console.error);
            loadReviews();
        }
    }, [id]);

    const loadReviews = () => {
        axios.get(`${API_URL}/reviews/product/${id}`).then(res => setReviews(res.data)).catch(console.error);
    };

    const handleAddReview = (e: React.FormEvent) => {
        e.preventDefault();
        const mockUser = { id: 2 }; // Test User

        const newReview = {
            product: { id: parseInt(id!) },
            user: mockUser,
            rating,
            comment
        };

        axios.post(`${API_URL}/reviews`, newReview)
            .then(() => {
                setComment('');
                setRating(5);
                loadReviews();
            })
            .catch(console.error);
    };

    if (!product) return <div className="container page-section">Loading...</div>;

    return (
        <div className="container page-section">
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '500px', width: '100%', borderRadius: '8px' }} />
                <div style={{ flexGrow: 1 }}>
                    <h1>{product.name}</h1>
                    <h2 style={{ color: 'var(--primary-color)' }}>৳ {product.price}</h2>
                    <p>{product.description}</p>
                    <p>Stock: {product.stock}</p>
                    <button onClick={() => addToCart(product)} className="btn">Add to Cart</button>
                </div>
            </div>

            <div style={{ marginTop: '3rem' }}>
                <h3>Reviews</h3>
                {reviews.length === 0 ? <p>No reviews yet.</p> : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {reviews.map(rev => (
                            <li key={rev.id} style={{ marginBottom: '1rem', padding: '1rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                <div style={{ fontWeight: 'bold' }}>{rev.user?.name || 'Anonymous'} - {rev.rating}/5</div>
                                <p style={{ margin: '0.5rem 0 0' }}>{rev.comment}</p>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="admin-form" style={{ marginLeft: 0, marginTop: '2rem' }}>
                    <h4>Add a Review</h4>
                    <form onSubmit={handleAddReview}>
                        <div className="form-group">
                            <label>Rating (1-5)</label>
                            <input type="number" min="1" max="5" value={rating} onChange={e => setRating(parseInt(e.target.value))} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Comment</label>
                            <textarea value={comment} onChange={e => setComment(e.target.value)} className="form-control" required></textarea>
                        </div>
                        <button type="submit" className="btn">Submit Review</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
