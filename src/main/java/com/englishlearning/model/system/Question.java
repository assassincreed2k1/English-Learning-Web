package com.englishlearning.model.system;

import java.util.ArrayList;
import java.util.List;

import com.englishlearning.model.BaseEntity;
import com.englishlearning.model.user.SubmissionAnswer;

import jakarta.persistence.EnumType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
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

    @Enumerated(EnumType.STRING)
    private QuestionType QuestionType;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AssignmentQuestion> assignmentQuestions = new ArrayList<>();

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    List<SubmissionAnswer> submissionAnswers = new ArrayList<>();

    public enum AnswerOption {
        A, B, C, D
    }

    public enum QuestionType {
        ESSAY_QUESTION, TF_QUESTION, CHOICE_QUESTION
    }
}