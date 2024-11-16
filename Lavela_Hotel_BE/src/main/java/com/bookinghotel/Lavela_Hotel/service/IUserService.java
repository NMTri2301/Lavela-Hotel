package com.bookinghotel.Lavela_Hotel.service;

import com.bookinghotel.Lavela_Hotel.model.User;

import java.util.List;

public interface IUserService {
    User registerUser(User user);
    List<User> getUsers();
    void deleteUser(String email);
    User getUser(String email);
}
