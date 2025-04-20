package com.englishlearning.repository;

import com.englishlearning.model.system.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamRepository extends JpaRepository<Exam, Long> {
    // Additional query methods can be defined here if needed
} 
