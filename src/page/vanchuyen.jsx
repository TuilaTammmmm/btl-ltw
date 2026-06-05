import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { getPagesText } from '../api/configApi';
import Profilecard from '../components/profilecard';
import Footer from '../components/footer';

function Vanchuyen() {
    const [ndvanchuyen, setndvanchuyen] = useState({});

    useEffect(() => {
        getPagesText()
            .then(res => {
                setndvanchuyen(res.data.vanchuyen);
            })
            .catch(err => console.error("Lỗi:", err));
    }, []);
    return (
        <>
            <Profilecard />
            <div className="container my-4">
            <Breadcrumb>
                <Breadcrumb.Item href="/" linkProps={{ className: 'text-dark text-decoration-none' }}>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item active>Vận chuyển</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-primary mb-3">
                {ndvanchuyen.title}
            </h1>

            <p className="fs-5" style={{ whiteSpace: 'pre-line' }}>
                {ndvanchuyen.content}
            </p>
            </div>
            <Footer />
        </>
    )
}

export default Vanchuyen