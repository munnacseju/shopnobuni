const Help = () => {
    return (
        <div className="container page-section">
            <h1>Help & Support</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow)' }}>
                    <h3>Order Tracking</h3>
                    <p>You can track your order status from your profile or by contacting our Facebook page with your Order ID.</p>
                </div>
                <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow)' }}>
                    <h3>Delivery Policy</h3>
                    <p>Inside Dhaka: 2-3 business days. <br/>Outside Dhaka: 5-7 business days via Courier Service.</p>
                </div>
                <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow)' }}>
                    <h3>Contact Us</h3>
                    <p>Email: support@shopnobuni.com <br/>Phone: +880 1XXX-XXXXXX <br/>Facebook: facebook.com/shopnobuni</p>
                </div>
            </div>
        </div>
    );
};

export default Help;
