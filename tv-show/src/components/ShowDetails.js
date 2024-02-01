import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
          <h1>{show.name}</h1>
          <p>{show.summary && show.summary.replace(/<[^>]*>/g, '')}</p>
          <button onClick={handleBookTicket}>Book A Ticket</button>
        </>
      )}

      {/* Display the form only if showBookingForm is true */}
      {showBookingForm && (
        <div>
          <h2>Booking Form</h2>
          <form onSubmit={handleFormSubmit}>
            <label>
              Movie Name:
              <input type="text" value={bookingFormData.movieName} readOnly />
            </label>
            {/* Add other relevant form fields */}
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ShowDetails;
