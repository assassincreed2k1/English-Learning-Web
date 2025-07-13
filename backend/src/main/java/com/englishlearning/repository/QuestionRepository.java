package com.englishlearning.repository;

import com.englishlearning.model.system.Question;
import com.englishlearning.model.system.Question.TopicOption;
import com.englishlearning.model.system.Question.QuestionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    // Find by topic
    List<Question> findByTopic(TopicOption topic);

    // Find by question type
    List<Question> findByQuestionType(QuestionType questionType);

    // Find by topic and question type
    List<Question> findByTopicAndQuestionType(TopicOption topic, QuestionType questionType);

    // Find by points
    List<Question> findByPoints(Integer points);

    // Find questions with audio (listening)
    List<Question> findByAudioUrlIsNotNull();

    // Find questions with image (reading)
    List<Question> findByImageUrlIsNotNull();

    // Custom query to find questions by difficulty (points range)
    @Query("SELECT q FROM Question q WHERE q.points BETWEEN :minPoints AND :maxPoints")
    List<Question> findByPointsRange(@Param("minPoints") Integer minPoints, @Param("maxPoints") Integer maxPoints);

    // Find questions with explanation
    List<Question> findByExplanationIsNotNull();

    // Count questions by topic
    @Query("SELECT COUNT(q) FROM Question q WHERE q.topic = :topic")
    Long countByTopic(@Param("topic") TopicOption topic);

    // Count questions by type
    @Query("SELECT COUNT(q) FROM Question q WHERE q.questionType = :type")
    Long countByQuestionType(@Param("type") QuestionType type);
}