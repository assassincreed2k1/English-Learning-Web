package com.englishlearning.englishlearningapi.model.system;

import com.englishlearning.englishlearningapi.model.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@
@Table(name = "listeningExams")Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ListeningExam extends BaseEntity {
    private String audioLink;
}
