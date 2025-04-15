package com.englishlearning.model.system;

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
@AllArgsConstructor
public class GrammarExam extends Exam {

}
