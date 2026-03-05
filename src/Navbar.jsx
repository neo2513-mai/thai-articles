import React from 'react';
import './Navbar.css'; // อย่าลืมสร้างไฟล์ CSS นี้ด้วย

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <a href="/">📖 เว็บอ่านบทความฟรี</a>
      </div>
      <ul className="nav-links">
        <li><a href="/">หน้าแรก</a></li>
        <li>
           <a href="https://script.google.com/macros/s/AKfycbw7oXXLgrP7i-9SBaiz6ZV9kaPi9LYl6H3zIIiRF5ECohXOB4Kij10Bmr1qRFFrpiR_dw/exec?page=popular" 
                 target="_blank" 
                rel="noopener noreferrer">
               ยอดนิยม
            </a>
        </li>
              <li>
               <a href="/contact.html" target="_blank" rel="noopener noreferrer">
               ติดต่อเรา
           </a>
        </li>
      </ul>
      <div className="nav-cta">
        <a href="https://script.google.com/macros/s/AKfycbwQhrRgbFwwzEmkqrFMrP0GgMAEE35gmPGV1gaKkwhhb3ny-W9Fac_16aCAlY7RRvyx7A/exec" target="_blank" rel="noopener noreferrer" className="ads-button">
          🔥 สนใจ ช้อปสินค้า ของเรา
        </a>
      </div>
    </nav>
  );
};

export default Navbar;