package com.englishlearning.englishlearningapi.model.system;


import com.englishlearning.englishlearningapi.model.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
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
    private Integer totalQuestions;

}
