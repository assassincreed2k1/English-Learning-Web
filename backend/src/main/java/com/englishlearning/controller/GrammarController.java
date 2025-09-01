package com.englishlearning.controller;

import com.englishlearning.dto.VocabularyLessonDTO;
import com.englishlearning.model.system.GrammarLesson;
import com.englishlearning.repository.GrammarLessonRepository;
import com.englishlearning.service.GrammarLessonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping("/api/grammar-lessons")
public class GrammarController {
    private final GrammarLessonService grammarLessonService;

    public GrammarController(GrammarLessonService grammarLessonService) {
        this.grammarLessonService = grammarLessonService;
    }

    @GetMapping
    public List<GrammarLesson> getAll() {
        return grammarLessonService.getAllGrammarLessons();
    }

    @GetMapping("/{id}")
    public GrammarLesson getById(@PathVariable Long id) throws Exception {
        return grammarLessonService.getGrammarLessonById(id);
    }
}
