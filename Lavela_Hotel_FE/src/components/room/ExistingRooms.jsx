/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import { deleteRoom, getAllRooms } from "../utils/ApiFunctions"
import { Col } from "react-bootstrap"
import RoomFilter from "../common/RoomFilter"
import RoomPaginator from "../common/RoomPaginator"
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa"
import { Link } from "react-router-dom"

const ExistingRooms = () => {
    const [rooms, setRooms] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [roomsPerPage] = useState(8)
    const [isLoading, setIsLoading] = useState(false);
    const [filteredRooms, setFilteredRooms] = useState([])
    const [selectedRoomType, setSelectedRoomType] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        fetchRooms()
    }, [])

    const fetchRooms = async () => {
        setIsLoading(true);
        try {
            const result = await getAllRooms()
            console.log("Fetched rooms:", result)
            setRooms(result)
            setFilteredRooms(result)
        } catch (error) {
            console.error("Error fetching rooms:", error)
            setErrorMessage("Failed to load rooms. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (selectedRoomType === "") {
            setFilteredRooms(rooms)
        } else {
            const filtered = rooms.filter((room) => room.roomType === selectedRoomType)
            setFilteredRooms(filtered)
        }
        setCurrentPage(1)
    }, [rooms, selectedRoomType])

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleDelete = async (roomId) => {
        console.log(`Attempting to delete room with ID: ${roomId}`)
        try {
            await deleteRoom(String(roomId))
            setSuccessMessage(`Room No ${roomId} was deleted`)
            setFilteredRooms(filteredRooms.filter((room) => room.id !== roomId))
        } catch (error) {
            setErrorMessage(`Error deleting room: ${error.message}`)
        } finally {
            setTimeout(() => {
                setSuccessMessage("")
                setErrorMessage("")
            }, 3000)
        }
    }

    const calculateTotalPages = () => {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length
        return Math.ceil(totalRooms / roomsPerPage)
    };

    const indexOfLastRoom = currentPage * roomsPerPage
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)

    return (
        <>
            {isLoading ? (
                <p>Loading existing rooms...</p>
            ) : (
                <>
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    {successMessage && (
                        <div className="alert alert-success" role="alert">
                            {successMessage}
                        </div>
                    )}
                    <section className="mt-5 mb-5 container">
                        <div className="d-flex justify-content-between mb-3 mt-5">
                            <h2>Existing Rooms</h2>
                            <Link to="/add-room" className="btn btn-primary">
                                <FaPlus /> Add Room
                            </Link>
                        </div>
                        <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr className="text-center">
                                    <th>ID</th>
                                    <th>Room Type</th>
                                    <th>Room Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRooms.map((room) => (
                                    <tr key={room.id} className="text-center">
                                        <td>{room.id}</td>
                                        <td>{room.roomType}</td>
                                        <td>{room.roomPrice}</td>
                                        <td className="gap-2">
                                            <Link to={`/edit-room/${room.id}`}>
                                                <span className="btn btn-info btn-sm">
                                                    <FaEye />
                                                </span>
                                                <span className="btn btn-warning btn-sm">
                                                    <FaEdit />
                                                </span>
                                            </Link>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(room.id)}>
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <RoomPaginator
                            currentPage={currentPage}
                            totalPages={calculateTotalPages()}
                            onChange={handlePaginationClick}
                        />
                    </section>
                </>
            )}
        </>
    )
}

export default ExistingRooms
