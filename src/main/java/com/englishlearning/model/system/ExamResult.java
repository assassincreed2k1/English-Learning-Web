package com.englishlearning.model.system;

import com.englishlearning.model.BaseEntity;
import com.englishlearning.model.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "examResults")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExamResult extends BaseEntity {
    private Integer score;
    private Integer numberCorrect;
    private Integer numberWrong;
    private Double percentageCorrect;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "exam_id")
    private Exam exam;

    @OneToMany(mappedBy = "examResult", cascade = CascadeType.ALL)
    private List<UserAnswer> userAnswers;
}
