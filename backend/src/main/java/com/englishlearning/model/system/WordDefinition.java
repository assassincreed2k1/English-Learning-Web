package com.englishlearning.model.system;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.englishlearning.model.BaseEntity;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;






@Entity
@Table(name = "worddefinition")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WordDefinition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "wordtype")
    private String wordType;

    @Column(columnDefinition = "TEXT")
    private String definition;

    @Column(columnDefinition = "TEXT")
    private String example;

    @Column(name = "vndefinition", columnDefinition = "TEXT")
    private String vnDefinition;

    @Column(name = "vnexample", columnDefinition = "TEXT")
    private String vnExample;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "word_id")
    @JsonBackReference
    private Word word;
}
