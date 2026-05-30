import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const [cartItems, setCartItems] = useState([]);
    const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:9999/Cart')
            .then(res => setCartItems(res.data))
            .catch(err => console.error("Lỗi:", err));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       
        Promise.all(cartItems.map(item => axios.delete(`http://localhost:9999/Cart/${item.id}`)))
            .then(() => {
                setSuccess(true);
                window.dispatchEvent(new Event('cartUpdated'));
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            })
            .catch(err => console.error("Lỗi:", err));
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + ((item.Price || item.price || 0) * (item.Quantity || item.quantity || 1)), 0);

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4 text-primary fw-bold">Thanh Toán Đơn Hàng</h2>
            <Row>
                <Col md={7}>
                    <Card className="shadow-sm border-0 rounded-4 p-4 mb-4">
                        <h4 className="mb-4">Thông tin giao hàng</h4>
                        {success ? (
                            <Alert variant="success">
                                Đặt hàng thành công! Cảm ơn {formData.name}. Chúng tôi sẽ sớm giao hàng đến {formData.address}.
                                <br /> Đang quay lại trang chủ...
                            </Alert>
                        ) : (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Họ và Tên</Form.Label>
                                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Nhập họ và tên" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Số điện thoại</Form.Label>
                                    <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Nhập số điện thoại" />
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>Địa chỉ nhận hàng</Form.Label>
                                    <Form.Control as="textarea" rows={3} name="address" value={formData.address} onChange={handleChange} required placeholder="Nhập địa chỉ cụ thể" />
                                </Form.Group>
                                <Button variant="primary" type="submit" size="lg" className="w-100 rounded-3 fw-bold" disabled={cartItems.length === 0}>
                                    Xác nhận đặt hàng
                                </Button>
                            </Form>
                        )}
                    </Card>
                </Col>
                <Col md={5}>
                    <Card className="shadow-sm border-0 rounded-4 p-4">
                        <h4 className="mb-4">Đơn hàng của bạn</h4>
                        {cartItems.length === 0 ? (
                            <p className="text-muted">Giỏ hàng trống.</p>
                        ) : (
                            <div>
                                {cartItems.map(item => (
                                    <div key={item.id} className="d-flex justify-content-between mb-3 border-bottom pb-2">
                                        <div>
                                            <span className="fw-medium">{item.Name || item.name}</span>
                                            <span className="text-muted ms-2">x {item.Quantity || item.quantity || 1}</span>
                                            {item.Note && <div className="text-muted small fst-italic">Ghi chú: {item.Note}</div>}
                                        </div>
                                        <span className="fw-bold">{((item.Price || item.price || 0) * (item.Quantity || item.quantity || 1)).toLocaleString()}đ</span>
                                    </div>
                                ))}
                                <div className="d-flex justify-content-between mt-4">
                                    <h5 className="fw-bold">Tổng cộng:</h5>
                                    <h5 className="fw-bold text-danger">{totalPrice.toLocaleString()}đ</h5>
                                </div>
                            </div>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Payment;
