import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import axios from 'axios';

function Gioithieu() {
    const [ndgioithieu, setndgioithieu] = useState({});

    useEffect(() => {
        axios.get('http://localhost:9999/pagesText')
            .then(res => {
                setndgioithieu(res.data.gioithieu);
            })
            .catch(err => console.error("Lỗi:", err));
    }, []);
    return (
        <div>
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
    )
}

export default Gioithieu