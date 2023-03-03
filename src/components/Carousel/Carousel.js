import React from "react";
import "./Carousel.scss";
import Slider from "react-slick";
import { useCallback } from "react";

const Carousel = (props) => {
    const sliderSettings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        draggable: true,
        speed: 800,
        arrows: false,
    };

    const slider = React.useRef(null);

    const next = useCallback(() => {
        slider.current.slickNext();
    }, []);

    const previous = useCallback(() => {
        slider.current.slickPrev();
    }, [])

    return (
        <div
            className="carousel-container"
        >
            <Slider {...sliderSettings} ref={(c) => (slider.current = c)}>
                {props.content.map((card, index) => (
                    <div key={index}>
                        <div className="info-container">
                            <div className="text-container">
                                <span onClick={previous}>
                                    <img src="/images/icons/arrow_left.svg" />
                                </span>
                                <div className="carousel-text">{card.text}</div>
                                <span onClick={next}>
                                <img src="/images/icons/arrow_right.svg" />
                                </span>
                            </div>
                        </div>
                        <span className="all-reviews">Vezi toate recenziile</span>

                    </div>
                ))}
            </Slider>
        </div>
    );

};
export default Carousel;
