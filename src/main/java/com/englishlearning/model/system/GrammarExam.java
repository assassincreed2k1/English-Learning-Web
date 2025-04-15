package com.englishlearning.model.system;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "grammarExams")
@Getter
@Setter
public class GrammarExam extends Exam {

}
