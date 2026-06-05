import React, { useEffect, useState } from 'react';
import { getCategories } from '../api/configApi';

const Navbar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data))
      .catch(console.error);
  }, []);

  const handleScroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className='sticky-top pt-2'>
      <div className='bg-white rounded-4 shadow-sm p-3 border border-light'>
        <h5 className='fw-bold mb-3 text-dark px-2'>Thực đơn</h5>
        <div className='d-flex flex-column gap-2'>
          {categories.map((category) => (
            <button
              key={category.id}
              className='btn btn-light w-100 text-start fw-bold rounded-3 py-2 px-3 border-0 text-dark'
              onClick={() => handleScroll(category.id)}
            >
              {category.Category_Name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
