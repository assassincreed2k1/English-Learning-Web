package com.englishlearning.englishlearningapi.model.system;

import com.englishlearning.englishlearningapi.model.BaseEntity;
import com.englishlearning.englishlearningapi.model.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
}
