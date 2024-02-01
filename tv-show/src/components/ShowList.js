import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./ShowList.css"

const ShowList = ({ history }) => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
        setShows(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleShowDetails = (showId) => {
    // Make sure history is available before using it
    if (history) {
      history.push(`/show/${showId}`);
    }
  };

  const navigate = useNavigate();
  return (

    <div >
      <h1 className='heading'>TV Shows</h1>

      <ul className="show-grid">
        {shows.map((show) => (
          <li key={show.show.id} className='show-item'>
            <h3>{show.show.name}</h3>
            {show.show.image && show.show.image.medium && (
              <img src={show.show.image.medium} alt={show.name} />
            )}
            <p>Genres: {show.show.genres ? show.show.genres.join(', ') : 'N/A'}</p>
            <p>Premiered: {show.show.premiered?show.show.premiered:"N/A"}</p>
            {/* <button onClick={() => navigate(`/show/${show.show.id}`)}>Show Details</button> */}
            <button className="btn btn-primary" onClick={() => navigate(`/show/${show.show.id}`)}> Show Details
            </button>
          </li>
        ))}
      </ul>
      </div>
  );
};

export default ShowList;
