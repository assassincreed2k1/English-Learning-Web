package com.englishlearning.model.system;

import com.englishlearning.model.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "vocabularyLessons")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VocabularyLesson extends BaseEntity {
    private String name;
    private String image;
    @OneToMany(mappedBy = "lesson")
    private List<Vocabulary> vocabularies;
}
