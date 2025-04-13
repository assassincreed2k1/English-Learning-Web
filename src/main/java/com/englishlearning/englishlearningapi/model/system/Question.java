package com.englishlearning.englishlearningapi.model.system;

import com.englishlearning.englishlearningapi.model.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "questions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Question extends BaseEntity {

    private String content;
    private String option_A;
    private String option_B;
    private String option_C;
    private String option_D;
    @Enumerated(EnumType.STRING)
    private AnswerOption correctAnswer;
    public enum AnswerOption {
        A,B,C,D
    }

    @ManyToOne
    @JoinColumn(name = "exam_id")
    private Exam exam;
}
