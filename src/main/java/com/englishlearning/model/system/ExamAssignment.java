package com.englishlearning.model.system;

import com.englishlearning.model.BaseEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "exam_assignments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExamAssignment extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "assignment_id")
    private Assignment assignment;

    @ManyToOne
    @JoinColumn(name = "exam_id")
    private Exam exam;

    @Builder
    public ExamAssignment(Exam exam, Assignment assignment) {
        this.exam = exam;
        this.assignment = assignment;
    }
}
