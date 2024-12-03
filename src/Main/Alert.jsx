import React from 'react';
import './Alert.css';
import { Link } from 'react-router-dom';

export default function Alert({ onClose, data, totalQuantity }) {
    const isAuthenticated = localStorage.getItem('accessToken'); 

    console.log(data)
    return (
        <div className="alert-message" role="alert" aria-live="assertive">
            <button
                className="close-btn"
                aria-label="Close alert"
                onClick={onClose}
            >
                ×
            </button>
                <div className="content-wrapper">
                    <img
                        className="ordered-item-pic"
                        src={ data.img ? data.img : `https://uzummarket12.pythonanywhere.com${data.img}`}
                        alt={data?.name || 'Product'}
                    />
                    <div className="text-content">
                        <strong className="order-title">Mahsulot savatga qo`shildi</strong>
                        <p>{data?.name} ({totalQuantity})x</p>
                    </div>
                    <Link to="/order" className="action-link">SAVATGA O'TISH</Link>
                </div>
        </div>
    );
}
