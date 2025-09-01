package com.englishlearning.controller;
import com.englishlearning.model.system.Word;
import com.englishlearning.model.system.WordDefinition;
import com.englishlearning.repository.WordRepository;
import com.englishlearning.repository.WordDefinitionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.englishlearning.service.WordService;
import com.englishlearning.service.WordDefinitionService;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
import java.util.Optional;



@RestController
@RequestMapping("/api/words")
public class WordController {
     private final WordService wordService;

    public WordController(WordService wordService) {
        this.wordService = wordService;
    }

    @GetMapping
    public ResponseEntity<List<Word>> getAllWords() {
        List<Word> words = wordService.getAllWords();
        System.out.println("Words JSON: " + words);
        return ResponseEntity.ok(words);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Word> getWordById(@PathVariable Long id) {
        return wordService.getWordById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Word> createWord(@RequestBody Word word) {
        if (word.getDefinitions() != null) {
            word.getDefinitions().forEach(def -> def.setWord(word));
        }
        return ResponseEntity.ok(wordService.saveWord(word));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Word> updateWord(@PathVariable Long id, @RequestBody Word newWord) {
        try {
            if (newWord.getDefinitions() != null) {
                newWord.getDefinitions().forEach(def -> def.setWord(newWord));
            }
            Word updated = wordService.updateWord(id, newWord);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWord(@PathVariable Long id) {
        wordService.deleteWord(id);
        return ResponseEntity.noContent().build();
    }
}
