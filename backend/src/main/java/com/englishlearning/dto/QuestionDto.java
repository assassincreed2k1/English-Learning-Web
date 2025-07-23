package com.englishlearning.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class QuestionDto {
    private Long questionId;
    private String content;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String userAnswer;
    private String correctAnswer;
    private boolean isCorrect;
    private String explanation;
}
