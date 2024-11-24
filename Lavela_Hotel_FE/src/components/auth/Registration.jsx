/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { registerUser } from "../utils/ApiFunctions"
import { Link } from "react-router-dom"

const Registration = () => {
  const [registration, setRegistration] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleInputChange = (e) => {
    setRegistration({ ...registration, [e.target.name]: e.target.value })
  }

  const handleRegistration = async (e) => {
    e.preventDefault()
    try {
      const result = await registerUser(registration)
      setSuccessMessage(result)
      setErrorMessage("")
      setRegistration({ firstName: "", lastName: "", email: "", password: "" })
    } catch (error) {
      setSuccessMessage("")
      setErrorMessage(`Registration error: ${error.message}`)
    }
    setTimeout(() => {
      setErrorMessage("")
      setSuccessMessage("")
    }, 5000)
  }

  return (
    <section className="container mt-5 mb-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4 col-12 col-md-8 col-lg-6">
        {errorMessage && (
          <div className="alert alert-danger text-center">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="alert alert-success text-center">{successMessage}</div>
        )}
        <h2 className="text-center mb-4">Create Your Guest Account</h2>
        <form onSubmit={handleRegistration}>
          <div className="mb-4">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className="form-control"
              placeholder="Enter your first name"
              value={registration.firstName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className="form-control"
              placeholder="Enter your last name"
              value={registration.lastName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={registration.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={registration.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </div>
          <div className="text-center mt-3">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-decoration-none">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Registration
