/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react'
import { bookRoom, getRoomById } from '../utils/ApiFunctions'
import { useNavigate, useParams } from 'react-router-dom'
import moment from "moment"
import { Form, FormControl } from 'react-bootstrap'
import BookingSummary from './BookingSummary'
const BookingForm = () => {
    const [isValidated, setIsValidated] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [roomPrice, setRoomPrice] = useState(0)
    const [booking, setBooking] = useState({
        guestFullName: "",
        guestEmail: "",
        checkInDate: "",
        checkOutDate: "",
        numOfAdults: "",
        numOfChildren: "",
    })
    const [roomInfo, setRoomInfo] = useState({
        photo: "",
        roomType: "",
        roomPrice: ""
    })

    const { roomId } = useParams()

    const navigate = useNavigate()
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setBooking({ ...booking, [name]: value })
        setErrorMessage("")
    }

    const getRoomPriceById = async (roomId) => {
        try {
            const response = await getRoomById(roomId)
            setRoomPrice(response.roomPrice)
        } catch (error) {
            throw new Error(error)
        }
    }
    useEffect(() => {
        getRoomPriceById(roomId)
    }, [roomId])

    const calculatePayment = () => {
        const checkInDate = moment(booking.checkInDate)
        const checkOutDate = moment(booking.checkOutDate)
        const diffIndays = checkOutDate.diff(checkInDate, "days")
        const price = roomPrice ? roomPrice : 0
        return diffIndays * price
    }

    const isGuestCountValid = () => {
        const adultCount = parseInt(booking.numOfAdults)
        const childrenCount = parseInt(booking.numOfChildren)
        const totalCount = adultCount + childrenCount
        return totalCount >= 1 && adultCount >= 1
    }

    const isCheckOutDateValid = () => {
        if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
            setErrorMessage("Check-out date must come after check-in date")
            return false
        } else {
            setErrorMessage("")
            return true
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
            e.stopPropagation()
        } else {
            setIsSubmitted(true)
        }
        setIsValidated(true)
    }
    const handleFormSubmit = async () => {
        try {
            const confirmationCode = await bookRoom(roomId, booking)
            setIsSubmitted(true)
            navigate("/booking-success", { state: { message: confirmationCode } })
        } catch (error) {
            setErrorMessage(error.message)
            navigate("/booking-success", { state: { error: errorMessage } })
        }
    }
    return (
        <>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card card-body mt-5">
                            <legend style={{ color: 'blue' }}><strong>Reserve Room</strong></legend>
                            <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label htmlFor="guestFullName">Full Name: </Form.Label>
                                    <FormControl
                                        required
                                        type="text"
                                        id="guestFullName"
                                        name="guestFullName"
                                        value={booking.guestFullName}
                                        placeholder="Enter your full name"
                                        onChange={handleInputChange}
                                    />
                                    <FormControl.Feedback type="invalid">
                                        Please enter your FullName
                                    </FormControl.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="guestEmail">Email: </Form.Label>
                                    <FormControl
                                        required
                                        type="email"
                                        id="guestEmail"
                                        name="guestEmail"
                                        value={booking.guestEmail}
                                        placeholder="Enter your email"
                                        onChange={handleInputChange}
                                    />
                                    <FormControl.Feedback type="invalid">
                                        Please enter your email address
                                    </FormControl.Feedback>
                                </Form.Group>
                                <fieldset style={{ border: "2px" }}>
                                    <h5><strong>Lodging period</strong></h5>
                                    <div className="row">
                                        <div className="col-6">
                                            <Form.Label htmlFor="checkInDate">Check-In Date: </Form.Label>
                                            <FormControl
                                                required
                                                type="date"
                                                id="checkInDate"
                                                name="checkInDate"
                                                value={booking.checkInDate}
                                                placeholder="check-in date"
                                                onChange={handleInputChange}
                                            />
                                            <FormControl.Feedback type="invalid">
                                                Please select a check-in date
                                            </FormControl.Feedback>
                                        </div>

                                        <div className="col-6">
                                            <Form.Label htmlFor="checkOutDate">Check-Out Date: </Form.Label>
                                            <FormControl
                                                required
                                                type="date"
                                                id="checkOutDate"
                                                name="checkOutDate"
                                                value={booking.checkOutDate}
                                                placeholder="check-out date"
                                                onChange={handleInputChange}
                                            />
                                            <FormControl.Feedback type="invalid">
                                                Please select a check-out date
                                            </FormControl.Feedback>
                                        </div>
                                        {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <h5><strong>Number of Guest</strong></h5>
                                    <div className="row">
                                        <div className="col-6">
                                            <Form.Label htmlFor="numOfAdults">Adults: </Form.Label>
                                            <FormControl
                                                required
                                                type="number"
                                                id="numOfAdults"
                                                name="numOfAdults"
                                                value={booking.numOfAdults}
                                                placeholder="0"
                                                min={1}
                                                onChange={handleInputChange}
                                            />
                                            <FormControl.Feedback type="invalid">
                                                Please select at least 1 adult
                                            </FormControl.Feedback>
                                        </div>

                                        <div className="col-6">
                                            <Form.Label htmlFor="numOfChildren">Children: </Form.Label>
                                            <FormControl
                                                required
                                                type="number"
                                                id="numOfChildren"
                                                name="numOfChildren"
                                                value={booking.numOfChildren}
                                                placeholder="0"
                                                min={0}
                                                onChange={handleInputChange}
                                            />
                                            <FormControl.Feedback type="invalid">
                                                Select 0 if no children
                                            </FormControl.Feedback>
                                        </div>
                                    </div>
                                </fieldset>

                                <div className="form-group mt-2 mb-2">
                                    <button type="submit" className="btn btn-info">
                                        Continue
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className="col-md-6">
                        {isSubmitted && (
                            <BookingSummary
                                booking={booking}
                                payment={calculatePayment()}
                                isFormValid={isValidated}
                                onConfirm={handleFormSubmit} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookingForm