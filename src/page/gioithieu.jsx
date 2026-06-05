import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { getPagesText } from '../api/configApi';
import Profilecard from '../components/profilecard';
import Footer from '../components/footer';

function Gioithieu() {
    const [ndgioithieu, setndgioithieu] = useState({});

    useEffect(() => {
        getPagesText()
            .then(res => {
                setndgioithieu(res.data.gioithieu);
            })
            .catch(err => console.error("Lỗi:", err));
    }, []);
    return (
        <>
            <Profilecard />
            <div className="container my-4">
            <Breadcrumb>
                <Breadcrumb.Item href="/" linkProps={{ className: 'text-dark text-decoration-none' }}>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item active>Giới thiệu</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-primary mb-3">
                {ndgioithieu.title}
            </h1>

            <p className="fs-5" style={{ whiteSpace: 'pre-line' }}>
                {ndgioithieu.content}
            </p>
            </div>
            <Footer />
        </>
    )
}

export default Gioithieu