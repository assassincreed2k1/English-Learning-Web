package com.englishlearning.repository;

import com.englishlearning.model.system.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}
