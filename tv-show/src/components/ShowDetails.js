import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./ShowDetails.css"

const ShowDetails = () => {
  const { id } = useParams(); // Use useParams to get the 'id' parameter
  console.log(id);

  const [show, setShow] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    movieName: '',
    // Add other relevant details here
  });

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        setShow(response.data);

        // Update the movie name in the booking form data
        setBookingFormData({
          ...bookingFormData,
          movieName: response.data.name,
        });
      } catch (error) {
        console.error('Error fetching show details:', error);
      }
    };

    fetchShowDetails();
  }, [id, bookingFormData]); // Add 'id' and 'bookingFormData' as dependencies to useEffect

  const handleBookTicket = () => {
    // Set showBookingForm to true to display the booking form
    setShowBookingForm(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Assume you want to store the bookingFormData in local storage
    localStorage.setItem('bookingDetails', JSON.stringify(bookingFormData));
    // Add any other logic for booking a ticket
  };

  return (
    <div>
      {show && (
        <>
          <h1 className='heading'>{show.name}</h1>
          <div className='summary'>
            <div>

            </div>
            <div className='right'>
          {show.image && show.image.medium && (
              <img src={show.image.medium} alt={show.name} />
            )}
            <div>
          <p>Time: {show.schedule.time}</p>
          <p>Country: {show.network.country.name}</p>
          <p>Genres: {show.genres ? show.genres.join(', ') : 'N/A'}</p>
            </div>
            </div>
            <div className='left'>
          <p >{show.summary && show.summary.replace(/<[^>]*>/g, '')}</p>
            </div>
          </div>
          <button className=" button btn btn-primary" onClick={handleBookTicket}> Book A Ticket</button>
        </>
      )}

      {/* Display the form only if showBookingForm is true */}
      {showBookingForm && (
        <div>
          <h2 className='heading'>Booking Form</h2>
          <div className=' '>
          <form onSubmit={handleFormSubmit}>
            <label className='heading'>
              Movie Name:
              
              <input type="text" class="form-control" value={bookingFormData.movieName} style={{width:"200px"}}></input>
            <button className=" button btn btn-primary" type='submit'> Submit</button>
            </label>
            {/* Add other relevant form fields */}
          </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowDetails;
