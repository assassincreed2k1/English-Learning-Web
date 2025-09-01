package com.englishlearning.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.englishlearning.model.system.Word;
import com.englishlearning.model.system.WordDefinition;




public interface WordRepository extends JpaRepository<Word, Long> {
    Optional<Word> findByWord(String word);
}

