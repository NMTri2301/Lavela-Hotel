/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { getRoomTypes } from '../utils/ApiFunctions'

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([""])
  const [showNewRoomTypeInput, setShowNewRoomTypesInput] = useState(false)
  const [newRoomType, setNewRoomType] = useState("")

  useEffect(() => {
    // Lấy room types từ localStorage trước
    const savedRoomTypes = JSON.parse(localStorage.getItem("roomTypes"))
    if (savedRoomTypes) {
      setRoomTypes(savedRoomTypes)
    } else {
      // Nếu chưa có trong localStorage, gọi API để lấy room types
      getRoomTypes().then((data) => {
        setRoomTypes(data)
        // Lưu dữ liệu từ API vào localStorage
        localStorage.setItem("roomTypes", JSON.stringify(data))
      })
    }
  }, [])

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value)
  }

  const handleAddNewRoomType = () => {
    if (newRoomType !== "") {
      const updatedRoomTypes = [...roomTypes, newRoomType]
      setRoomTypes(updatedRoomTypes)
      // Lưu room types cập nhật vào localStorage
      localStorage.setItem("roomTypes", JSON.stringify(updatedRoomTypes))
      setNewRoomType("")
      setShowNewRoomTypesInput(false)
    }
  }

  return (
    <>
      {roomTypes.length > 0 && (
        <div>
          <select
            id="roomType"
            name="roomType"
            value={newRoom.roomType}
            onChange={(e) => {
              if (e.target.value === "Add New") {
                setShowNewRoomTypesInput(true)
              } else {
                handleRoomInputChange(e)
              }
            }}
          >
            <option value={""}>Select a room type</option>
            <option value={"Add New"}>Add New</option>
            {roomTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          {showNewRoomTypeInput && (
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="Enter a new room type"
                value={newRoomType}
                onChange={handleNewRoomTypeInputChange}
              />
              <button
                className="btn btn-hotel"
                type="button"
                onClick={handleAddNewRoomType}
              >
                Add
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default RoomTypeSelector
