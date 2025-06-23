package com.englishlearning.model.system;


import java.util.ArrayList;
import java.util.List;

import com.englishlearning.model.BaseEntity;

import jakarta.persistence.*;
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
    private Integer totalAssignment = 0;

    @Enumerated(EnumType.STRING)
    private ExamType examType;

    @ManyToMany
    @JoinTable(
            name = "exam_assignments",
            joinColumns = @JoinColumn(name = "exam_id"),
            inverseJoinColumns = @JoinColumn(name = "assignment_id")
    )
    private List<Assignment> examAssignments = new ArrayList<>();

    public enum ExamType {
        VOCABULARY, GRAMMAR, LISTENING, READING,
    }
}
