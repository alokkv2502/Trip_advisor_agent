import React, { useState, useEffect } from 'react';

// Enhanced CSS with modern card designs
const travelGuideCss = `
.travel-guide-container {
    padding: 2rem;
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #1a202c;
    min-height: 100vh;
}

.travel-guide-container h1 {
    text-align: center;
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: white;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.travel-guide-container h2 {
    font-size: 2.2rem;
    font-weight: 600;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    color: white;
    text-align: center;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

.hotels-container,
.restaurants-container,
.activities-container,
.shopping-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, 350px);
    gap: 2rem;
    justify-content: center;
    margin-bottom: 3rem;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
}

/* Modern Hotel Card Design - Fixed Width */
.hotel-card {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 350px;
    min-height: 500px;
}

.hotel-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ffd700, #ff6b6b, #4ecdc4);
}

.hotel-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 60px rgba(0,0,0,0.4);
}

.hotel-card .image-container {
    position: relative;
    height: 220px;
    overflow: hidden;
}

.hotel-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.hotel-card:hover img {
    transform: scale(1.1);
}

.hotel-card .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.7));
}

.hotel-card .content {
    padding: 25px;
    color: white;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.hotel-card h3 {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 10px;
    background: linear-gradient(45deg, #ffd700, #fff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.hotel-card .description {
    opacity: 0.9;
    margin-bottom: 15px;
    line-height: 1.5;
}

.hotel-card .details {
    margin-bottom: 20px;
}

.hotel-card .detail-item {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
}

.hotel-card .detail-item .icon {
    margin-right: 8px;
    opacity: 0.8;
}

.hotel-card .amenities {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
}

.hotel-card .amenity-tag {
    background: rgba(255,255,255,0.2);
    padding: 5px 12px;
    border-radius: 15px;
    font-size: 0.85rem;
    backdrop-filter: blur(10px);
}

.hotel-card .book-btn {
    padding: 15px;
    background: linear-gradient(45deg, #ff6b6b, #ffd700);
    border: none;
    border-radius: 10px;
    color: white;
    font-weight: bold;
    font-size: 1.1rem;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: auto;
}

.hotel-card .book-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(255,107,107,0.3);
}

/* Restaurant Card - Glassmorphism Design - Fixed Width */
.restaurant-card {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 25px;
    overflow: hidden;
    box-shadow: 0 25px 45px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    width: 350px;
    min-height: 480px;
}

.restaurant-card:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.25);
}

.restaurant-card .image-container {
    height: 200px;
    margin: 20px;
    border-radius: 15px;
    overflow: hidden;
}

.restaurant-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.restaurant-card .content {
    padding: 0 25px 25px;
    color: white;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.restaurant-card h3 {
    font-size: 1.7rem;
    font-weight: 700;
    margin-bottom: 12px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.restaurant-card p {
    margin-bottom: 15px;
    line-height: 1.5;
    opacity: 0.9;
}

.restaurant-card .view-btn {
    padding: 15px;
    background: rgba(255,255,255,0.2);
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 15px;
    color: white;
    font-weight: bold;
    text-decoration: none;
    text-align: center;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    margin-top: auto;
}

.restaurant-card .view-btn:hover {
    background: rgba(255,255,255,0.3);
    border-color: rgba(255,255,255,0.5);
}

/* Shopping Card - Clean Modern Design - Fixed Width */
.shopping-card {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    width: 350px;
    min-height: 460px;
}

.shopping-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px rgba(0,0,0,0.15);
}

.shopping-card .image-container {
    position: relative;
    height: 200px;
    overflow: hidden;
}

.shopping-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.shopping-card:hover img {
    transform: scale(1.05);
}

.shopping-card .content {
    padding: 25px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.shopping-card h3 {
    font-size: 1.6rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 8px;
}

.shopping-card p {
    color: #7f8c8d;
    margin-bottom: 15px;
    line-height: 1.5;
}

.shopping-card .view-btn {
    padding: 15px;
    background: linear-gradient(45deg, #3498db, #2980b9);
    border: none;
    border-radius: 10px;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    text-decoration: none;
    text-align: center;
    transition: all 0.3s ease;
    margin-top: auto;
}

.shopping-card .view-btn:hover {
    background: linear-gradient(45deg, #2980b9, #1abc9c);
    transform: translateY(-2px);
}

/* Activity Card - Dark Theme - Fixed Width */
.activity-card {
    background: linear-gradient(145deg, #1e1e1e, #2d2d2d);
    border: 1px solid #444;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    width: 350px;
    min-height: 470px;
}

.activity-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 60px rgba(0,0,0,0.6);
    border-color: #ffd700;
}

.activity-card .image-container {
    height: 200px;
    overflow: hidden;
}

.activity-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.9);
}

.activity-card .content {
    padding: 25px;
    color: white;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.activity-card h3 {
    font-size: 1.8rem;
    font-weight: 700;
    color: #ffd700;
    margin-bottom: 12px;
}

.activity-card p {
    margin-bottom: 15px;
    line-height: 1.5;
    opacity: 0.9;
}

.activity-card .view-btn {
    padding: 15px;
    background: linear-gradient(45deg, #ffd700, #ffed4e);
    border: none;
    border-radius: 10px;
    color: black;
    font-weight: bold;
    font-size: 1.1rem;
    text-decoration: none;
    text-align: center;
    transition: all 0.3s ease;
    margin-top: auto;
}

.activity-card .view-btn:hover {
    background: linear-gradient(45deg, #ffed4e, #ffd700);
    transform: scale(1.02);
}

.search-bar-container {
    width: 100%;
    max-width: 1200px;
    margin: 2rem auto;
    padding: 1.5rem 2.5rem;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50px;
    box-shadow: 0 25px 45px rgba(0,0,0,0.1);
}

.search-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
}

.search-input-group {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    padding-right: 1.5rem;
}

.search-input-group:last-of-type {
    border-right: none;
    padding-right: 0;
}

.search-input-group label {
    font-size: 0.9rem;
    color: white;
    font-weight: 500;
}

.search-input-group input,
.search-input-group select {
    width: 100%;
    border: none;
    outline: none;
    font-size: 1rem;
    color: white;
    padding: 0.5rem;
    background: rgba(255,255,255,0.1);
    border-radius: 8px;
    backdrop-filter: blur(10px);
}

.search-input-group input::placeholder {
    color: rgba(255,255,255,0.7);
}

.date-input-group .search-input {
    flex-direction: column;
}

.date-input-group .date-inputs {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.date-input-group .date-inputs input {
    flex: 1;
}

.search-button {
    background: linear-gradient(45deg, #ff6b6b, #ffd700);
    border: none;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
    flex-shrink: 0;
}

.search-button:hover {
    transform: scale(1.1);
    box-shadow: 0 10px 20px rgba(255,107,107,0.3);
}

.search-button svg {
    font-size: 1.5rem;
    color: white;
}

.message-container {
    text-align: center;
    margin: 2rem auto;
    padding: 1.5rem;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    font-weight: 600;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    max-width: 600px;
}

.loading-message {
    font-size: 1.4rem;
    font-weight: 600;
    color: white;
    text-align: center;
    margin-top: 2rem;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.plan-header {
    text-align: center;
    margin: 3rem 0 2rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
}

.plan-header h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #ffd700, #fff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.plan-header p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 1rem;
    opacity: 0.9;
}

.cost-highlight {
    font-size: 1.3rem;
    font-weight: bold;
    color: #ffd700;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

@media (max-width: 768px) {
    .hotels-container, 
    .restaurants-container, 
    .activities-container, 
    .shopping-container {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .search-bar-container {
        padding: 1rem;
        border-radius: 20px;
    }
    
    .search-form {
        flex-direction: column;
        gap: 1rem;
    }
    
    .search-input-group {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        padding-right: 0;
        padding-bottom: 1rem;
    }
    
    .search-input-group:last-of-type {
        border-bottom: none;
        padding-bottom: 0;
    }
    
    .search-button {
        width: 100%;
        border-radius: 15px;
        height: 50px;
    }
    
    .travel-guide-container h1 {
        font-size: 2rem;
    }
    
    .travel-guide-container h2 {
        font-size: 1.8rem;
    }
}
`;

// Enhanced Card Components
const HotelCard = ({ hotel }) => (
    <div className="hotel-card">
        <div className="image-container">
            <img 
                src={hotel.photo || 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWx8ZW58MHx8MHx8fDA%3D'} 
                alt={hotel.name} 
            />
            <div className="overlay"></div>
        </div>
        <div className="content">
            <h3>{hotel.name}</h3>
            <p className="description">Experience luxury and comfort with world-class amenities and exceptional service.</p>
            
            <div className="details">
                {hotel.location?.address && (
                    <div className="detail-item">
                        <span className="icon">📍</span>
                        <span>{hotel.location.address}</span>
                    </div>
                )}
                {hotel.rating && (
                    <div className="detail-item">
                        <span className="icon">⭐</span>
                        <span>{hotel.rating}/5 Rating</span>
                    </div>
                )}
                {hotel.price_per_night && (
                    <div className="detail-item">
                        <span className="icon">💰</span>
                        <span>${hotel.price_per_night} per night</span>
                    </div>
                )}
            </div>
            
            {hotel.amenities && hotel.amenities.length > 0 && (
                <div className="amenities">
                    {hotel.amenities.map((amenity, index) => (
                        <span key={index} className="amenity-tag">{amenity}</span>
                    ))}
                </div>
            )}
            
            <a href={hotel.link} target="_blank" rel="noopener noreferrer" className="book-btn">
                Add to Itenrary
            </a>
        </div>
    </div>
);

const RestaurantCard = ({ restaurant }) => (
    <div className="restaurant-card">
        <div className="image-container">
            <img 
                src={restaurant.photo || 'https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D'} 
                alt={restaurant.name} 
            />
        </div>
        <div className="content">
            <h3>{restaurant.name}</h3>
            <p>{restaurant.description || 'Discover amazing flavors and culinary experiences at this exceptional dining destination.'}</p>
            <p><strong>Price:</strong> {restaurant.price}</p>
            <a href={restaurant.link} target="_blank" rel="noopener noreferrer" className="view-btn">
                View Details
            </a>
        </div>
    </div>
);

const ActivityCard = ({ activity }) => (
    <div className="activity-card">
        <div className="image-container">
            <img 
                src={activity.photo || 'https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=600&auto=format&fit=crop&q=60'} 
                alt={activity.name} 
            />
        </div>
        <div className="content">
            <h3>{activity.name}</h3>
            <p>{activity.description || 'Enjoy unforgettable experiences and create lasting memories with this exciting activity.'}</p>
            <p><strong>Price:</strong> {activity.price}</p>
            <a href={activity.link} target="_blank" rel="noopener noreferrer" className="view-btn">
                Learn More
            </a>
        </div>
    </div>
);

const ShoppingCard = ({ shopping }) => (
    <div className="shopping-card">
        <div className="image-container">
            <img 
                src={shopping.photo || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=60'} 
                alt={shopping.name} 
            />
        </div>
        <div className="content">
            <h3>{shopping.name}</h3>
            <p>{shopping.description || 'Discover unique shopping experiences and find the perfect items for your trip.'}</p>
            <p><strong>Price Range:</strong> {shopping.price}</p>
            <a href={shopping.link} target="_blank" rel="noopener noreferrer" className="view-btn">
                Explore
            </a>
        </div>
    </div>
);

// Message component
const Message = ({ text }) => {
    if (!text) return null;
    return (
        <div className="message-container">
            <p>{text}</p>
        </div>
    );
};

// Main Travel Guide Component
const TravelGuide = () => {
    const [travelData, setTravelData] = useState(null);
    const [location, setLocation] = useState('');
    const [goingDate, setGoingDate] = useState('');
    const [returningDate, setReturningDate] = useState('');
    const [people, setPeople] = useState('');
    const [travelMode, setTravelMode] = useState('flight');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [planid, setPlanid] = useState(0);
    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.innerText = travelGuideCss;
        document.head.appendChild(styleSheet);
        
        return () => {
            document.head.removeChild(styleSheet);
        };
    }, []);

    const searchHandler = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!location.trim()) {
            setMessage('Please enter a location to search.');
            return;
        }

        setIsLoading(true);

        const apiUrl = 'http://127.0.0.1:7100/api/process';

        const searchQuery = `
            Location: ${location}, 
            Going Date: ${goingDate}, 
            Returning Date: ${returningDate}, 
            Number of People: ${people}, 
            Travel Mode: ${travelMode}
        `;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                    'accept': 'application/json'
                },
                body: searchQuery
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            setTravelData(data.result);
            setMessage('Travel plan generated successfully!');

        } catch (error) {
            console.error('Error fetching data:', error);
            setMessage('Failed to get a response from the API. Please check your server status.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="travel-guide-container">
            {/* Enhanced Search Bar */}
            <div className="search-bar-container">
                <form className="search-form" onSubmit={searchHandler}>
                    <div className="search-input-group">
                        <span className="search-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                                <circle cx="12" cy="10" r="3"/>
                            </svg>
                        </span>
                        <div className="search-input">
                            <label>Location</label>
                            <input
                                type="text"
                                placeholder="Where are you going?"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="search-input-group date-input-group">
                        <span className="search-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                                <line x1="16" x2="16" y1="2" y2="6"/>
                                <line x1="8" x2="8" y1="2" y2="6"/>
                                <line x1="3" x2="21" y1="10" y2="10"/>
                            </svg>
                        </span>
                        <div className="search-input">
                            <label>From - To</label>
                            <div className="date-inputs">
                                <input
                                    type="date"
                                    value={goingDate}
                                    onChange={(e) => setGoingDate(e.target.value)}
                                />
                                <span>-</span>
                                <input
                                    type="date"
                                    value={returningDate}
                                    onChange={(e) => setReturningDate(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="search-input-group">
                        <span className="search-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                        </span>
                        <div className="search-input">
                            <label>Number of People</label>
                            <input
                                type="number"
                                placeholder="0"
                                min="1"
                                value={people}
                                onChange={(e) => setPeople(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="search-input-group">
                        <span className="search-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L14 6L4 6c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h2"/>
                                <circle cx="7" cy="17" r="2"/>
                                <path d="M9 17h6"/>
                                <circle cx="17" cy="17" r="2"/>
                            </svg>
                        </span>
                        <div className="search-input">
                            <label>Travel Mode</label>
                            <select
                                value={travelMode}
                                onChange={(e) => setTravelMode(e.target.value)}
                            >
                                <option value="flight">Flight</option>
                                <option value="train">Train</option>
                                <option value="car">Car</option>
                                <option value="bus">Bus</option>
                            </select>
                        </div>
                    </div>
                    <button className="search-button" type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="m21 21-4.3-4.3"/>
                        </svg>
                    </button>
                </form>
            </div>

            <h1>Travel Guide: {location || 'Search a Location'}</h1>
            <Message text={message} />
            {isLoading && <div className="loading-message">✨ Generating your personalized travel plan...</div>}

            {travelData && travelData.trip_plans && travelData.trip_plans.length > 0 && travelData.trip_plans.map((plan, index) => (
                <div key={index}>
                    <div className="plan-header">
                        <h2>{plan.plan_name}</h2>
                        <p>{plan.description}</p>
                        <div className="cost-highlight">
                            Total Estimated Cost: ${plan.total_estimated_cost}
                        </div>
                    </div>

                    <h2>🏨 Luxury Hotels</h2>
                    <div className="hotels-container">
                        {plan.hotels.length > 0 ? (
                            plan.hotels.map((hotel, hotelIndex) => (
                                <HotelCard key={hotelIndex} hotel={hotel} />
                            ))
                        ) : (
                            <div className="message-container">
                                <p>No hotels found for this plan.</p>
                            </div>
                        )}
                    </div>

                    <h2>🍽️ Restaurants & Cafes</h2>
                    <div className="restaurants-container">
                        {plan.restaurants.length > 0 ? (
                            plan.restaurants.map((restaurant, resIndex) => (
                                <RestaurantCard key={resIndex} restaurant={restaurant} />
                            ))
                        ) : (
                            <div className="message-container">
                                <p>No restaurants or cafes found for this plan.</p>
                            </div>
                        )}
                    </div>

                    {plan.activities && plan.activities.length > 0 && (
                        <>
                            <h2>🎯 Things to Do</h2>
                            <div className="activities-container">
                                {plan.activities.map((activity, actIndex) => (
                                    <ActivityCard key={actIndex} activity={activity} />
                                ))}
                            </div>
                        </>
                    )}

                    <h2>🛍️ Shopping</h2>
                    <div className="shopping-container">
                        {plan.shopping.length > 0 ? (
                            plan.shopping.map((shop, shopIndex) => (
                                <ShoppingCard key={shopIndex} shopping={shop} />
                            ))
                        ) : (
                            <div className="message-container">
                                <p>No shopping spots found for this plan.</p>
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {!travelData && !isLoading && (
                <div className="message-container">
                    <p>🌍 Start planning your perfect trip by searching for a destination above!</p>
                </div>
            )}
        </div>
    );
};

export default TravelGuide;