package com.englishlearning.repository;

import com.englishlearning.model.system.Exam;
import com.englishlearning.model.system.Exam.DifficultyLevel;
import com.englishlearning.model.system.Exam.ExamType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {
    
    // Find active exams
    List<Exam> findByIsActiveTrue();
    
    // Find by exam type
    List<Exam> findByExamType(ExamType examType);
    
    // Find by difficulty level
    List<Exam> findByDifficulty(DifficultyLevel difficulty);
    
    // Find by exam type and difficulty
    List<Exam> findByExamTypeAndDifficulty(ExamType examType, DifficultyLevel difficulty);
    
    // Find by duration range
    List<Exam> findByDurationBetween(Integer minDuration, Integer maxDuration);
    
    // Find by passing score range
    List<Exam> findByPassingScoreBetween(Integer minScore, Integer maxScore);
    
    // Find by max attempts
    List<Exam> findByMaxAttempts(Integer maxAttempts);
    
    // Search query
    @Query("""
        SELECT e FROM Exam e 
        WHERE LOWER(e.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(e.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(CAST(e.examType AS string)) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(CAST(e.difficulty AS string)) LIKE LOWER(CONCAT('%', :keyword, '%'))
    """)
    List<Exam> searchByKeyword(@Param("keyword") String keyword);
    
    // Custom queries
    @Query("SELECT e FROM Exam e WHERE e.examType = :type AND e.isActive = true")
    List<Exam> findActiveExamsByType(@Param("type") ExamType type);
    
    @Query("SELECT e FROM Exam e WHERE e.difficulty = :difficulty AND e.isActive = true")
    List<Exam> findActiveExamsByDifficulty(@Param("difficulty") DifficultyLevel difficulty);
    
    @Query("SELECT e FROM Exam e WHERE e.examType = :type AND e.difficulty = :difficulty AND e.isActive = true")
    List<Exam> findActiveExamsByTypeAndDifficulty(@Param("type") ExamType type, @Param("difficulty") DifficultyLevel difficulty);
    
    // Find exams with assignments
    @Query("SELECT e FROM Exam e WHERE SIZE(e.examAssignments) > 0")
    List<Exam> findExamsWithAssignments();
    
    // Find exams by assignment count
    @Query("SELECT e FROM Exam e WHERE SIZE(e.examAssignments) >= :minAssignments")
    List<Exam> findExamsWithMinAssignments(@Param("minAssignments") Integer minAssignments);
    
    // Count exams by type
    @Query("SELECT COUNT(e) FROM Exam e WHERE e.examType = :type")
    Long countByExamType(@Param("type") ExamType type);
    
    // Count exams by difficulty
    @Query("SELECT COUNT(e) FROM Exam e WHERE e.difficulty = :difficulty")
    Long countByDifficulty(@Param("difficulty") DifficultyLevel difficulty);
    
    // Count active exams
    @Query("SELECT COUNT(e) FROM Exam e WHERE e.isActive = true")
    Long countActiveExams();
}
