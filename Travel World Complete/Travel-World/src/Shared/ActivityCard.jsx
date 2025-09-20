import React from 'react';

const ActivityCard = ({ activity }) => {
  return (
    <div className="card-container">
      <img src={activity.photo} alt={activity.Name} />
      <h3>{activity.Name}</h3>
      <p>{activity.Description}</p>
      <p>Price: {activity.Price}</p>
      <a href={activity.link} target="_blank" rel="noopener noreferrer">
        View Details
      </a>
    </div>
  );
};

export default ActivityCard;