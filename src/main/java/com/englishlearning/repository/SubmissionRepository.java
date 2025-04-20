package com.englishlearning.repository;

import com.englishlearning.model.user.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    // Custom query methods can be defined here if needed
    
}
