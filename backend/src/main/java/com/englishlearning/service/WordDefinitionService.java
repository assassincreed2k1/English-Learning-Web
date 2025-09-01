package com.englishlearning.service;
import org.springframework.stereotype.Service;
import com.englishlearning.repository.WordDefinitionRepository;
import com.englishlearning.model.system.WordDefinition;
import java.util.List;
import java.util.Optional;




@Service
public class WordDefinitionService {
    private final WordDefinitionRepository wordDefinitionRepository;

    public WordDefinitionService(WordDefinitionRepository wordDefinitionRepository) {
        this.wordDefinitionRepository = wordDefinitionRepository;
    }

    public List<WordDefinition> getAllDefinitions() {
        return wordDefinitionRepository.findAll();
    }

    public WordDefinition getDefinitionById(Long id) {
        return wordDefinitionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Definition not found with id " + id));
    }

    public List<WordDefinition> getDefinitionsByWordId(Long wordId) {
        return wordDefinitionRepository.findByWordId(wordId);
    }

    public WordDefinition saveDefinition(WordDefinition definition) {
        return wordDefinitionRepository.save(definition);
    }


    public WordDefinition updateDefinition(Long id, WordDefinition newDefinition) {
        WordDefinition wordDefinition = wordDefinitionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Definition not found with id " + id));

        wordDefinition.setWordType(newDefinition.getWordType());
        wordDefinition.setDefinition(newDefinition.getDefinition());
        wordDefinition.setExample(newDefinition.getExample());

        if (newDefinition.getWord() != null) {
            wordDefinition.setWord(newDefinition.getWord());
        }
    
        return wordDefinitionRepository.save(wordDefinition);
    }


    public void deleteDefinition(Long id) {
        wordDefinitionRepository.deleteById(id);
    }
}
