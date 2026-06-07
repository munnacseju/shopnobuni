import { useEffect, useState } from 'react';
import { getProducts } from '../api';
import type { Product } from '../types';
import { Link } from 'react-router-dom';

interface OffersProps {
    addToCart: (product: Product) => void;
}

const Offers = ({ addToCart }: OffersProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts().then(res => {
            const discounted = res.data.filter((p: Product) => p.discountPercentage > 0);
            setProducts(discounted);
            setLoading(false);
        }).catch(console.error);
    }, []);

    return (
        <div className="container page-section">
            <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>Exclusive Offers</h1>
            {loading ? <p>Loading offers...</p> : (
                <div className="product-grid">
                    {products.map(product => {
                        const discountedPrice = product.price * (1 - product.discountPercentage / 100);
                        return (
                            <div key={product.id} className="product-card">
                                <div className="badge-offer">{product.discountPercentage}% OFF</div>
                                <img src={product.imageUrl} alt={product.name} className="product-image" />
                                <div className="product-info">
                                    <span className="badge-category">{product.category}</span>
                                    <h2 className="product-title">
                                        <Link to={`/product/${product.id}`}>{product.name}</Link>
                                    </h2>
                                    <div className="product-price-container">
                                        <span className="product-price">৳ {Math.round(discountedPrice)}</span>
                                        <span className="price-old">৳ {product.price}</span>
                                    </div>
                                    <button onClick={() => addToCart(product)} className="btn">Add to Cart</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Offers;
