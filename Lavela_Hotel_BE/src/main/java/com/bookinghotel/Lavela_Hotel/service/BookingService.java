package com.bookinghotel.Lavela_Hotel.service;

import com.bookinghotel.Lavela_Hotel.exception.InvalidBookingRequestException;
import com.bookinghotel.Lavela_Hotel.exception.ResourceNotFoundException;
import com.bookinghotel.Lavela_Hotel.model.BookedRoom;
import com.bookinghotel.Lavela_Hotel.model.Room;
import com.bookinghotel.Lavela_Hotel.repository.BookingRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService implements IBookingService {
    private final BookingRepository bookingRepository;
    private final IRoomService roomService;
    @Override
    public List<BookedRoom> getAlllBookings() {
        return bookingRepository.findAll();
    }
    @Override
    @Transactional
    public void cancelBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }
    public List<BookedRoom> getAllBookingsByRoomId(Long roomId){
        return bookingRepository.findByRoomId(roomId);
    }
    @Override
    @Transactional
    public String saveBoking(Long roomId, BookedRoom bookingRequest) {
        if(bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())){
            throw new InvalidBookingRequestException("Check-in date must come before check-out date");
        }
        Room room = roomService.getRoomById(roomId).get();
        List<BookedRoom> existingBookings = room.getBookings();
        boolean roomIsAvailable = roomIsAvailable(bookingRequest, existingBookings);
        if(roomIsAvailable){
            room.addBooking(bookingRequest);
            bookingRepository.save(bookingRequest);
        }else {
            throw new InvalidBookingRequestException("Sorry, This room is not available for the selected dates!");
        }
        return bookingRequest.getBookingConfirmationCode();
    }

    @Override
    public BookedRoom findByBookingConfirmationCode(String confirmationCode) {
        return bookingRepository.findByBookingConfirmationCode(confirmationCode).orElseThrow(()-> new ResourceNotFoundException("No booking found with booking code: "));
    }
    private boolean roomIsAvailable(BookedRoom bookingRequest, List<BookedRoom> existingBookings) {
        return existingBookings.stream()
                .noneMatch(existingBooking ->
                        bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                            || bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())
                            || (bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
                            && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()))
                            || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                            && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))
                            || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                            && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate()))

                            || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                            && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))

                            || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                            && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))
                );

    }
}
