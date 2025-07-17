package com.englishlearning.repository;

import com.englishlearning.model.system.VocabularyLesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VocabularyLessonRepository extends JpaRepository<VocabularyLesson, Long> {
    // Custom query methods can be defined here if needed
}
