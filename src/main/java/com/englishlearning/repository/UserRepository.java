package com.englishlearning.repository;

import com.englishlearning.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
