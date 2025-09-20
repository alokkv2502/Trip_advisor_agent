import React from 'react';

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="card">
      <img src={restaurant.photo} alt={restaurant.Name} />
      <h3>{restaurant.Name}</h3>
      <p>{restaurant.Description}</p>
      <p>Price: {restaurant.Price}</p>
      <a href={restaurant.link} target="_blank" rel="noopener noreferrer">
        View Details
      </a>
    </div>
  );
};

export default RestaurantCard;