import { Container, Row, Col, } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Footer() {
    const [info, setInfo] = useState({});
    useEffect(() => {
        axios.get('http://localhost:9999/infoshop')
            .then(res => setInfo(res.data))
            .catch(err => console.error("", err));
    }, []);
    return (
        <Container fluid className='bg-white text-dark p-4 mt-auto rounded-4 shadow-sm'>
            <Row className='gx-4'>
                <Col xs={12} md={4} className="mb-4">
                    <h3 className='fw-bold mb-2'>{info.name}</h3>
                    <p className='text-muted' style={{ whiteSpace: 'pre-line' }}>{info.mota}</p>
                </Col>

                <Col xs={12} md={4} className='d-flex flex-column mb-4'>
                    <h4 className='fw-bold mb-3'>Về chúng tôi</h4>
                    <NavLink to='/gioithieu' className='text-dark text-decoration-none mb-2'>Giới thiệu</NavLink>
                    <NavLink to='/thanhtoan' className='text-dark text-decoration-none'>Quy trình thanh toán</NavLink>
                </Col>

                <Col xs={12} md={4} className='d-flex flex-column'>
                    <h4 className='fw-bold mb-3'>Hỗ trợ</h4>
                    <NavLink to='/vanchuyen' className='text-dark text-decoration-none mb-2'>Vận chuyển</NavLink>
                    <NavLink to='/giaodich' className='text-dark text-decoration-none'>Giao dịch</NavLink>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer;
