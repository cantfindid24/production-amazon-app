import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import bannerimgs from '../image-folder/banner/bannerImgsdata';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
};

export default function Banner() {
  return (
    <div className="slider">
      <Slider {...settings}>
        {bannerimgs.map((item) => (
          <div key={item.src} className="slider-img-container">
            <img src={item.src} alt={item.alt} className="slider-img" />
          </div>
        ))}
      </Slider>
    </div>
  );
}
