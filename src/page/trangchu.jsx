import React from 'react'
import Navbar from './../components/navbar';
import Kehang from './../components/kehang';
import Giohang from '../components/giohang'
import { Container, Row, Col } from 'react-bootstrap';


function Home() {
    return (
        <Container>
            <Row>
                <Col xs={12} md={4} lg={3} xl={2} className="mb-4">
                    <Navbar />
                </Col>

                <Col xs={12} md={8} lg={6} xl={7} className="mb-4">
                    <Kehang />
                </Col>

                <Col xs={12} lg={3} xl={3}>
                    <Giohang />
                </Col>
            </Row>
        </Container>
    )
}

export default Home