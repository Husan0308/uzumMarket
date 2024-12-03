import './Main.css';
import Card from '../Card/Card';
import { useEffect, useMemo, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Filter from '../Filter/Filter';
import notImg from '../Images/notfound.png';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Alert from './Alert';
import CustomCarousel from '../Carousel/Carousel';

export default function Main() {
    const [productData, setProductData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [currentType, setCurrentType] = useState('Hammasi');
    const [visible, setVisible] = useState(10);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantities, setQuantities] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [alertData, setAlertData] = useState({ name: '', image: '' });
    const [newTotalQuantity, setNewTotalQuantity] = useState(0);

    const handleAddToCart = async (item) => {
        setQuantities(prevQuantities => {
            const currentQuantity = prevQuantities[item.id] || 0;
            return { ...prevQuantities, [item.id]: currentQuantity + 1 };
        });

        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                alert('Savatga qo`shish uchun tizimga kiring!');
                return;
            }
            await axios.post(
                'https://uzummarket12.pythonanywhere.com/api/add_cart/',
                { id: item.id },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );

            const updatedQuantity = (quantities[item.id] || 0) + 1; 
            setNewTotalQuantity(updatedQuantity); 


            // setNewTotalQuantity((quantities[item.id] || 0) + 1);

            setAlertData({
                message: 'Maxsulot savatga qo`shildi!',
                name: item.title,
                img: item.image
            });
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        } catch (error) {
            console.error('Error adding item to cart:', error);
            setAlertData({
                message: 'Xatolik yuz berdi. Iltimos, qayta urinib ko`ring.',
                name: '',
                img: ''
            });
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const productResponse = await axios.get('https://uzummarket12.pythonanywhere.com/api/products/');
                setProductData(productResponse.data);
                setFilteredData(productResponse.data);
            } catch (err) {
                console.error('Failed to fetch products:', err);
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    console.log("No access token found");
                    return;  
                }
    
                const cartResponse = await axios.get('https://uzummarket12.pythonanywhere.com/api/get_cart_items/', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                const cartQuantities = cartResponse.data.data.reduce((acc, item) => ({
                    ...acc,
                    [item.id]: item.quantity || 1, 
                }), {});
                setQuantities(cartQuantities);
            } catch (err) {
                console.error('Failed to fetch cart items:', err);
                setError('Failed to load cart data');
            }
        };
    
        fetchCartItems();
    }, [])

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    };

    useEffect(() => {
        const lowerCaseSearchValue = searchValue.toLowerCase();
        const filtered = productData.filter((item) => {
            const matchesSearchText = item.title?.toLowerCase().startsWith(lowerCaseSearchValue);
            const matchesType = currentType === 'Hammasi' || item.type === currentType;
            return matchesSearchText && matchesType;
        });
        setFilteredData(filtered);
        setVisible(10);
    }, [searchValue, currentType, productData]);

    const handleFilterChange = (selectedType) => {
        setCurrentType(selectedType);
    };

    const totalQuantity = useMemo(() => {
        return Object.keys(quantities).length
    }, [quantities]);

    if (loading) {
        return (
            <div className="spinner-container">
                <Spinner animation="border" role="status" className="spinner">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <main>
            <div className="container">
                {showAlert && (
                    <Alert
                        message={alertData.message}
                        onClose={() => setShowAlert(false)}
                        data={alertData}
                        totalQuantity={newTotalQuantity}
                    />
                )}
                <Navbar search={handleSearch} value={searchValue} cartCount={totalQuantity} />
                <Filter setType={handleFilterChange} />
                {searchValue === '' && currentType === 'Hammasi' && <CustomCarousel />}
                <h3>Mashhur &#10095;</h3>

                {filteredData.length > 0 ? (
                    <div className="main-content">
                        <Card data={filteredData.slice(0, visible)} handleAddToCart={handleAddToCart} />
                        {visible < filteredData.length && (
                            <button className="show-more" onClick={() => setVisible(visible + 10)}>
                                Ko`proq ko`rish
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="not-found-container">
                        <img className="not-found" src={notImg} alt="404" />
                        <p>Maxsulot topilmadi yoki mavjud bo`lmasligi mumkin.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
