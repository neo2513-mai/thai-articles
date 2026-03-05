import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; // 1. Import Component เข้ามา
import './App.css';

function App() {
  // ... (ส่วน state และ useEffect เหมือนเดิม) ...
  const [articles, setArticles] = useState([]);
  const [ads, setAds] = useState([]); 
  const [selectedItem, setSelectedItem] = useState(null); 
  const [modalType, setModalType] = useState(''); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ARTICLES_API = ' https://script.google.com/macros/s/AKfycbxAJ51zC5UW5v_dtX94KbzuHCn9udjFW3YBYmtszoKA-eTSsyoIaZ_iTYbCdmUPtKcE/exec';
  const ADS_API = 'https://script.google.com/macros/s/AKfycbyzzqkvObqcsyCmgrJFh-GrWn-q_Gj3qlsqzfWKfoig_9kYAl2qOqdjqvLkOHf-dIhuHg/exec'; 

 useEffect(() => {
  const fetchData = async () => {
    try {
      const [resArt, resAds] = await Promise.all([
        fetch(ARTICLES_API),
        fetch(ADS_API)
      ]);
      
      const dataArt = await resArt.json();
      const dataAds = await resAds.json();
      console.log("Articles Data:", dataArt);
      console.log("Ads Data:", dataAds);

      const safeArticles = Array.isArray(dataArt) ? dataArt : (dataArt.data && Array.isArray(dataArt.data) ? dataArt.data : []);
      const safeAds = Array.isArray(dataAds) ? dataAds : (dataAds.data && Array.isArray(dataAds.data) ? dataAds.data : []);

      setArticles(safeArticles);
      setAds(safeAds);
    } catch (err) {
      console.error("Fetch Error:", err);
      setArticles([]); 
      setAds([]);
    }
  };
  fetchData();
}, []);

  const openModal = (item, type) => {
    setSelectedItem(item);
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    // 2. ครอบทับ container หลักด้วย div เพื่อจัดโครงสร้าง
    <div className="main-wrapper"> 
      
      <Navbar /> {/* 3. วาง Navbar ไว้บนสุด */}

      <div className="container">
        {Array.isArray(articles) && articles.length > 0 ? (
          articles.map((item, index) => {
            if (index % 2 === 0) {
              const firstArticle = articles[index];
              const secondArticle = articles[index + 1];
              const leftAd = ads[index] || ads[0]; 
              const rightAd = ads[index + 1] || ads[1];

              return (
                <div className="row" key={index}>
                  {/* คอลัมน์ 1: โฆษณา */}
                  <div 
                    className="col ads-card" 
                    onClick={() => window.open('https://script.google.com/macros/s/AKfycbwQhrRgbFwwzEmkqrFMrP0GgMAEE35gmPGV1gaKkwhhb3ny-W9Fac_16aCAlY7RRvyx7A/exec', '_blank')} 
                    style={{ cursor: 'pointer' }}
                  >
                    {leftAd && (
                      <>
                        <img src={leftAd.Image} alt="Ad"/>
                        <p>{leftAd.name}</p>
                        <span className="price-tag">฿{leftAd.price}</span>
                        <h5 style={{ color: 'violet' }}>สัมผัส/คลิกรูป เข้าชมเว็บไซต์ของเรา</h5>
                      </>
                    )}
                  </div>

                  {/* คอลัมน์ 2: บทความ 1 */}
                  <div className=" col-large article-card">
                    <img src={firstArticle.image} alt={firstArticle.name} />
                    <h3>{firstArticle.name}</h3>
                    <button onClick={() => openModal(firstArticle, 'article')}>อ่านบทความ</button>
                  </div>

                  {/* คอลัมน์ 3: บทความ 2 */}
                  <div className="col-large article-card">
                    {secondArticle ? (
                      <>
                        <img src={secondArticle.image} alt={secondArticle.name} />
                        <h3>{secondArticle.name}</h3>
                        <button onClick={() => openModal(secondArticle, 'article')}>อ่านบทความ</button>
                      </>
                    ) : <div className="empty-col"></div>}
                  </div>

                  {/* คอลัมน์ 4: โฆษณา */}
                  <div 
                    className="col ads-card" 
                    onClick={() => window.open('https://script.google.com/macros/s/AKfycbwQhrRgbFwwzEmkqrFMrP0GgMAEE35gmPGV1gaKkwhhb3ny-W9Fac_16aCAlY7RRvyx7A/exec', '_blank')} 
                    style={{ cursor: 'pointer' }}
                  >
                    {rightAd && (
                      <>
                        <img src={rightAd.Image} alt="Ad" />
                        <p>{rightAd.name}</p>
                        <span className="price-tag">฿{rightAd.price}</span>
                        <h5 style={{ color: 'violet' }}>สัมผัส/คลิกรูป เข้าชมเว็บไซต์ของเรา</h5>
                      </>
                    )}
                  </div>
                </div>
              );
            }
            return null;
          })
        ) : (
          <div className="loading-state"><p>กำลังโหลดข้อมูล...</p></div>
        )}

        {/* Modal Section */}
        {isModalOpen && selectedItem && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <span className="close-btn" onClick={closeModal}>&times;</span>
              <div className="modal-body">
                {modalType === 'article' ? (
                  <div className="article-detail">
                    <img src={selectedItem.image} className="mini-thumb" alt="thumb" />
                    <h2>{selectedItem.name}</h2>
                    <hr />
                    <p>{selectedItem.detail}</p>
                  </div>
                ) : (
                  <div className="product-detail">
                    <img src={selectedItem.Image} className="full-img" alt="product" />
                    <h2>{selectedItem.name} &nbsp;&nbsp;&nbsp; <span className="price">ราคา: ฿{selectedItem.price}</span></h2>
                    <p className="description">{selectedItem.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;