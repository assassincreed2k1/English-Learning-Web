package com.englishlearning.service;

import java.util.List;
import com.englishlearning.model.system.VocabularyLesson;
import com.englishlearning.repository.VocabularyLessonRepository;

public class VocabularyLessonService {
    private final VocabularyLessonRepository vocabularyLessonRepository;

    public VocabularyLessonService(VocabularyLessonRepository vocabularyLessonRepository) {
        this.vocabularyLessonRepository = vocabularyLessonRepository;
    }

    public VocabularyLesson createVocabularyLesson(VocabularyLesson vocabularyLesson) {
        return vocabularyLessonRepository.save(vocabularyLesson);
    }

    public VocabularyLesson updateVocabularyLesson(Long lessonId, VocabularyLesson request) throws Exception {
        VocabularyLesson lesson = this.getVocabularyLessonById(lessonId);
        lesson.setName(request.getName());
        lesson.setImage(request.getImage());
        return vocabularyLessonRepository.save(lesson);
    }

    public List<VocabularyLesson> getAllVocabularyLessons() {
        return vocabularyLessonRepository.findAll();
    }

    public VocabularyLesson getVocabularyLessonById(Long id) throws Exception {
        VocabularyLesson lesson = vocabularyLessonRepository.findById(id)
                .orElseThrow(() -> new Exception("Vocabulary Lesson not found"));
        return lesson;
    }

    public void deleteVocabularyLessonById(Long id) {
        vocabularyLessonRepository.deleteById(id);
    }
    
}
