package com.englishlearning.englishlearningapi.repository;

import com.englishlearning.englishlearningapi.model.Vocabulary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VocabularyRepository extends JpaRepository<Vocabulary, Long> {
}
