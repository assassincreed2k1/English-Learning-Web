package com.englishlearning.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.englishlearning.model.system.WordDefinition;
import com.englishlearning.model.system.Word;
import java.util.Optional;
import java.util.List;





public interface WordDefinitionRepository extends JpaRepository<WordDefinition, Long> {
    List<WordDefinition> findByWordId(Long wordId);
}
