import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import './Order.css';
import axios from 'axios';
import { RiDeleteBin5Fill } from "react-icons/ri";

const Order = ({ search, value }) => {
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});
    
    useEffect(() => {
        (async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    console.log("No access token found");
                }
    
                const response = await axios.get('https://uzummarket12.pythonanywhere.com/api/get_cart_items/', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                const groupedItems = groupCartItems(response.data.data);
                setCartItems(groupedItems);
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        })();
    }, []);
    

    const groupCartItems = (items) => {
        const itemMap = new Map();
        
        items.forEach(item => {
            if (itemMap.has(item.id)) {
                const existingItem = itemMap.get(item.id);
                existingItem.quantity += 1;
            } else {
                itemMap.set(item.id, { ...item, quantity: 1 });
            }
        });
        
        return Array.from(itemMap.values());
    };

    const totalQuantity = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);

    const totalAmount = useMemo(() => {
        return cartItems.reduce((total, item) => {
            const itemCost = item.cost; 
            return total + itemCost * item.quantity;
        }, 0);
    }, [cartItems]);

    const totalDiscount = useMemo(() => {
        return cartItems.reduce((total, item) => {
            const itemDiscount = item.discount;
            return total + itemDiscount * item.quantity;
        }, 0);
    }, [cartItems]);

    const incrementQuantity = (index) => {
        const newCartItems = [...cartItems];
        newCartItems[index].quantity += 1;
        setCartItems(newCartItems);
    };

    const decrementQuantity = (index) => {
        const newCartItems = [...cartItems];
        if (newCartItems[index].quantity > 1) {
            newCartItems[index].quantity -= 1;
            setCartItems(newCartItems);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            const updatedCartItems = cartItems.filter(item => item.id !== itemId);
            setCartItems(updatedCartItems); 
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.log("No access token found");
            }
            const response = await axios.delete(`https://uzummarket12.pythonanywhere.com/api/delete_cart/${itemId}/`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (response.data.status === 'success') {
                console.log('Item removed successfully!');
            } else {
                console.log("Failed to remove item from the cart!");
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleCheckboxChange = (itemId) => {
        setSelectedItems(prevSelected => ({
            ...prevSelected,
            [itemId]: !prevSelected[itemId],
        }));
    };

    return (
        <div>
            <Navbar search={search} value={value} cartCount={cartItems.length} />
            <div className="main-container">
                <div className="cart-container">
                    <h2>Sizning savatingizda, {cartItems.length} mahsulot bor.</h2>
                    <hr />
                    {cartItems.length === 0 ? (
                        <p>Sizning savatingiz bo'sh.</p>
                    ) : (
                        <div className="cart-items">
                            {cartItems.map((item, index) => (
                                <div className="cart-item" key={item.id}>
                                    <div className="item-info">
                                        <input 
                                            type="checkbox" 
                                            checked={!!selectedItems[item.id]} 
                                            onChange={() => handleCheckboxChange(item.id)} 
                                            className="item-checkbox"
                                        />
                                        <img    
                                            className="cart-img" 
                                            src={`https://uzummarket12.pythonanywhere.com${item.image}/`} 
                                            alt={item.title} 
                                        />
                                        <div>
                                            <p><strong>{item.title}</strong></p>
                                        </div>
                                    </div>
                                    <div className="quantity-control">
                                        <button onClick={() => decrementQuantity(index)}>-</button>
                                        <input type="number" value={item.quantity} readOnly />
                                        <button onClick={() => incrementQuantity(index)}>+</button>
                                    </div>
                                    <div className="item-price">
                                        <a href='#' className="delete-btn" onClick={() => removeFromCart(item.id)}> 
                                            <RiDeleteBin5Fill /> Yo'q qilish
                                        </a>
                                        <p>{item.cost.toLocaleString()} so'm</p>
                                        <p className='discount-items'><small><del>{item.discount.toLocaleString()} so'm</del></small></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="order-summary-container">
                    <h2>Sizning mahsulotlaringiz</h2>
                    <div className="item-info">
                        <p><strong>Mahsulot ({totalQuantity}):</strong>{totalAmount.toLocaleString()}</p>
                    </div>
                    <p><strong>Jami:</strong></p>
                    <p className="total-price">{totalAmount.toLocaleString()} so'm</p>
                    <p className="savings">Tejovingiz: {totalDiscount.toLocaleString()} so'm</p>
                    <button className="checkout-btn">Mahsulotni Rasmiylashtirish</button>
                </div>
            </div>
        </div>
    );
};

export default Order;
