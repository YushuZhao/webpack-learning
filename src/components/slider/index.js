import React, { useEffect, useState } from 'react';
import { SliderContainer } from './style';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';

// import Swiper from 'swiper';
// import 'swiper/swiper.scss';
// import 'swiper/components/pagination/pagination.scss';

function Slider(props) {
    const [sliderSwiper, setSliderSwiper] = useState(null);
    const { bannerList } = props;

    useEffect(() => {
        if (bannerList.length && !sliderSwiper) {
            let newSliderSwiper = new Swiper(".slider-container", {
                loop: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
            });
            setSliderSwiper(newSliderSwiper);
        }
    }, [bannerList.length, sliderSwiper]);

    return (
        <SliderContainer>
            <div className="slider-container">
                <div className="swiper-wrapper">
                    {
                        bannerList.map((slider, index) => {
                            return (
                                <div className="swiper-slide" key={slider.imageUrl + index}>
                                    <div className="slider-nav">
                                        <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="swiper-pagination"></div>
            </div>
        </SliderContainer>
    );
}

export default React.memo(Slider);