/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import moment from "moment"
import { cancelBooking, getBookingByConfirmationCode } from "../utils/ApiFunctions"

const FindBooking = () => {
  const [confirmationCode, setConfirmationCode] = useState("")
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [bookingInfo, setBookingInfo] = useState({
    id: "",
    bookingConfirmationCode: "",
    room: { id: "", roomType: "" },
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuests: "",
  })

  const emptyBookingInfo = {
    id: "",
    bookingConfirmationCode: "",
    room: { id: "", roomType: "" },
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuests: "",
  }
  const [isDeleted, setIsDeleted] = useState(false)

  const handleInputChange = (event) => {
    setConfirmationCode(event.target.value)
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const data = await getBookingByConfirmationCode(confirmationCode)
      setBookingInfo(data)
      setError(null)
    } catch (error) {
      setBookingInfo(emptyBookingInfo)
      if (error.response && error.response.status === 404) {
        setError(error.response.data.message)
      } else {
        setError(error.message)
      }
    }

    setTimeout(() => setIsLoading(false), 2000)
  }

  const handleBookingCancellation = async () => {
    try {
      await cancelBooking(bookingInfo.id)
      setIsDeleted(true)
      setSuccessMessage("Your booking has been successfully canceled!")
      setBookingInfo(emptyBookingInfo)
      setConfirmationCode("")
      setError(null)
    } catch (error) {
      setError(error.message)
    }
    setTimeout(() => {
      setSuccessMessage("")
      setIsDeleted(false)
    }, 2000)
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="container mt-5 d-flex flex-column align-items-center flex-grow-1">
        <div className="card shadow-lg p-4 col-12 col-md-8">
          <h2 className="text-center mb-4 text-primary">Find My Booking</h2>
          <form onSubmit={handleFormSubmit} className="input-group mb-4">
            <input
              className="form-control"
              type="text"
              id="confirmationCode"
              name="confirmationCode"
              value={confirmationCode}
              onChange={handleInputChange}
              placeholder="Enter your booking confirmation code"
              required
            />
            <button type="submit" className="btn btn-primary input-group-text">
              Search
            </button>
          </form>
          {isLoading && <p className="text-center text-info">Searching for your booking...</p>}
          {error && <div className="alert alert-danger text-center">{error}</div>}
          {bookingInfo.bookingConfirmationCode && (
            <div className="mt-4">
              <h3 className="text-success">Booking Details</h3>
              <p><strong>Confirmation Code:</strong> {bookingInfo.bookingConfirmationCode}</p>
              <p><strong>Room Number:</strong> {bookingInfo.room.id}</p>
              <p><strong>Room Type:</strong> {bookingInfo.room.roomType}</p>
              <p><strong>Check-in Date:</strong> {moment(bookingInfo.checkInDate).format("MMM Do, YYYY")}</p>
              <p><strong>Check-out Date:</strong> {moment(bookingInfo.checkOutDate).format("MMM Do, YYYY")}</p>
              <p><strong>Guest Name:</strong> {bookingInfo.guestName}</p>
              <p><strong>Email:</strong> {bookingInfo.guestEmail}</p>
              <p><strong>Number of Adults:</strong> {bookingInfo.numOfAdults}</p>
              <p><strong>Number of Children:</strong> {bookingInfo.numOfChildren}</p>
              <p><strong>Total Guests:</strong> {bookingInfo.totalNumOfGuests}</p>
              {!isDeleted && (
                <button
                  onClick={handleBookingCancellation}
                  className="btn btn-danger w-100 mt-3"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          )}
          {isDeleted && (
            <div className="alert alert-success text-center mt-4">
              {successMessage}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default FindBooking
