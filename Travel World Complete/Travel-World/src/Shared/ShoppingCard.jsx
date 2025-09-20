import React from 'react';

const ShoppingCard = ({ shopping }) => {
  return (
    <div className="card-container">
      <img src={shopping.photo} alt={shopping.Name} />
      <h3>{shopping.Name}</h3>
      <p>{shopping.Description}</p>
      <p>Price: {shopping.Price}</p>
      <a href={shopping.link} target="_blank" rel="noopener noreferrer">
        View Details
      </a>
    </div>
  );
};

export default ShoppingCard;