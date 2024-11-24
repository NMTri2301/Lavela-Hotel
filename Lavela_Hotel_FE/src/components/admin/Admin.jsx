/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
	return (
		<section className="container mt-5">
			<div className="text-center">
				<h2 className="display-4">Welcome to Admin Panel</h2>
				<hr className="my-4" />
				<p className="lead text-muted">
					Here you can manage rooms and bookings efficiently. Choose an option below to get started.
				</p>
			</div>

			<div className="row mt-5">
				<div className="col-md-6 mb-4">
					<div className="card shadow-sm border-light rounded">
						<div className="card-body">
							<h5 className="card-title text-center">Manage Rooms</h5>
							<p className="card-text text-center">
								View, update, or remove rooms from your hotel.
							</p>
							<div className="d-flex justify-content-center">
								<Link to="/existing-rooms">
									<button className="btn btn-primary btn-lg">Go to Rooms</button>
								</Link>
							</div>
						</div>
					</div>
				</div>

				<div className="col-md-6 mb-4">
					<div className="card shadow-sm border-light rounded">
						<div className="card-body">
							<h5 className="card-title text-center">Manage Bookings</h5>
							<p className="card-text text-center">
								Review, modify or cancel bookings made by guests.
							</p>
							<div className="d-flex justify-content-center">
								<Link to="/existing-bookings">
									<button className="btn btn-primary btn-lg">Go to Bookings</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Admin
