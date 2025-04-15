package com.englishlearning.model.system;


import com.englishlearning.model.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
    private String audio;
    private String image;
    private Integer duration;
    private Integer totalQuestions;
    private String contentField;

    @Enumerated(EnumType.STRING)
    private ExamType examType;

    public enum ExamType {
        VOCABULARY, GRAMMAR, LISTENING, READING,
    }

}
