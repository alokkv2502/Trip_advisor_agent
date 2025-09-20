import React from "react";
import Slider from "react-slick";
import ava01 from "../../assets/images/ava-1.jpg";
import ava02 from "../../assets/images/ava-2.jpg";
import ava03 from "../../assets/images/ava-3.jpg";
import ava04 from "../../assets/images/ava-4.jpg";
import ava05 from "../../assets/images/ava-5.jpg";

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slideToScroll: 1,
          dots: true,
          infinite: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slideToScroll: 2,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className="testimonials py-4 px-3">
        <p>
          Traveling with this company was an absolute delight! Every detail was
          meticulously planned, and I felt truly cared for throughout the
          journey. Highly recommend!
          Thank alot !
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava01} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">John Doe</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>
      <div className="testimonials py-4 px-3">
        <p>
          Their expertise and dedication made our trip unforgettable. From
          breathtaking destinations to seamless logistics, every aspect exceeded
          our expectations. We'll definitely travel with them again!
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava02} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Lia Frank</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>
      <div className="testimonials py-4 px-3">
        <p>
          Amazing service and attention to detail! Our itinerary was perfectly
          tailored to our preferences, and we experienced some of the best
          moments of our lives. Thank you!
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava03} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Eric Hawking</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>
      <div className="testimonials py-4 px-3">
        <p>
          Professional, friendly, and extremely knowledgeable. They took the
          stress out of travel planning, allowing us to fully enjoy our
          vacation. We couldn't be happier with the experience!.
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava05} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Albert </h6>
            <p>Customer</p>
          </div>
        </div>
      </div>
      <div className="testimonials py-4 px-3">
        <p>
          Exceptional travel experience! Their team went above and beyond to
          ensure we had a fantastic trip. From unique experiences to top-notch
          accommodations, everything was perfect!
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava04} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Sara</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Testimonials;
