package com.englishlearning.repository;

import java.util.List;

import com.englishlearning.model.system.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    @Query("""
                SELECT a FROM Assignment a
                WHERE LOWER(a.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
                   OR LOWER(CAST(a.type AS string)) LIKE LOWER(CONCAT('%', :keyword, '%'))
            """)
    List<Assignment> searchByKeyword(@Param("keyword") String keyword);

}
