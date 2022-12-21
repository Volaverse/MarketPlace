import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import banner_img1 from '../assets/banner1.jpeg';
import banner_img2 from '../assets/wearables/8.png';
import banner_img3 from '../assets/banner2.jpeg';
import banner_img4 from '../assets/collectibles/4.png';
import ProductCard from '../components/ProductCard/ProductCard';
import './Carousel.css';
// import banner_img5 from '../assets/banner3.jpeg';


function ControlledCarousel() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={banner_img3}
            alt="First slide"
          />
          <div>
          <h2 className="Carusel-heading">Land</h2>
          </div >
          <p className="Carusel-description">Buy a piece of a land nft and start spreading the knowledge in volaverse</p>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={banner_img3}
            alt="Second slide"
          />
          <h2 className="Carusel-heading">Land</h2>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={banner_img3}
            alt="Third slide"
          />
          <h2 className="Carusel-heading">Land</h2>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={banner_img3}
            alt="Fourth slide"
          />
          <h2 className="Carusel-heading">Land</h2>
        </Carousel.Item>
        {/* <Carousel.Item>
          <img
            className="d-block w-100"
            src={banner_img5}
            alt="Fifth slide"
          />
        </Carousel.Item> */}
      </Carousel>
    );
  }

  export default ControlledCarousel;
  
