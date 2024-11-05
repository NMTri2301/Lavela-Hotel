package com.bookinghotel.Lavela_Hotel.service;

import com.bookinghotel.Lavela_Hotel.model.BookedRoom;

import java.util.List;

public interface IBookingService {
    void cancelBooking(Long bookingId);

    String saveBoking(Long roomId, BookedRoom bookingRequest);

    BookedRoom findByBookingConfirmationCode(String confirmationCode);

    List<BookedRoom> getAlllBookings();
}
