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
@Table(name = "grammarLessons")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GrammarLesson extends BaseEntity {
    private String title;
    @Column(columnDefinition = "MEDIUMTEXT")
    private String content;
    private String image;
}
