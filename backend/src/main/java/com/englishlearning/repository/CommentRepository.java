package com.englishlearning.repository;

import com.englishlearning.model.user.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByExamId(Long examId);
}
