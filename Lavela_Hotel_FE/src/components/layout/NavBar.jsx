/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { NavLink, Link } from "react-router-dom"
import Logout from "../auth/Logout"
import { FaUser, FaSignOutAlt } from "react-icons/fa"  // Optional: icons for user and logout

const NavBar = () => {
	const [showAccount, setShowAccount] = useState(false)

	const handleAccountClick = () => {
		setShowAccount(!showAccount)
	}

	const isLoggedIn = localStorage.getItem("token")
	const userRole = localStorage.getItem("userRole")

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary px-5 shadow-lg mt-5 sticky-top">
			<div className="container-fluid">
				<Link to={"/"} className="navbar-brand text-white font-weight-bold">
					<span className="hotel-color" style={{ fontSize: "1.75rem", fontFamily: "Cursive" }}>Lavela Hotel</span>
				</Link>

				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarScroll"
					aria-controls="navbarScroll"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarScroll">
					<ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
						<li className="nav-item">
							<NavLink className="nav-link text-light" aria-current="page" to={"/browse-all-rooms"}>
								<span className="fw-bold">Browse all rooms</span>
							</NavLink>
						</li>

						{isLoggedIn && userRole === "ROLE_ADMIN" && (
							<li className="nav-item">
								<NavLink className="nav-link text-light" aria-current="page" to={"/admin"}>
									<span className="fw-bold">Admin</span>
								</NavLink>
							</li>
						)}
					</ul>

					<ul className="d-flex navbar-nav">
						<li className="nav-item">
							<NavLink className="nav-link text-light" to={"/find-booking"}>
								<span className="fw-bold">Find my booking</span>
							</NavLink>
						</li>

						<li className="nav-item dropdown">
							<a
								className={`nav-link dropdown-toggle text-light ${showAccount ? "show" : ""}`}
								href="#"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								onClick={handleAccountClick}>
								<FaUser style={{ marginRight: "8px" }} />Account
							</a>

							<ul
								className={`dropdown-menu ${showAccount ? "show" : ""}`}
								aria-labelledby="navbarDropdown">
								{isLoggedIn ? (
									<Logout />
								) : (
									<li>
										<Link className="dropdown-item" to={"/login"}>
											Login
										</Link>
									</li>
								)}
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default NavBar
