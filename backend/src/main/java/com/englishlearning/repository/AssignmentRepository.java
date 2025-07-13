package com.englishlearning.repository;

import java.util.List;

import com.englishlearning.model.system.Assignment;
import com.englishlearning.model.system.Assignment.AssignmentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    @Query("""
                SELECT a FROM Assignment a
                WHERE LOWER(a.content) LIKE LOWER(CONCAT('%', :keyword, '%'))
                   OR LOWER(a.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
                   OR LOWER(CAST(a.type AS string)) LIKE LOWER(CONCAT('%', :keyword, '%'))
            """)
    List<Assignment> searchByKeyword(@Param("keyword") String keyword);

    // Find by assignment type
    List<Assignment> findByType(AssignmentType type);

    // Find assignments with time limit
    List<Assignment> findByTimeLimitIsNotNull();

    // Find assignments with time limit in range
    List<Assignment> findByTimeLimitBetween(Integer minTime, Integer maxTime);

    // Find listening assignments (with audio)
    List<Assignment> findByAudioUrlIsNotNull();

    // Find reading assignments (with passage)
    List<Assignment> findByPassageIsNotNull();

    // Find assignments with specific quantity range
    List<Assignment> findByQuantityBetween(Integer minQuantity, Integer maxQuantity);

    // Custom queries
    @Query("SELECT a FROM Assignment a WHERE a.type = :type AND a.timeLimit IS NOT NULL")
    List<Assignment> findByTypeWithTimeLimit(@Param("type") AssignmentType type);

    @Query("SELECT a FROM Assignment a WHERE a.type = :type AND a.timeLimit BETWEEN :minTime AND :maxTime")
    List<Assignment> findByTypeAndTimeRange(@Param("type") AssignmentType type, 
                                           @Param("minTime") Integer minTime, 
                                           @Param("maxTime") Integer maxTime);

    // Count assignments by type
    @Query("SELECT COUNT(a) FROM Assignment a WHERE a.type = :type")
    Long countByType(@Param("type") AssignmentType type);

    // Find assignments with questions
    @Query("SELECT a FROM Assignment a WHERE SIZE(a.questions) > 0")
    List<Assignment> findAssignmentsWithQuestions();

    // Find assignments by question count
    @Query("SELECT a FROM Assignment a WHERE SIZE(a.questions) >= :minQuestions")
    List<Assignment> findAssignmentsWithMinQuestions(@Param("minQuestions") Integer minQuestions);
}
