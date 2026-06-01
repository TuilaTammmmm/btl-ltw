import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { getPagesText } from '../api/configApi';

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
        <div>
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
    )
}

export default Vanchuyen