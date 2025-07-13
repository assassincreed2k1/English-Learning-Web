package com.englishlearning.controller;

import com.englishlearning.model.system.Question;
import com.englishlearning.model.system.Question.TopicOption;
import com.englishlearning.model.system.Question.QuestionType;
import com.englishlearning.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "http://localhost:3000")
public class QuestionController {

    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping
    public ResponseEntity<Question> createQuestion(@RequestBody Question question) {
        try {
            Question createdQuestion = questionService.createQuestion(question);
            return ResponseEntity.ok(createdQuestion);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable Long id, @RequestBody Question question) {
        try {
            Question updatedQuestion = questionService.updateQuestion(id, question);
            return ResponseEntity.ok(updatedQuestion);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {
        List<Question> questions = questionService.getAllQuestions();
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) {
        try {
            Question question = questionService.getQuestionById(id);
            return ResponseEntity.ok(question);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestionById(@PathVariable Long id) {
        try {
            questionService.deleteQuestionById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Additional endpoints for filtering
    @GetMapping("/topic/{topic}")
    public ResponseEntity<List<Question>> getQuestionsByTopic(@PathVariable TopicOption topic) {
        List<Question> questions = questionService.getQuestionsByTopic(topic);
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Question>> getQuestionsByType(@PathVariable QuestionType type) {
        List<Question> questions = questionService.getQuestionsByType(type);
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Question>> getQuestionsByTopicAndType(
            @RequestParam(required = false) TopicOption topic,
            @RequestParam(required = false) QuestionType type) {

        if (topic != null && type != null) {
            List<Question> questions = questionService.getQuestionsByTopicAndType(topic, type);
            return ResponseEntity.ok(questions);
        } else if (topic != null) {
            List<Question> questions = questionService.getQuestionsByTopic(topic);
            return ResponseEntity.ok(questions);
        } else if (type != null) {
            List<Question> questions = questionService.getQuestionsByType(type);
            return ResponseEntity.ok(questions);
        } else {
            List<Question> questions = questionService.getAllQuestions();
            return ResponseEntity.ok(questions);
        }
    }

    @GetMapping("/points/{points}")
    public ResponseEntity<List<Question>> getQuestionsByPoints(@PathVariable Integer points) {
        List<Question> questions = questionService.getQuestionsByPoints(points);
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/listening")
    public ResponseEntity<List<Question>> getListeningQuestions() {
        List<Question> questions = questionService.getListeningQuestions();
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/reading")
    public ResponseEntity<List<Question>> getReadingQuestions() {
        List<Question> questions = questionService.getReadingQuestions();
        return ResponseEntity.ok(questions);
    }

    // Endpoint to get all available topics
    @GetMapping("/topics")
    public ResponseEntity<TopicOption[]> getAllTopics() {
        return ResponseEntity.ok(TopicOption.values());
    }

    // Endpoint to get all available question types
    @GetMapping("/types")
    public ResponseEntity<QuestionType[]> getAllQuestionTypes() {
        return ResponseEntity.ok(QuestionType.values());
    }
}