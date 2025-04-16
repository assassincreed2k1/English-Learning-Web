package com.englishlearning.model.system;

import com.englishlearning.model.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "userAnswers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserAnswer extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "exam_result_id")
    private ExamResult examResult;
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @Enumerated(EnumType.STRING)
    private Question.AnswerOption selectedAnswer; // A

    private boolean isCorrect;//

}






