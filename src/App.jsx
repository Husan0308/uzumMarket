import './App.css';
// import { useState, useEffect } from 'react';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import Order from './Order/Order';
import Like from './Like/Like';
import { Route, Routes } from 'react-router-dom';
import Register from './Api/Register';
import Login from './Api/Login';

function App() {

    const scrollTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    return (
        <div className="container">
            <Routes>
                <Route 
                    path='/order' 
                    element={<Order/>} 
                />
                <Route 
                    path='/' 
                    element={<Main/>} 
                />
                <Route 
                    path='/like' 
                    element={<Like/>} 
                />
                <Route 
                    path='/register' 
                    element={<Register/>} 
                />
                <Route 
                    path='/login' 
                    element={<Login/>} 
                />
            </Routes>
            <hr/>
            <Footer />
            <div className="circle" onClick={scrollTop}>&#8743;</div>
        </div>
    );
}

export default App;
