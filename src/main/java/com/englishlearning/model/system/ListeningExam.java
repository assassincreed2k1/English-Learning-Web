package com.englishlearning.model.system;

import com.englishlearning.model.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "listeningExams")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ListeningExam extends BaseEntity {
    private String audioLink;
}
