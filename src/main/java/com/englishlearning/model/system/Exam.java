package com.englishlearning.model.system;

import com.englishlearning.model.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

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
    private Integer totalQuestions;

    private String audioLink;
    @Column(columnDefinition = "TEXT")
    private String script;

    @Enumerated(EnumType.STRING)
    private ExamType examType;
    public enum ExamType {
        GRAMMAR, READING, LISTENING, VOCABULARY
    }

    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL)
    private List<Question> questions;

    @OneToMany(mappedBy = "exam")
    private List<ExamResult> examResults;
}
