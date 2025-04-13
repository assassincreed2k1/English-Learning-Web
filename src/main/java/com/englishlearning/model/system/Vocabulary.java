package com.englishlearning.model.system;


import com.englishlearning.model.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "vocabularies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Vocabulary extends BaseEntity {

    private String word;
    private String meaning;
    private String pronunciation;
    private String example;
    @Enumerated(EnumType.STRING)
    private Type type;
    public enum Type {
        N, V, ADJ, ADV
    }

    @ManyToOne
    @JoinColumn(name = "lesson_id")
    private VocabularyLesson lesson;

}
