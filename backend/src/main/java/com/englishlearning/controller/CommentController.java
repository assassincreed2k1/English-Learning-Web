package com.englishlearning.controller;

import com.englishlearning.model.user.Comment;
import com.englishlearning.service.CommentService;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CommentController {
    private final CommentService commentService;
    private final SimpMessagingTemplate messagingTemplate;

    public CommentController(CommentService commentService, SimpMessagingTemplate messagingTemplate) {
        this.commentService = commentService;
        this.messagingTemplate = messagingTemplate;
    }

    @PostMapping("/exams/{examId}/comments")
    public Comment createComment(@PathVariable Long examId, @RequestBody Comment request) {
        Comment comment = commentService.comment(request, examId);
        messagingTemplate.convertAndSend("/topic/exams/" + examId, comment);
        return comment;
    }
    @GetMapping("/exams/{examId}/comments")
    public List<Comment> getComments(@PathVariable Long examId) {
        List<Comment> comments = commentService.getComments(examId);
        return comments;
    }

}
