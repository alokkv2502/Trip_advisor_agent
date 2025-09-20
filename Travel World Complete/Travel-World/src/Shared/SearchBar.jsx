import React, { useState } from 'react';
import './searchbar.css';

const SearchBar = () => {
    // State to manage search form inputs
    const [location, setLocation] = useState('');
    const [goingDate, setGoingDate] = useState('');
    const [returningDate, setReturningDate] = useState('');
    const [people, setPeople] = useState('');
    const [travelMode, setTravelMode] = useState('flight');

    const searchHandler = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!location.trim()) {
            alert('Please enter a location to search.');
            return;
        }

        // Create the search query string
        const searchQuery = `
            Location: ${location}, 
            Going Date: ${goingDate}, 
            Returning Date: ${returningDate}, 
            Number of People: ${people}, 
            Travel Mode: ${travelMode}
        `;

        // Define the API endpoint
        const apiUrl = 'http://127.0.0.1:7000/api/process';

        try {
            console.log("Making a real API call with query:", searchQuery);

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

            console.log('API Response:', data);
            alert('API Response received successfully! Check the console for details.');

        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to get a response from the API. Please check the server status.');
        }
    };

    return (
        <div className="search-bar-container">
            <form className="search-form" onSubmit={searchHandler}>
                {/* The rest of your form JSX code remains the same */}
                <div className="search-input-group">
                    <span className="search-icon">
                        <i className="ri-map-pin-line"></i>
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
                        <i className="ri-calendar-line"></i>
                    </span>
                    <div className="search-input">
                        <label>From - To</label>
                        <div className="date-inputs">
                            <input 
                                type="date"
                                value={goingDate}
                                onChange={(e) => setGoingDate(e.target.value)}
                                aria-label="Going date"
                            />
                            <span>-</span>
                            <input
                                type="date"
                                value={returningDate}
                                onChange={(e) => setReturningDate(e.target.value)}
                                aria-label="Returning date"
                            />
                        </div>
                    </div>
                </div>

                <div className="search-input-group">
                    <span className="search-icon">
                        <i className="ri-group-line"></i>
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
                        <i className="ri-car-line"></i>
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
                    <i className="ri-search-line"></i>
                </button>
            </form>
        </div>
    );
};

export default SearchBar;