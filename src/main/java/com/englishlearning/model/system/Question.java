package com.englishlearning.model.system;

import com.englishlearning.model.BaseEntity;
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
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    @Enumerated(EnumType.STRING)
    private AnswerOption correctAnswer;
    public enum AnswerOption {
        A,B,C,D
    }

    @ManyToOne
    @JoinColumn(name = "exam_id")
    private Exam exam;
}
