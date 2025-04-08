package com.englishlearning.englishlearningapi.controller;

import com.englishlearning.englishlearningapi.model.Vocabulary;
import com.englishlearning.englishlearningapi.repository.VocabularyRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vocabularies")
public class VocabularyController {

    private final VocabularyRepository vocabularyRepository;

    public VocabularyController(VocabularyRepository vocabularyRepository) {
        this.vocabularyRepository = vocabularyRepository;
    }

    @GetMapping
    public List<Vocabulary> getAll() {
        return vocabularyRepository.findAll();
    }
}
