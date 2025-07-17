package com.englishlearning.controller;

import com.englishlearning.model.system.VocabularyLesson;
import com.englishlearning.service.VocabularyLessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/vocabulary-lessons")
public class VocabularyLessonController {
    @Autowired
    private VocabularyLessonService vocabularyLessonService;

    @GetMapping
    public List<VocabularyLesson> getAll() {
        return vocabularyLessonService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<VocabularyLesson> getById(@PathVariable Long id) {
        return vocabularyLessonService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public VocabularyLesson create(@RequestBody VocabularyLesson lesson) {
        return vocabularyLessonService.save(lesson);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VocabularyLesson> update(@PathVariable Long id, @RequestBody VocabularyLesson lesson) {
        return ResponseEntity.ok(vocabularyLessonService.update(id, lesson));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        vocabularyLessonService.delete(id);
    }
}
