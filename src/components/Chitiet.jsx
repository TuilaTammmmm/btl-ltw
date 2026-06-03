import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, Form, Button } from 'react-bootstrap';

const Chitiet = ({ show, onHide, product, onAddToCart }) => {
    const [modalQuantity, setModalQuantity] = useState(1);
    const [modalNote, setModalNote] = useState('');


    useEffect(() => {
        if (show) {
            setModalQuantity(1);
            setModalNote('');
        }
    }, [show, product]);

    if (!product) return null;

    const handleConfirmAdd = () => {
        onAddToCart(product, modalQuantity, modalNote);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered size="md">
            <Modal.Header closeButton className='border-0 pb-0'></Modal.Header>
            <Modal.Body className='pt-0'>
                <Row className="mb-4">
                    <Col xs={4}>
                        <img 
                            src={product.Image || "https://placehold.co/100x100"} 
                            alt={product.Name} 
                            style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '8px' }} 
                        />
                    </Col>
                    <Col xs={8}>
                        <h5 className="fw-bold text-dark">{product.Name}</h5>
                        <div className="text-secondary mb-2">{product.Price.toLocaleString()} ₫</div>
                        <p className="text-muted small">
                            {product.Pmotadaydu || product.Pmotangan}
                        </p>
                    </Col>
                </Row>
                
                <div className="mb-3 border-top pt-3">
                    <Form.Label className="fw-medium">Ghi chú</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Nhập ghi chú để nhà hàng phục vụ tốt hơn" 
                        value={modalNote}
                        onChange={(e) => setModalNote(e.target.value)}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer className='border-top d-flex justify-content-between align-items-center' style={{ flexWrap: 'nowrap' }}>
                <div>
                    <div className="fw-bold mb-1">{(product.Price * modalQuantity).toLocaleString()} ₫</div>
                    <div className="d-flex align-items-center">
                        <span className="me-2 text-muted small">Số lượng</span>
                        <Button 
                            variant="danger" 
                            className="rounded-circle p-0 d-flex justify-content-center align-items-center text-white" 
                            style={{ width: '28px', height: '28px', backgroundColor: '#ff4d4f', border: 'none', flexShrink: 0 }}
                            onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                        >
                            -
                        </Button>
                        <span className="mx-3 fw-medium">{modalQuantity}</span>
                        <Button 
                            variant="warning" 
                            className="rounded-circle p-0 d-flex justify-content-center align-items-center text-white" 
                            style={{ width: '28px', height: '28px', backgroundColor: '#a46741', border: 'none', flexShrink: 0 }}
                            onClick={() => setModalQuantity(modalQuantity + 1)}
                        >
                            +
                        </Button>
                    </div>
                </div>
                <Button 
                    className="fw-bold text-white flex-shrink-0" 
                    style={{ backgroundColor: '#a46741', border: 'none', padding: '10px 20px', borderRadius: '8px' }}
                    onClick={handleConfirmAdd}
                >
                    Thêm {modalQuantity} mặt hàng
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Chitiet;