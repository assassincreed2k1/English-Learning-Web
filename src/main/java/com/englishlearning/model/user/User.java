package com.englishlearning.model.user;


import com.englishlearning.model.BaseEntity;
import com.englishlearning.model.system.ExamResult;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {

    private String email;
    private String password;
    private String username;
    private String gender;
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    private Role role;

    public enum Gender {
        MALE, FEMALE, OTHER
    }
    public enum Role {
        ADMIN, TEACHER, STUDENT
    }

    @OneToMany(mappedBy = "user")
    private List<ExamResult> examResults;

}
