import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { getPagesText } from '../api/configApi';

function Thanhtoan() {
    const [ndthanhtoan, setndthanhtoan] = useState({});

    useEffect(() => {
        getPagesText()
            .then(res => {
                setndthanhtoan(res.data.thanhtoan);
            })
            .catch(err => console.error("Lỗi:", err));
    }, []);
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="/" linkProps={{ className: 'text-dark text-decoration-none' }}>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item active>Thanh toán</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-primary mb-3">
                {ndthanhtoan.title}
            </h1>

            <p className="fs-5" style={{ whiteSpace: 'pre-line' }}>
                {ndthanhtoan.content}
            </p>
        </div>
    )
}

export default Thanhtoan