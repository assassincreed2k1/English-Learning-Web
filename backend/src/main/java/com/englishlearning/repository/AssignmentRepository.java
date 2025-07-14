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

    // Basic search by keyword
    @Query("""
                SELECT a FROM Assignment a
                WHERE LOWER(a.content) LIKE LOWER(CONCAT('%', :keyword, '%'))
                   OR LOWER(a.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
                   OR LOWER(CAST(a.type AS string)) LIKE LOWER(CONCAT('%', :keyword, '%'))
            """)
    List<Assignment> searchByKeyword(@Param("keyword") String keyword);

    // Find by assignment type
    List<Assignment> findByType(AssignmentType type);
}
