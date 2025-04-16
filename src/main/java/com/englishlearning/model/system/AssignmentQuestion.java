package com.englishlearning.model.system;

import com.englishlearning.model.BaseEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "assignment_questions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AssignmentQuestion extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "assignment_id")
    private Assignment assignment;

    @Builder
    public AssignmentQuestion(Assignment assignment, Question question) {
        this.assignment = assignment;
        this.question = question;
    }

}
