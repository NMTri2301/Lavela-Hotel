/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import { deleteRoom, getAllRooms } from "../utils/ApiFunctions"
import { Col, Row } from "react-bootstrap"
import RoomFilter from "../common/RoomFilter"
import RoomPaginator from "../common/RoomPaginator"
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa"
import { Link } from "react-router-dom"

const ExistingRooms = () => {
    const [rooms, setRooms] = useState([{ id: "", roomType: "", roomPrice: "" }]) // Xóa giá trị mặc định vì không cần thiết
    const [currentPage, setCurrentPage] = useState(1)
    const [roomsPerPage] = useState(8)
    const [isLoading, setIsLoading] = useState(false)
    const [filteredRooms, setFilteredRooms] = useState([{ id: "", roomType: "", roomPrice: "" }])
    const [selectedRoomType, setSelectedRoomType] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    // Lấy dữ liệu từ API
    useEffect(() => {
        fetchRooms()
    }, [])

    const fetchRooms = async () => {
        setIsLoading(true)
        try {
            const result = await getAllRooms()
            console.log("Rooms fetched:", result) // Kiểm tra dữ liệu trả về từ API
            setRooms(result)
            setFilteredRooms(result)
            setIsLoading(false)
        } catch (error) {
            setErrorMessage(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    // Lọc danh sách phòng theo loại phòng
    useEffect(() => {
        const updatedRooms =
            selectedRoomType === ""
                ? rooms
                : rooms.filter((room) => room.roomType === selectedRoomType)
        setFilteredRooms(updatedRooms)
        setCurrentPage(1) // Reset về trang 1 khi lọc
    }, [rooms, selectedRoomType])

    // Xử lý chuyển trang
    const handlePaginationClick = (pageNumber) => {
        console.log("Switching to page:", pageNumber)
        setCurrentPage(pageNumber)
    }

    // Xóa phòng
    const handleDelete = async (roomId) => {
        try {
            const result = await deleteRoom(roomId)
            if (result === "") {
                setSuccessMessage(`Room No ${roomId} was deleted successfully`)
                fetchRooms() // Cập nhật lại danh sách sau khi xóa
            } else {
                setErrorMessage(`Error deleting room: ${result.message}`)
            }
        } catch (error) {
            setErrorMessage(error.message)
        } finally {
            setTimeout(() => {
                setSuccessMessage("")
                setErrorMessage("")
            }, 3000)
        }
    }

    // Tính toán số trang
    const calculateTotalPages = () => {
        const totalRooms = filteredRooms.length
        return Math.ceil(totalRooms / roomsPerPage)
    }

    // Phân trang
    const indexOfLastRoom = currentPage * roomsPerPage
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)

    return (
        <>
            <div className="container col-md-8 col-lg-6">
                {successMessage && <p className="alert alert-success mt-5">{successMessage}</p>}
                {errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
            </div>

            {isLoading ? (
                <p>Loading existing rooms...</p>
            ) : (
                <section className="mt-5 mb-5 container">
                    <div className="d-flex justify-content-between mb-3 mt-5">
                        <h2>Existing Rooms</h2>
                    </div>

                    <Row>
                        <Col md={6} className="mb-2 md-mb-0">
                            <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
                        </Col>

                        <Col md={6} className="d-flex justify-content-end">
                            <Link to={"/add-room"}>
                                <button className="btn btn-primary btn-sm ml-5">
                                    <FaPlus /> Add Room
                                </button>
                            </Link>
                        </Col>
                    </Row>

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
                                            <span className="btn btn-warning btn-sm ml-5">
                                                <FaEdit />
                                            </span>
                                        </Link>
                                        <button
                                            className="btn btn-danger btn-sm ml-5"
                                            onClick={() => handleDelete(room.id)}
                                        >
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
            )}
        </>
    )
}

export default ExistingRooms
