import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://uzummarket12.pythonanywhere.com/register/', formData);
            console.log("Success!", response.data)
            navigate('/login')
        } catch (error) {
            console.log("Error during registration!", error.response?.data)
            if(error.response && error.response.data){
                Object.keys(error.response.data).forEach(field => {
                    const errorMessages = error.response.data[field];
                    if(errorMessages && errorMessages.length > 0){
                        setError(errorMessages[0])
                    }
                })
            }
        }
    };

    return (
    <>
        <Navbar/>
        <div className='register'>
            <form className='register-content' onSubmit={handleSubmit}>
                {error && <p style={{color:"red"}}>{error}</p>}
                <h1 className='title'>Register!</h1>
                <input 
                    className='username'
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <input
                    className='password'
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <input
                    className='email'
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <button className='register-btn' type="submit" onClick={handleSubmit}>Register</button>

                <p className='text-2'>Menda akkount bor, <Link to='/login'>Kirish</Link></p>
            </form>
            {message && <p className='text'>{message}</p>}
        </div>
    </>
    );
};

export default Register;
