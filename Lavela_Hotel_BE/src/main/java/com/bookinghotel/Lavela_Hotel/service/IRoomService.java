package com.bookinghotel.Lavela_Hotel.service;

import com.bookinghotel.Lavela_Hotel.model.Room;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

public interface IRoomService {
    Room addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice) throws SQLException, IOException;

    List<String> getAllRomTypes();

    List<Room> getAllRoms();

    byte[] getRoomPhotoByRoomId(Long roomId) throws SQLException;
}
