package com.englishlearning.service;

import com.englishlearning.model.system.VocabularyLesson;
import com.englishlearning.repository.VocabularyLessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class VocabularyLessonService {
    @Autowired
    private VocabularyLessonRepository repository;

    public List<VocabularyLesson> getAll() {
        return repository.findAll();
    }

    public Optional<VocabularyLesson> getById(Long id) {
        return repository.findById(id);
    }

    public VocabularyLesson createVocabularyLesson(VocabularyLesson lesson) {
        if (lesson.getIsPublished() == null) {
            lesson.setIsPublished(false);
        }
        if (lesson.getViewCount() == null) {
            lesson.setViewCount(0);
        }
        return repository.save(lesson);
    }

    public VocabularyLesson update(Long id, VocabularyLesson lesson) {
        VocabularyLesson existing = repository.findById(id).orElseThrow();
        existing.setTitle(lesson.getTitle());
        existing.setDescription(lesson.getDescription());
        existing.setThumbnail(lesson.getThumbnail());
        existing.setContent(lesson.getContent());
        existing.setExamId(lesson.getExamId());
        existing.setIsPublished(lesson.getIsPublished());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public VocabularyLesson incrementViewCount(Long id) {
        VocabularyLesson lesson = repository.findById(id).orElseThrow();
        lesson.setViewCount(lesson.getViewCount() + 1);
        return repository.save(lesson);
    }
}
