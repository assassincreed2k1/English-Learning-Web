package com.englishlearning.model.system;

import java.util.List;
import java.util.ArrayList;

import com.englishlearning.model.BaseEntity;
import jakarta.persistence.EnumType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "assignments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Assignment extends BaseEntity {
    private Integer quantity = 0;
    private String content;
    private String description;

    @Enumerated(EnumType.STRING)
    private Type type;

    @OneToMany(mappedBy = "assignment", cascade = CascadeType.ALL, orphanRemoval = true)
    List<AssignmentQuestion> assignmentQuestions = new ArrayList<>();

    @OneToMany(mappedBy = "assignment", cascade = CascadeType.ALL, orphanRemoval = true)
    List<ExamAssignment> examAssignments = new ArrayList<>();

    public void addQuestionFromEntity(Question question) {
        AssignmentQuestion aq = new AssignmentQuestion();
        aq.setAssignment(this);
        aq.setQuestion(question);
        this.assignmentQuestions.add(aq);
        quantity++;
    }

    public void setType(Type type) {
        this.type = type;
        setDescription();
    }

    private void setDescription() {
        if (this.type == null) {
            this.description = "No specific requirement.";
            return;
        }

        switch (this.type) {
            case PRONUNCIATION:
                this.description = "Choose the word whose pronunciation is different from the others.";
                break;
            case READING:
                this.description = "Read the passage and answer the questions.";
                break;
            case LISTENING:
                this.description = "Listen to the audio and choose the correct answer.";
                break;
            default:
                this.description = "Choose the correct answer.";
        }
    }

    public enum Type {
        PRONUNCIATION, READING, LISTENING
    }
}