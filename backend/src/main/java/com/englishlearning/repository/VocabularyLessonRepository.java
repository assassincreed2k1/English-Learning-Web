package com.englishlearning.repository;

import com.englishlearning.model.system.VocabularyLesson;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VocabularyLessonRepository extends JpaRepository<VocabularyLesson, Long> {
    // Custom query methods can be defined here if needed
}
