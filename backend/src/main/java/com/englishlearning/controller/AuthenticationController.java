package com.englishlearning.controller;

import com.englishlearning.dto.request.AuthenticationRequest;
import com.englishlearning.dto.request.IntrospectRequest;
import com.englishlearning.dto.request.LogoutRequest;
import com.englishlearning.dto.request.RefreshRequest;
import com.englishlearning.dto.response.ApiResponse;
import com.englishlearning.dto.response.AuthenticationResponse;
import com.englishlearning.dto.response.IntrospectResponse;
import com.englishlearning.model.user.User;
import com.englishlearning.repository.UserRepository;
import com.englishlearning.service.AuthenticationService;
import com.nimbusds.jose.JOSEException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) throws Exception {
        var result = authenticationService.authenticate(request);
        return ApiResponse.<AuthenticationResponse>builder().result(result).build();
    }

    @PostMapping("/introspect")
    ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest request)
            throws ParseException, JOSEException {
        var result = authenticationService.introspect(request);
        return ApiResponse.<IntrospectResponse>builder().result(result).build();
    }

    @PostMapping("/refresh")
    ApiResponse<AuthenticationResponse> refresh(@RequestBody RefreshRequest request)
            throws Exception {
        var result = authenticationService.refreshToken(request);
        return ApiResponse.<AuthenticationResponse>builder().result(result).build();
    }

    @PostMapping("/logout")
    ApiResponse<Void> logout(@RequestBody LogoutRequest request) throws ParseException, JOSEException {
        authenticationService.logout(request);
        return ApiResponse.<Void>builder().build();
    }
    @PostMapping("/register")
    ApiResponse<User> register(@RequestBody User request) throws ParseException, JOSEException {
            request.setPassword(passwordEncoder.encode(request.getPassword()));
            request= userRepository.save(request);
        return ApiResponse.<User>builder()
                .code(HttpStatus.CREATED.value())
                .message("Register successfully")
                .result(request)
                .build();
    }
}

