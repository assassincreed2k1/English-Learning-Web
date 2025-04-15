package com.englishlearning.model.system;

import java.util.ArrayList;
import java.util.List;

import com.englishlearning.model.BaseEntity;

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
    private String option_A;
    private String option_B;
    private String option_C;
    private String option_D;


    @Enumerated(EnumType.STRING)
    private AnswerOption correctAnswer;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AssignmentQuestion> assignmentQuestions = new ArrayList<>();

    public enum AnswerOption {
        A, B, C, D
    }
}
