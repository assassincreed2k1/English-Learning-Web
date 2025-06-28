package com.englishlearning.repository;

import com.englishlearning.model.user.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    // Custom query methods can be defined here if needed
    List<Submission> findByExamId(Long examId);
}
