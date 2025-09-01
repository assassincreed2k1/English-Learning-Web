package com.englishlearning.model.system;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;
import com.englishlearning.model.BaseEntity;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;




@Entity
@Table(name = "word")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Word {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String word;
    @Column(name = "imageurl")
    private String imageUrl;

    @Column(name = "phoneticuk")
    private String phoneticUk;
    @Column(name = "phoneticus")
    private String phoneticUs;

    @Column(name = "audioukpath")
    private String audioUkPath;
    @Column(name = "audiouspath")
    private String audioUsPath;

    @OneToMany(mappedBy = "word", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<WordDefinition> definitions = new ArrayList<>();


}
