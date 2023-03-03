import React from "react";
import "./Carousel.scss";
import Slider from "react-slick";
import { useCallback } from "react";

const Carousel = (props) => {
    const sliderSettings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        // autoplay: true,
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
                        <div className={`info-container ${props.fullReview && 'full'}`}>
                            <div className="text-container">
                                <span onClick={previous}>
                                    <img src="/images/icons/arrow_left.svg" />
                                </span>
                                <div className="carousel-text">
                                    {card.name && <div className="name">{card.name}</div>}
                                    {card.rating &&
                                        <div className="stars-wrapper">
                                            <div className="stars-container">
                                                {Array(5).fill(1).map((el, i) =>
                                                    <img key={i} src={i >= card.rating ? "/images/star_empty.svg" : "/images/star_full.svg"} />
                                                )}
                                            </div>
                                        </div>}

                                    <div className={`text ${!props.fullReview && 'italic'}`}>{card.text} </div>
                                </div>
                                <span onClick={next}>
                                    <img src="/images/icons/arrow_right.svg" />
                                </span>
                            </div>
                        </div>
                        {!props.fullReview && <span className="all-reviews">Vezi toate recenziile</span>}

                    </div>
                ))}
            </Slider>
        </div>
    );

};
export default Carousel;
