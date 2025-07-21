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
    private String description;
    private String image;
    private Integer duration; // phút
    private Integer totalAssignment = 0;

    // Thêm các thuộc tính quan trọng
    private Integer totalQuestions = 0;
    private Integer passingScore = 60; // điểm tối thiểu để pass
    private Boolean isActive = true;
    private Integer maxAttempts = 3; // số lần làm tối đa

    @Enumerated(EnumType.STRING)
    private ExamType examType;

    @Enumerated(EnumType.STRING)
    private DifficultyLevel difficulty;

    @ManyToMany
    @JoinTable(name = "exam_assignments", joinColumns = @JoinColumn(name = "exam_id"), inverseJoinColumns = @JoinColumn(name = "assignment_id"))
    private List<Assignment> examAssignments = new ArrayList<>();

    public enum ExamType {
        VOCABULARY("Vocabulary Test"),
        GRAMMAR("Grammar Test"),
        LISTENING("Listening Test"),
        READING("Reading Test"),
        MIXED("Mixed Skills Test"),
        MOCK_TEST("Mock Test");

        private final String displayName;

        ExamType(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }

    public enum DifficultyLevel {
        BEGINNER, INTERMEDIATE, ADVANCED
    }
}
