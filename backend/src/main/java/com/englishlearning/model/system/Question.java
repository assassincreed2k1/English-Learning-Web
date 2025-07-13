package com.englishlearning.model.system;

import java.util.ArrayList;
import java.util.List;

import com.englishlearning.model.BaseEntity;
import com.englishlearning.model.system.Question.TopicOption;
import com.englishlearning.model.user.SubmissionAnswer;

import jakarta.persistence.EnumType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;

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
public class Question extends BaseEntity {

    private String content;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    
    // Thêm explanation cho đáp án
    private String explanation;
    
    // Thêm độ khó (points/score)
    private Integer points = 1;
    
    // Có thể thêm audio/image cho listening/reading
    private String audioUrl;
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private AnswerOption correctAnswer;

    @Enumerated(EnumType.STRING)
    private QuestionType questionType;
    
    // Thay đổi enum Topic để phù hợp hơn
    @Enumerated(EnumType.STRING)
    private TopicOption topic;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    List<SubmissionAnswer> submissionAnswers = new ArrayList<>();

    public enum TopicOption {
        VOCABULARY, GRAMMAR, PRONUNCIATION, LISTENING, READING_COMPREHENSION,
        TENSES, PREPOSITIONS, PHRASAL_VERBS, IDIOMS, BUSINESS_ENGLISH
    }

    public enum AnswerOption {
        A, B, C, D
    }

    public enum QuestionType {
        CHOICE_QUESTION,    
        TF_QUESTION,        
        FILL_BLANK,         
        LISTENING,          
        READING          
    }
}