/* eslint-disable no-unused-vars */
import { useState } from "react"
import { addRoom } from "../utils/ApiFunctions"
import RoomTypeSelector from "../common/RoomTypeSelector"
import { Link } from "react-router-dom"

const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  })

  const [imagePreview, setImagePreview] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleRoomInputChange = (e) => {
    const name = e.target.name
    let value = e.target.value
    if (name === "roomPrice") {
      if (!isNaN(value)) {
        value = parseInt(value, 10)
      } else {
        value = ""
      }
    }
    setNewRoom({ ...newRoom, [name]: value })
  }

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]
    setNewRoom({ ...newRoom, photo: selectedImage })
    setImagePreview(URL.createObjectURL(selectedImage))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice)
      if (success !== undefined) {
        setSuccessMessage("A new room was added successfully!")
        setNewRoom({ photo: null, roomType: "", roomPrice: "" })
        setImagePreview("")
        setErrorMessage("")
      } else {
        setErrorMessage("Error adding new room")
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
    setTimeout(() => {
      setSuccessMessage("")
      setErrorMessage("")
    }, 3000)
  }

  return (
    <section className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="mt-5 mb-4">Add A New Room</h2>

          <div>
            {successMessage && (
              <div className="alert alert-success fade show">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="alert alert-danger fade show">{errorMessage}</div>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="roomType" className="form-label">
                Room Type
              </label>
              <RoomTypeSelector
                handleRoomInputChange={handleRoomInputChange}
                newRoom={newRoom}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="roomPrice" className="form-label">
                Room Price
              </label>
              <input
                required
                type="number"
                className="form-control"
                id="roomPrice"
                name="roomPrice"
                value={newRoom.roomPrice}
                onChange={handleRoomInputChange}
                min="0"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="photo" className="form-label">
                Room Photo
              </label>
              <input
                required
                name="photo"
                id="photo"
                type="file"
                className="form-control"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview Room Photo"
                  className="mb-3"
                />
              )}
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-center">
              <Link to={"/existing-rooms"} className="btn btn-outline-info">
                Existing rooms
              </Link>
              <button type="submit" className="btn btn-outline-primary">
                Save Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default AddRoom
