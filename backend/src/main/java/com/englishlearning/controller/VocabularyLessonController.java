package com.englishlearning.controller;

import com.englishlearning.model.system.VocabularyLesson;
import com.englishlearning.dto.VocabularyLessonDTO;
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
    public List<VocabularyLessonDTO> getAll() {
        return vocabularyLessonService.getAll().stream().map(VocabularyLessonDTO::fromEntity).toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<VocabularyLessonDTO> getById(@PathVariable Long id) {
        return vocabularyLessonService.getById(id)
                .map(lesson -> ResponseEntity.ok(VocabularyLessonDTO.fromEntity(lesson)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public VocabularyLessonDTO create(@RequestBody VocabularyLessonDTO lessonDto) {
        VocabularyLesson lesson = lessonDto.toEntity();
        return VocabularyLessonDTO.fromEntity(vocabularyLessonService.createVocabularyLesson(lesson));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VocabularyLessonDTO> update(@PathVariable Long id, @RequestBody VocabularyLessonDTO lessonDto) {
        VocabularyLesson lesson = lessonDto.toEntity();
        return ResponseEntity.ok(VocabularyLessonDTO.fromEntity(vocabularyLessonService.update(id, lesson)));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        vocabularyLessonService.delete(id);
    }

    @PostMapping("/{id}/view")
    public VocabularyLessonDTO incrementViewCount(@PathVariable Long id) {
        return VocabularyLessonDTO.fromEntity(vocabularyLessonService.incrementViewCount(id));
    }
}
