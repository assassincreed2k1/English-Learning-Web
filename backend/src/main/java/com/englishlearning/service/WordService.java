package com.englishlearning.service;
import org.springframework.stereotype.Service;
import com.englishlearning.repository.WordRepository;
import com.englishlearning.repository.WordDefinitionRepository;
import com.englishlearning.model.system.Word;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;



@Service
public class WordService {
    private final WordRepository wordRepository;


    public WordService(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
    }

    public List<Word> getAllWords() {
        return wordRepository.findAll();
    }

    public Optional<Word> getWordById(Long id) {
        return wordRepository.findById(id);
    }

    public Optional<Word> getWordByName(String word) {
        return wordRepository.findByWord(word);
    }

    public Word saveWord(Word word) {
        return wordRepository.save(word);
    }

    public void deleteWord(Long id) {
        wordRepository.deleteById(id);
    }

    public Word updateWord(Long id, Word request) {
        Word word = this.getWordById(id)
                .orElseThrow(() -> new RuntimeException("Word not found with id: " + id)); 

        word.setWord(request.getWord());
        word.setImageUrl(request.getImageUrl());
        word.setPhoneticUk(request.getPhoneticUk());
        word.setPhoneticUs(request.getPhoneticUs());
        word.setAudioUkPath(request.getAudioUkPath());
        word.setAudioUsPath(request.getAudioUsPath());

        return wordRepository.save(word);
    }


}
