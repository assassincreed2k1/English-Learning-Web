package com.englishlearning.dto.response;

import com.englishlearning.model.system.Exam;
import com.englishlearning.model.user.SubmissionAnswer;
import com.englishlearning.model.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubmissionDto {
    private Long id;
    private Integer score;
    private Integer totalQuestion;
    private Integer rightAnswers;
    private Double percentageCorrect;



}
