import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getInfoShop } from '../api/configApi';

const Profilecard = () => {
    const [info, setInfo] = useState({});

    useEffect(() => {
        getInfoShop()
            .then(res => setInfo(res.data))
            .catch(err => console.error("", err));
    }, []);
    return (
        <Container className='bg-white p-4 mt-4 rounded-4 shadow-sm border border-light'>
            <Row className='gx-4 align-items-center'>
                <Col xs={12} md={4} lg={3} className='text-center'>
                    <Link to="/login">
                        <div className='rounded-circle shadow-sm overflow-hidden d-inline-flex align-items-center justify-content-center p-1 bg-white border' style={{ width: '160px', height: '160px', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                            <Image src={info.image} style={{ width: '160px', height: '160px' }} />
                        </div>
                    </Link>
                </Col>

                <Col xs={12} md={8} lg={9} className='pt-3 pt-md-0'>
                    <h2 className="fs-3 fw-bold mb-2 text-primary">{info.name}</h2>
                    <p className="mb-3 text-secondary" style={{ whiteSpace: 'pre-line', fontSize: '1.1rem' }}>{info.mota}</p>

                    <div className='text-secondary small'>
                        <p className='mb-2'><strong className='text-dark'>SĐT:</strong> {info.phone}</p>
                        <p className='mb-2'><strong className='text-dark'>Địa chỉ:</strong> {info.address}</p>
                        <p className='mb-0'><strong className='text-dark'>Mở cửa:</strong> {info.time}</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Profilecard;
