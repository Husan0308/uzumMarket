import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import './Carousel.css';

import carousel1 from './carousel-1.jpg';
import carousel2 from './carousel-2.jpg';
import carousel3 from './carousel-3.jpg';
import carousel4 from './carousel-4.jpg';
import carousel5 from './carousel-5.jpg';
import carousel6 from './carousel-6.jpg';
import carousel7 from './carousel-7.jpg';
import carousel8 from './carousel-8.jpg';
import carousel9 from './carousel-9.jpg';

const CustomCarousel = () => {
    return (
        <Carousel className="custom-carousel">
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={carousel1}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={carousel2}
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={carousel3}
                    alt="Third slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={carousel4}
                    alt="Third slide"
                />
            </Carousel.Item><Carousel.Item>
                <img
                    className="d-block w-100"
                    src={carousel5}
                    alt="Third slide"
                />
            </Carousel.Item><Carousel.Item>
                <img
                    className="d-block w-100"
                    src={carousel6}
                    alt="Third slide"
                />
            </Carousel.Item><Carousel.Item>
                <img
                    className="d-block w-100"
                    src={carousel7}
                    alt="Third slide"
                />
            </Carousel.Item><Carousel.Item>
                <img
                    className="d-block w-100"
                    src={carousel8}
                    alt="Third slide"
                />
            </Carousel.Item><Carousel.Item>
                <img
                    className="d-block w-100"
                    src={carousel9}
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    );
};

export default CustomCarousel;
