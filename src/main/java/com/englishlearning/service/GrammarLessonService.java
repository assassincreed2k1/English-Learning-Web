package com.englishlearning.service;

import java.util.List;
import com.englishlearning.model.system.GrammarLesson;
import com.englishlearning.repository.GrammarLessonRepository;

public class GrammarLessonService {
    private final GrammarLessonRepository grammarLessonRepository;

    public GrammarLessonService(GrammarLessonRepository grammarLessonRepository) {
        this.grammarLessonRepository = grammarLessonRepository;
    }

    public GrammarLesson createGrammarLesson(GrammarLesson grammarLesson) {
        return grammarLessonRepository.save(grammarLesson);
    }

    public GrammarLesson updateGrammarLesson(Long lessonId, GrammarLesson request) throws Exception {
        GrammarLesson grammarLesson = this.getGrammarLessonById(lessonId);
        grammarLesson.setTitle(request.getTitle());
        grammarLesson.setContent(request.getContent());
        grammarLesson.setImage(request.getImage());
        return grammarLessonRepository.save(grammarLesson);
    }

    public List<GrammarLesson> getAllGrammarLessons() {
        return grammarLessonRepository.findAll();
    }

    public GrammarLesson getGrammarLessonById(Long id) throws Exception {
        GrammarLesson grammarLesson = grammarLessonRepository.findById(id)
                .orElseThrow(() -> new Exception("Grammar lesson not found"));
        return grammarLesson;
    }

    public void deleteGrammarLessonById(Long id) {
        grammarLessonRepository.deleteById(id);
    }
    
}
