package com.englishlearning.model.system;

import com.englishlearning.model.BaseEntity;
import com.englishlearning.model.user.SubmissionAnswer;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
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
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Question extends BaseEntity {
    private String content;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;

    @Enumerated(EnumType.STRING)
    private AnswerOption correctAnswer;

    private String explanation;
    private String topic; // Chủ đề chi tiết (ví dụ: động từ, danh từ, ngữ pháp...)
    private String category; // Phân loại lớn (ví dụ: Động vật, cây cối, sinh hoạt, công việc...)

    // Many questions can belong to many assignments
    @ManyToMany(mappedBy = "questions")
    @JsonIgnoreProperties({"questions"})
    private java.util.List<Assignment> assignments;

    // One question can have many submission answers
    @OneToMany(mappedBy = "question")
    @JsonIgnoreProperties({"question"})
    private java.util.List<SubmissionAnswer> submissionAnswers;

    public enum AnswerOption {
        A, B, C, D;
    }
}