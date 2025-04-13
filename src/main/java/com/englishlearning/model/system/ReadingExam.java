package com.englishlearning.model.system;

import com.englishlearning.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "readingExams")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReadingExam extends BaseEntity {
    @Column(columnDefinition = "MEDIUMTEXT")
    private String script;

}
