package com.englishlearning.englishlearningapi.model.system;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "grammarExams")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GrammarExam extends Exam {

}
