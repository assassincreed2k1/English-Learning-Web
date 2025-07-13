package com.englishlearning.repository;

import com.englishlearning.model.system.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    // Find by topic (now String)
    List<Question> findByTopic(String topic);

    // Find by category
    List<Question> findByCategory(String category);
}