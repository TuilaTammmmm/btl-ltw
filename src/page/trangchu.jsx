import React from 'react'
import Navbar from './../components/navbar';
import Kehang from './../components/kehang';
import Giohang from '../components/giohang'
import { Container, Row, Col } from 'react-bootstrap';
import Profilecard from '../components/profilecard';
import Footer from '../components/footer';


function Home() {
    return (
        <>
            <Profilecard />
            <Container className="my-4">
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
            <Footer />
        </>
    )
}

export default Home