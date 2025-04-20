package com.englishlearning.controller;

import com.englishlearning.dto.response.ApiResponse;
import com.englishlearning.model.user.User;
import com.englishlearning.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/users")
    public ApiResponse<User> createUser(@RequestBody User user) {
        User newUser = userService.createUser(user);
        return ApiResponse.<User>builder()
                .code(HttpStatus.CREATED.value())
                .message("User created")
                .result(newUser)
                .build();
    }
    @PutMapping("/users/{userId}")
    public ApiResponse<User> updateUser(@PathVariable Long userId,@RequestBody User user) throws Exception {
        User updateUser = userService.updateUser(userId,user);
        return ApiResponse.<User>builder()
                .code(HttpStatus.OK.value())
                .message("Update user successfully")
                .result(updateUser)
                .build();
    }
    @GetMapping("/users/{userId}")
    public ApiResponse<User> getUserById(@PathVariable Long userId) throws Exception {
        User user = userService.getUserById(userId);
        return ApiResponse.<User>builder()
                .code(HttpStatus.OK.value())
                .message("Get user successfully")
                .result(user)
                .build();
    }
    @DeleteMapping("/users/{userId}")
    public ApiResponse<Void> deleteUser(@PathVariable Long userId) throws Exception {
        userService.deleteUserById(userId);
        return ApiResponse.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Delete user successfully")
                .result(null)
                .build();
    }
    @GetMapping("/users")
    public ApiResponse<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ApiResponse.<List<User>>builder()
                .code(HttpStatus.OK.value())
                .message("Get all user successfully")
                .result(users)
                .build();
    }
}
