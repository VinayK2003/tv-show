import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import axios from 'axios';

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
      <h1>TV Shows</h1>
      <ul>
        {shows.map((show) => (
          <li key={show.show.id}>
            <h3>{show.show.name}</h3>
            {show.show.image && show.show.image.medium && (
              <img src={show.show.image.medium} alt={show.name} />
            )}
            <p>Genres: {show.show.genres ? show.show.genres.join(', ') : 'N/A'}</p>
            <p>Premiered: {show.show.premiered}</p>
            <button onClick={() => navigate(`/show/${show.show.id}`)}>Show Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowList;
