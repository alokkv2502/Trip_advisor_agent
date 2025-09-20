import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
// import "./Hotelcard.css"; // You will need to create this CSS file

const HotelCard = ({ hotel }) => {
  const { _id, name, city, photo, price } = hotel;

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="hotel__card">
      <Card>
        <div className="hotel__img">
          <Link to={`/hotels/${_id}`}>
            <div onClick={handleScrollToTop}>
              <img src={photo} alt="hotel" />
            </div>
          </Link>
        </div>
        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="hotel__location d-flex align-items-center gap-1">
              <i className="ri-map-pin-line">{city}</i>
            </span>
            <span className="hotel__rating d-flex align-items-center gap-1">
              {/* Hardcoded rating for a cleaner example. You can replace this with dynamic data. */}
              <i className="ri-star-fill"></i>
              4.5
              <span>(50)</span>
            </span>
          </div>

          <h5 className="hotel__title">
            <Link to={`/hotels/${_id}`}>
              <div onClick={handleScrollToTop}>{name}</div>
            </Link>
          </h5>
          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              ${price}
              <span>/Night</span>
            </h5>
            <button className="btn booking__btn">
              <Link to={`/hotels/${_id}`}>
                <div onClick={handleScrollToTop}>Book Now</div>
              </Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default HotelCard;