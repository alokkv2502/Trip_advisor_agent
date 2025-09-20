import React from 'react';
import './Hotelcard.css'; // You will need to create this CSS file
const HotelCard = ({ hotel }) => {
  return (
    <div className="card">
      <img src={hotel.photo} alt={hotel.Name} />
      <h3>{hotel.Name}</h3>
      <p>{hotel.Description}</p>
      <p>Price: {hotel.Price}</p>
      <a href={hotel.link} target="_blank" rel="noopener noreferrer">
        Book Now
      </a>
    </div>
  );
};

export default HotelCard;