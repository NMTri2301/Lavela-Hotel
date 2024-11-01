import axios from "axios"

export const api = axios.create({
    baseURL :"http://localhost:8080"
})
// This function adds a new room to the database
export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)

    const response = await api.post("/rooms/add/new-room", formData)
    if(response.status == 201){
        return true
    }else{
        return false
    } 
}
//This function gets all room types from thê database 
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room-types")
        return response.data
    } catch (error){
        console.error("Detailed error:", error);
        throw new Error("Error fetching room types");
    }  
}
//This functions gets all rooms from the database
export async function getAllRooms(){
    try {
        const result =await api.get("/rooms/all-rooms")
        return result.data
    } catch (error) {
        console.error("Detailed error:", error);
        throw new Error("Error fetching rooms")
    }
    
}