import axios from "axios";
// import { ThemeProvider } from "react-bootstrap";

export const api = axios.create({
    baseURL: "http://localhost:8080",
});

// This function adds a new room to the database
export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);

    try {
        const response = await api.post("/rooms/add/new-room", formData);
        return response.status === 201 ? response.data : null; // Trả về dữ liệu nếu thành công
    } catch (error) {
        console.error("Error adding room:", error);
        throw new Error("Error adding room");
    }
}

// This function gets all room types from the database 
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room-types");
        return response.data;
    } catch (error) {
        console.error("Detailed error:", error);
        throw new Error("Error fetching room types");
    }
}

// This function gets all rooms from the database
export async function getAllRooms() {
    try {
        const response = await api.get("/rooms/all-rooms");
        return response.data;
    } catch (error) {
        console.error("Detailed error:", error);
        throw new Error("Error fetching rooms");
    }
}

// This function deletes a room by the ID
export async function deleteRoom(roomId) {
    if (!roomId || typeof roomId !== 'string' || roomId.trim() === '') {
        throw new Error('Invalid room ID');
    }
    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}`);
        console.log(`Deleted room response:`, result);
        return result.data;
    } catch (error) {
        console.error(`Error deleting room: ${error.response ? error.response.data : error.message}`);
        throw new Error(`Error deleting room: ${error.message}`);
    }
}

// This function updates a room
export async function updateRoom(roomId, roomData) {
    const formData = new FormData();
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    formData.append("photo", roomData.photo)
    const response = await api.put(`/rooms/update/${roomId}`, formData)
    return response
}

// This function gets a room by the id
export async function getRoomById(roomId) {
    try {
        const result = await api.get(`/rooms/room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Error fetching room ${error.message}`)
    }
}