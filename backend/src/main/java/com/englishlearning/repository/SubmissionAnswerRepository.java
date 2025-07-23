package com.englishlearning.repository;

import com.englishlearning.model.user.SubmissionAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubmissionAnswerRepository extends JpaRepository<SubmissionAnswer, Long> {
}
