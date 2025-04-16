package com.englishlearning.model.system;

import com.englishlearning.model.BaseEntity;
import com.englishlearning.model.user.User;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "exam_results")
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
