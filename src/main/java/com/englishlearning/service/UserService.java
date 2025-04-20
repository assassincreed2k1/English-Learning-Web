package com.englishlearning.service;

import com.englishlearning.model.user.User;
import com.englishlearning.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }
    public User updateUser(Long userId, User request) throws Exception {
        User user = this.getUserById(userId);
        user.setGender(request.getGender());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setUsername(request.getUsername());
        return userRepository.save(user);
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) throws Exception {
        User user = userRepository.findById(id).orElseThrow(() -> new Exception("User not found"));
        return user;
    }
    
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }
}
