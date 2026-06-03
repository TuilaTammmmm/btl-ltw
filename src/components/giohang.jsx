import React, { useState, useEffect } from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
import { getCart, updateCartItem, deleteCartItem } from '../api/configApi';
import { useNavigate } from 'react-router-dom';

const Giohang = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    const fetchCart = () => {
        getCart()
            .then(res => setCartItems(res.data))
            .catch(err => console.error("Lỗi:", err));
    };

    useEffect(() => {
        fetchCart();
        window.addEventListener('cartUpdated', fetchCart);
        return () => window.removeEventListener('cartUpdated', fetchCart);
    }, []);

    const updateQuantity = (item, delta) => {
        const newQuantity = (item.Quantity || item.quantity || 1) + delta;
        if (newQuantity <= 0) {
            removeItem(item.id);
        } else {
            updateCartItem(item.id, {
                Quantity: newQuantity
            }).then(() => {
                fetchCart();
                window.dispatchEvent(new Event('cartUpdated'));
            }).catch(err => console.error("Lỗi:", err));
        }
    };

    const removeItem = (id) => {
        deleteCartItem(id)
            .then(() => {
                fetchCart();
                window.dispatchEvent(new Event('cartUpdated'));
            })
            .catch(err => console.error("Lỗi:", err));
    };

    const clearCart = () => {
        Promise.all(cartItems.map(item => deleteCartItem(item.id)))
            .then(() => {
                fetchCart();
                window.dispatchEvent(new Event('cartUpdated'));
            })
            .catch(err => console.error("Lỗi:", err));
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + ((item.Price || item.price || 0) * (item.Quantity || item.quantity || 1)), 0);

    return (
        <Card className='shadow-sm border border-light sticky-top rounded-4 overflow-hidden mt-2'>
            <Card.Header className='bg-white border-bottom-0 pt-4 pb-2 px-4'>
                <h5 className='fw-bold text-dark mb-0'>🛒 Giỏ hàng ({cartItems.length})</h5>
            </Card.Header>
            <Card.Body className='px-4 pb-0'>
                {cartItems.length === 0 ? (
                    <div className='text-center py-5 text-muted'>
                        <div className='fs-1 mb-2'>🛍️</div>
                        <p className='mb-0 fw-medium'>Chưa có món nào</p>
                        <small>Hãy chọn món ngon nhé!</small>
                    </div>
                ) : (
                    <div style={{ maxHeight: '400px', overflowY: 'auto' }} className='pe-2'>
                        <ListGroup variant='flush'>
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item.id} className='d-flex justify-content-between align-items-start py-3'>
                                    <div className='flex-grow-1'>
                                        <h6 className='mb-1'>{item.Name || item.name}</h6>
                                        {item.Note && <div className='text-muted small mb-2 fst-italic'>Ghi chú: {item.Note}</div>}
                                        <div className='d-flex align-items-center mb-1'>
                                            <Button variant='outline-secondary' size='sm' className='py-0 px-2' onClick={() => updateQuantity(item, -1)}>-</Button>
                                            <span className='mx-2'>{item.Quantity || item.quantity || 1}</span>
                                            <Button variant='outline-secondary' size='sm' className='py-0 px-2' onClick={() => updateQuantity(item, 1)}>+</Button>
                                        </div>
                                        <div className='text-danger fw-bold'>
                                            {((item.Price || item.price || 0) * (item.Quantity || item.quantity || 1)).toLocaleString()}đ
                                        </div>
                                    </div>
                                    <Button
                                        variant='outline-danger'
                                        size='sm'
                                        className='ms-2'
                                        onClick={() => removeItem(item.id)}
                                    >
                                        ×
                                    </Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                )}
            </Card.Body>
            <Card.Footer className='bg-white border-top-0 px-4 pb-4 pt-2'>
                <div className='d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded-3'>
                    <span className='fw-bold text-dark'>Tổng cộng:</span>
                    <span className='fs-5 text-danger fw-bold'>
                        {totalPrice.toLocaleString()}đ
                    </span>
                </div>
                <div className='d-grid gap-2'>
                    <Button variant='primary' size='lg' className='fw-bold rounded-3 shadow-sm' onClick={() => navigate('/payment')} disabled={cartItems.length === 0}>
                        Thanh toán
                    </Button>
                    <Button variant='light' size='sm' className='fw-medium text-danger rounded-3 mt-1' onClick={clearCart}>
                        Xóa hết
                    </Button>
                </div>
            </Card.Footer>
        </Card>
    );
}

export default Giohang;
