import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://uzummarket12.pythonanywhere.com//login/', formData);
            console.log('Success!', response.data);

            localStorage.setItem('accessToken', response.data.tokens.access);
            localStorage.setItem('refreshToken', response.data.tokens.refresh);

            setSuccessMessage('Login Successful!');
            navigate('/'); 
        } catch (error) {
            console.log('Error during login!', error.response?.data);

            if (error.response && error.response.data) {
                const errors = Object.values(error.response.data).flat();
                setMessage(errors.join(' '));
            } else {
                setMessage('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="content-login">
                <form className="login-content" onSubmit={handleSubmit}>
                    <h1 className="title">Tizimga kirish!</h1>
                    <input
                        className="username"
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <input
                        className="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button className="login-btn" type="submit">
                        Kirish
                    </button>

                    <p className="text-2">
                       Menda akkount yo'q, <Link to="/register">Register</Link>
                    </p>
                    {message && <p className="error-text">{message}</p>}
                    {successMessage && <p className="success-text">{successMessage}</p>}
                </form>
            </div>
        </>
    );
};

export default Login;
