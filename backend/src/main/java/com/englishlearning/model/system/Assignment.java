package com.englishlearning.model.system;

import java.util.List;
import java.util.ArrayList;

import com.englishlearning.model.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

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
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Assignment extends BaseEntity {
    private String content; // Tên bài tập
    private String description; // Mô tả bài tập
    private Integer quantity = 0;

    // Thêm thời gian làm bài cho assignment
    private Integer timeLimit; // phút

    // Thêm passage cho reading comprehension
    private String passage;

    // Thêm audio URL cho listening
    private String audioUrl;

    @Enumerated(EnumType.STRING)
    private AssignmentType type;

    @ManyToMany
    @JoinTable(name = "assignment_questions", joinColumns = @JoinColumn(name = "assignment_id"), inverseJoinColumns = @JoinColumn(name = "question_id"))
    @JsonIgnoreProperties({"assignments"})
    private List<Question> questions = new ArrayList<>();

    // Many assignments can belong to many exams
    @ManyToMany(mappedBy = "examAssignments")
    @JsonIgnoreProperties({"examAssignments"})
    private List<Exam> exams = new ArrayList<>();

    public enum AssignmentType {
        VOCABULARY("Vocabulary Exercise"),
        GRAMMAR("Grammar Exercise"),
        PRONUNCIATION("Pronunciation Exercise"),
        LISTENING("Listening Comprehension"),
        READING("Reading Comprehension"),
        MIXED("Mixed Exercise");

        private final String displayName;

        AssignmentType(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }
}