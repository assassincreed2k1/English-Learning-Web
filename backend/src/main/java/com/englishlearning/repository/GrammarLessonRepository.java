package com.englishlearning.repository;

import com.englishlearning.model.system.GrammarLesson;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GrammarLessonRepository extends JpaRepository<GrammarLesson, Long> {
    // Additional query methods can be defined here if needed
}
