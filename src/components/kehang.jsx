import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { getCategories, getProducts, getCart, updateCartItem, addToCartApi } from '../api/configApi';
import Chitiet from './Chitiet';

const Kehang = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [timkiem, settimkiem] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        Promise.all([
            getCategories(),
            getProducts()
        ]).then(([catRes, prodRes]) => {
            setCategories(catRes.data);
            setProducts(prodRes.data);
        }).catch(err => console.error("Lỗi: ", err));
    }, []);

    const addToCart = (product, quantity = 1, note = '') => {
        getCart()
            .then(res => {
                const cart = res.data;
                const existing = cart.find(item => item.productId === product.id && (item.Note || '') === note);
                if (existing) {
                    updateCartItem(existing.id, {
                        Quantity: (existing.Quantity || existing.quantity || 1) + quantity
                    }).then(() => window.dispatchEvent(new Event('cartUpdated')));
                } else {
                    addToCartApi({
                        productId: product.id,
                        Name: product.Name,
                        Price: product.Price,
                        Quantity: quantity,
                        Note: note
                    }).then(() => window.dispatchEvent(new Event('cartUpdated')));
                }
            })
            .catch(err => console.error("Lỗi:", err));
    };

    const handleCardClick = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    return (
        <div className="py-2 px-2">
            <div className='mb-4'>
                <InputGroup className="shadow-sm rounded-4 overflow-hidden border">
                    <Form.Control
                        type="text"
                        placeholder="Hôm nay bạn muốn ăn gì?..."
                        className="border-0 py-3 bg-white shadow-none"
                        value={timkiem}
                        onChange={(e) => settimkiem(e.target.value)}
                    />
                </InputGroup>
            </div>
            
            <div className='d-flex flex-column gap-4'>
                {categories.map((category) => {
                    const items = products.filter(p =>
                        String(p.Category_ID) === String(category.id) &&
                        p.Name.toLowerCase().includes(timkiem.toLowerCase())
                    );

                    if (items.length === 0) return null;

                    return (
                        <div key={category.id} id={category.id}>
                            <h4 className='mb-3 text-primary fw-bold text-dark text-capitalize'>
                                {category.Category_Name} ({items.length})
                            </h4>
                            
                            {items.map(c => (
                                <Card 
                                    key={c.id} 
                                    className="mb-3 border-0 shadow-sm overflow-hidden"
                                    style={{ transition: 'transform 0.2s', cursor: 'pointer' }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    onClick={() => handleCardClick(c)}
                                >
                                    <Row className='g-0 align-items-center'>
                                        <Col xs={4} sm={3} lg={2}>
                                            <Card.Img src={c.Image || "https://placehold.co/300x200?text=No+Image"} style={{ height: '100px', objectFit: 'cover' }} />
                                        </Col>
                                        <Col xs={8} sm={9} lg={10}>
                                            <Card.Body className='d-flex justify-content-between align-items-center py-2 pe-4'>
                                                <div className='flex-grow-1 pe-3'>
                                                    <Card.Title className='text-dark fw-bold fs-6 mb-1'>
                                                        {c.Name}
                                                    </Card.Title>
                                                    <div className="text-muted small mb-1" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                        {c.Pmotangan}
                                                    </div>
                                                    <div className='text-danger fw-bold mt-2'>
                                                        {c.Price ? c.Price.toLocaleString() : 0}đ
                                                    </div>
                                                </div>
                                                <Button
                                                    variant='primary'
                                                    size='sm'
                                                    className='rounded-circle p-0 shadow-sm d-flex justify-content-center align-items-center flex-shrink-0'
                                                    style={{ width: '35px', height: '35px', fontSize: '1.2rem' }}
                                                    onClick={(e) => { e.stopPropagation(); addToCart(c); }}
                                                >
                                                    +
                                                </Button>
                                            </Card.Body>
                                        </Col>
                                    </Row>
                                </Card>
                            ))}
                        </div>
                    );
                })}
            </div>

            <Chitiet 
                show={showModal} 
                onHide={() => setShowModal(false)} 
                product={selectedProduct} 
                onAddToCart={addToCart}
            />
        </div>
    );
}

export default Kehang;