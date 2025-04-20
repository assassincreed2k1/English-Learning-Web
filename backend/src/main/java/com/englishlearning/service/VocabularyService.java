package com.englishlearning.service;

import java.util.List;

import com.englishlearning.model.system.Vocabulary;
import com.englishlearning.repository.VocabularyRepository;

import org.springframework.stereotype.Service;

@Service
public class VocabularyService {
    private final VocabularyRepository vocabularyRepository;

    public VocabularyService(VocabularyRepository vocabularyRepository) {
        this.vocabularyRepository = vocabularyRepository;
    }

    public Vocabulary createVocabulary(Vocabulary vocabulary) {
        return vocabularyRepository.save(vocabulary);
    }

    public Vocabulary updateVocabulary(Long vocabularyId, Vocabulary request) throws Exception {
        Vocabulary vocabulary = this.getVocabularyById(vocabularyId);
        if (vocabulary == null) {
            throw new Exception("Vocabulary not found");
        }
        vocabulary.setWord(request.getWord());
        vocabulary.setMeaning(request.getMeaning());
        vocabulary.setPronunciation(request.getPronunciation());
        vocabulary.setExample(request.getExample());
        vocabulary.setType(request.getType());
        vocabulary.setLesson(request.getLesson());
        return vocabularyRepository.save(vocabulary);
    }

    public List<Vocabulary> getAllVocabularies() {
        return vocabularyRepository.findAll();
    }

    public Vocabulary getVocabularyById(Long id) {
        return vocabularyRepository.findById(id).orElse(null);
    }

    public void deleteVocabulary(Long id) {
        vocabularyRepository.deleteById(id);
    }

}
