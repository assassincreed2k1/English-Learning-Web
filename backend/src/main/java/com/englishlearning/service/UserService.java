package com.englishlearning.service;

import com.englishlearning.model.user.User;
import com.englishlearning.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.Jwt;
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

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User chưa đăng nhập");
        }
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserDetails) {
            String email = ((UserDetails) principal).getUsername();
            System.out.println(principal);
            return userRepository.findByEmail(email);
        } else if (principal instanceof Jwt jwt) {
               String email= jwt.getSubject();
            return userRepository.findByEmail(email);
         } else if (principal instanceof String s) {
            return userRepository.findByEmail(s);
         }

        throw new RuntimeException("Không thể xác định user hiện tại");
    }

}
