package com.englishlearning.model.user;

import java.util.ArrayList;
import java.util.List;

import com.englishlearning.model.BaseEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "submissions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Submission extends BaseEntity {
    private Integer score;
    private Integer totalQuestion;
    private Integer rightAnswers;
    private Double percentageCorrect;

    @OneToMany(mappedBy = "submission", cascade = CascadeType.ALL, orphanRemoval = true)
    List<SubmissionAnswer> answers = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public void calculateScoreAndPercentage() {
        if (totalQuestion == null || totalQuestion == 0) {
            this.percentageCorrect = 0.0;
            this.score = 0;
            return;
        }

        this.percentageCorrect = (rightAnswers * 100.0) / totalQuestion;
        this.score = rightAnswers;
    }

}
