/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { loginUser } from "../utils/ApiFunctions"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"

const Login = () => {
	const [errorMessage, setErrorMessage] = useState("")
	const [login, setLogin] = useState({
		email: "",
		password: "",
	})

	const navigate = useNavigate()
	const auth = useAuth()
	const location = useLocation()
	const redirectUrl = location.state?.path || "/"

	const handleInputChange = (e) => {
		setLogin({ ...login, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const success = await loginUser(login)
		if (success) {
			const token = success.token
			auth.handleLogin(token)
			navigate(redirectUrl, { replace: true })
		} else {
			setErrorMessage("Invalid username or password. Please try again")
		}
		setTimeout(() => {
			setErrorMessage("")
		}, 4000)
	}

	return (
		<div className="d-flex flex-column min-vh-100">
			<section className="container mt-5 mb-5 d-flex justify-content-center">
				<div className="card shadow-lg p-4 col-12 col-md-8 col-lg-6">
					{errorMessage && (
						<div className="alert alert-danger text-center">{errorMessage}</div>
					)}
					<h2 className="text-center mb-4">Welcome to Lavela Hotel</h2>
					<form onSubmit={handleSubmit}>
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
								value={login.email}
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
								value={login.password}
								onChange={handleInputChange}
								required
							/>
						</div>

						<div className="d-flex justify-content-between align-items-center mb-4">
							<button type="submit" className="btn btn-primary w-100">
								Login
							</button>
						</div>
						<div className="text-center mt-3">
							<p>
								Don't have an account?{" "}
								<Link to="/register" className="text-decoration-none">
									Register
								</Link>
							</p>
						</div>
					</form>
				</div>
			</section>
		</div>
	)
}

export default Login
