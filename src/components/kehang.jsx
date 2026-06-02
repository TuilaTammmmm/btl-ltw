import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Chitiet from './Chitiet'; 

const Kehang = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        Promise.all([
            axios.get('http://localhost:9999/Category'),
            axios.get('http://localhost:9999/Product')
        ]).then(([catRes, prodRes]) => {
            setCategories(catRes.data);
            setProducts(prodRes.data);
        }).catch(err => console.error("Lỗi:", err));
    }, []);

    const addToCart = (product, quantity = 1, note = '') => {
        axios.get('http://localhost:9999/Cart')
            .then(res => {
                const cart = res.data;
                const existing = cart.find(item => item.productId === product.id && (item.Note || '') === note);
                if (existing) {
                    axios.patch(`http://localhost:9999/Cart/${existing.id}`, {
                        Quantity: (existing.Quantity || existing.quantity || 1) + quantity
                    }).then(() => window.dispatchEvent(new Event('cartUpdated')));
                } else {
                    axios.post('http://localhost:9999/Cart', {
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
        <div className='py-2 px-2'>
            {}

            {categories.map((category) => {
                const items = products.filter(p =>
                    String(p.Category_ID) === String(category.id)
                );
                if (items.length === 0) return null;

                return (
                    <section key={category.id} id={category.id} className='mb-5'>
                        <h3 className='mb-4 text-capitalize border-bottom pb-2 fw-bold text-dark d-flex align-items-center justify-content-between'>
                            <span>{category.Category_Name}</span>
                            <span className="badge bg-light text-secondary fs-6 rounded-pill border fw-normal">{items.length} món</span>
                        </h3>
                        <div className='d-flex flex-column gap-4'>
                            {items.map((item) => (
                                <Card 
                                    key={item.id} 
                                    className='shadow-sm border-0 rounded-4 overflow-hidden' 
                                    style={{ transition: 'transform 0.2s', cursor: 'pointer' }} 
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'} 
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    onClick={() => handleCardClick(item)}
                                >
                                    <Row className='g-0 align-items-center'>
                                        <Col xs={4} sm={3} lg={2}>
                                            <Card.Img src={item.Image || "https://placehold.co/300x200?text=No+Image"} style={{ height: '100px', objectFit: 'cover' }} />
                                        </Col>
                                        <Col xs={8} sm={9} lg={10}>
                                            <Card.Body className='d-flex justify-content-between align-items-center py-2 pe-4'>
                                                <div className='flex-grow-1 pe-3'>
                                                    <Card.Title className='text-dark fw-bold fs-6 mb-1'>
                                                        {item.Name}
                                                    </Card.Title>
                                                    <div className='text-muted small mb-1' style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                        {item.Pmotangan}
                                                    </div>
                                                    <div className='fw-bold text-danger'>
                                                        {item.Price.toLocaleString()}đ
                                                    </div>
                                                </div>
                                                <Button
                                                    variant='primary'
                                                    size='sm'
                                                    className='rounded-circle p-0 shadow-sm d-flex justify-content-center align-items-center flex-shrink-0'
                                                    style={{ width: '35px', height: '35px', fontSize: '1.2rem' }}
                                                    onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                                                >
                                                    +
                                                </Button>
                                            </Card.Body>
                                        </Col>
                                    </Row>
                                </Card>
                            ))}
                        </div>
                    </section>
                )
            })}

            <Chitiet 
                show={showModal} 
                onHide={() => setShowModal(false)} 
                product={selectedProduct} 
                onAddToCart={addToCart}
            />
        </div>
    )
}

export default Kehang;