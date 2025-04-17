package com.englishlearning.model.system;


import java.util.ArrayList;
import java.util.List;

import com.englishlearning.model.BaseEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;
@Entity
@Table(name = "exams")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Exam extends BaseEntity {
    private String title;
    private String image;
    private Integer duration;
    private Integer totalAssignment;

    @Enumerated(EnumType.STRING)
    private ExamType examType;

    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL, orphanRemoval = true)
    List<ExamAssignment> examAssignments = new ArrayList<>();

    public void addQAssignmentFromEntity(Assignment assignment) {
        ExamAssignment ea = new ExamAssignment();
        ea.setExam(this);
        ea.setAssignment(assignment);
        this.examAssignments.add(ea);
    }

    public enum ExamType {
        VOCABULARY, GRAMMAR, LISTENING, READING,
    }
}
