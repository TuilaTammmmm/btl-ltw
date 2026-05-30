import React, { useState, useEffect } from 'react';
import { Nav, Container } from 'react-bootstrap';
import axios from 'axios';

const Navbar = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9999/Category')
            .then(res => setCategories(res.data))
            .catch(err => console.error("Lỗi:", err));
    }, []);

    const handleScroll = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='sticky-top pt-2'>
            <div className='bg-white rounded-4 shadow-sm p-3 border border-light'>
                <h5 className='fw-bold mb-3 text-dark px-2'>📌 Thực đơn</h5>
                <Nav className='flex-column gap-2'>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className='btn btn-light w-100 text-start fw-bold rounded-3 py-2 px-3 border-0 text-dark'
                            onClick={() => handleScroll(category.id)}
                            style={{ transition: 'all 0.2s ease', backgroundColor: '#f8f9fa' }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e9ecef'; e.currentTarget.style.transform = 'translateX(5px)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f8f9fa'; e.currentTarget.style.transform = 'translateX(0)'; }}
                        >
                            {category.Category_Name}
                        </button>
                    ))}
                </Nav>
            </div>
        </div>
    );
}

export default Navbar;
