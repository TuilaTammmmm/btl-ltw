import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import axios from 'axios';

function Giaodich() {
    const [ndgiaodich, setndgiaodich] = useState({});

    useEffect(() => {
        axios.get('http://localhost:9999/pagesText')
            .then(res => {
                setndgiaodich(res.data.giaodich);
            })
            .catch(err => console.error("Lỗi:", err));
    }, []);

    return (
        <div className="container mt-4">
            <Breadcrumb>
                <Breadcrumb.Item href="/" linkProps={{ className: 'text-dark text-decoration-none' }}>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item active>Giao dịch</Breadcrumb.Item>
            </Breadcrumb>

            <h1 className="text-primary mb-3">
                {ndgiaodich.title}
            </h1>

            <p className="fs-5" style={{ whiteSpace: 'pre-line' }}>
                {ndgiaodich.content}
            </p>
        </div>
    );
}

export default Giaodich;