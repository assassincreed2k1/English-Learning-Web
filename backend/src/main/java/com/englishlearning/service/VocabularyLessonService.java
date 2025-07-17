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

    public VocabularyLesson save(VocabularyLesson lesson) {
        return repository.save(lesson);
    }

    public VocabularyLesson update(Long id, VocabularyLesson lesson) {
        VocabularyLesson existing = repository.findById(id).orElseThrow();
        existing.setTitle(lesson.getTitle());
        existing.setImage(lesson.getImage());
        existing.setContent(lesson.getContent());
        existing.setExam(lesson.getExam());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
