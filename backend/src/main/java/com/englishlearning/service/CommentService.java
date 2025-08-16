package com.englishlearning.service;

import com.englishlearning.model.system.Exam;
import com.englishlearning.model.user.Comment;
import com.englishlearning.model.user.User;
import com.englishlearning.repository.CommentRepository;
import com.englishlearning.repository.ExamRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final ExamRepository examRepository;
    private final UserService userService;

    public CommentService(CommentRepository commentRepository, ExamRepository examRepository, UserService userService) {
        this.commentRepository = commentRepository;
        this.examRepository = examRepository;
        this.userService = userService;
    }
    public Comment comment(Comment comment, Long examId) {
        Exam exam = examRepository.findById(examId).orElseThrow(()->new RuntimeException("Exam not found"));
        User user = userService.getCurrentUser();
        comment.setExam(exam);
        comment.setUser(user);
        return commentRepository.save(comment);
    }
    public List<Comment> getComments(Long examId) {
        Exam exam = examRepository.findById(examId).orElseThrow(()->new RuntimeException("Exam not found"));
        return commentRepository.findByExamId(examId);
    }
}
