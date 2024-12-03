import React, { useState, useEffect } from 'react';
import './Card.css';
import { AiOutlineShopping } from "react-icons/ai";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import axios from 'axios';

const Card = ({ data, handleAddToCart }) => {
    const [likedItems, setLikedItems] = useState([]);
    
    useEffect(() => {
        const fetchLikedItems = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (accessToken) {
                    const response = await axios.get('https://uzummarket12.pythonanywhere.com//api/get_liked/', {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });
                    setLikedItems(response.data.data);
                }
            } catch (error) {
                console.log('Error fetching liked items');
            }
        };
        fetchLikedItems();
    }, []);

    const handleLikeToggle = async (item) => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            alert('Mahsulotni yoqtirish uchun tizimga kirishingiz kerak.')
            return;
        }

        try {
            const isLiked = likedItems.some(likedItem => likedItem.id === item.id);
            if (isLiked) {
                await axios.post('https://uzummarket12.pythonanywhere.com/api/unlike/', { id: item.id }, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setLikedItems(likedItems.filter(likedItem => likedItem.id !== item.id));
            } else {
                await axios.post('https://uzummarket12.pythonanywhere.com/api/like/', { id: item.id }, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setLikedItems([...likedItems, item]);
            }
        } catch (error) {
            console.error('Error toggling like status:', error);
        }
    };

    return (
        <div className="product-card">
            {data.map(item => (
                <div key={item.id} className="card">
                    <a href='#' className="like-icon" onClick={() => {
                        handleLikeToggle(item);
                    }}>
                        {likedItems.some(likedItem => likedItem.id === item.id)
                            ? <IoMdHeart style={{ color: '#8a2bfd' }} />
                            : <IoMdHeartEmpty />}
                    </a>

                    <div className="card-image">
                        <img
                            src={item.image}
                            alt={item.title || 'Product Image'}
                        />
                    </div>
                    <div className="card-content">
                        <h3>{item.title}</h3>
                        <p className="monthly">{item.monthly.toLocaleString()} so'm/oyiga</p>
                        <div className="product-bottom-details">
                            <div className="product-price">
                                {item.discount && <small>{item.discount.toLocaleString()} so'm</small>}
                                <br />
                                <strong>{item.cost.toLocaleString()} so'm</strong>
                            </div>
                            <div className="product-links">
                                <a href='#'
                                    onClick={() => handleAddToCart(item)}
                                >
                                    <AiOutlineShopping />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;
