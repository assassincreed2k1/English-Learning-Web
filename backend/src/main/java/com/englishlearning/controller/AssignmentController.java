package com.englishlearning.controller;

import java.util.List;

import com.englishlearning.model.system.Assignment;
import com.englishlearning.model.system.Assignment.AssignmentType;
import com.englishlearning.model.system.Question;
import com.englishlearning.service.AssignmentService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/assignments")
@CrossOrigin(origins = "http://localhost:3000")
public class AssignmentController {

    private final AssignmentService assignmentService;

    public AssignmentController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    @GetMapping
    public ResponseEntity<List<Assignment>> getAllAssignments() {
        return ResponseEntity.ok(assignmentService.getAllAssignments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Assignment> getAssignmentById(@PathVariable Long id) {
        try {
            Assignment assignment = assignmentService.getAssignmentById(id);
            return ResponseEntity.ok(assignment);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Assignment>> searchAssignments(@RequestParam String keyword) {
        List<Assignment> assignments = assignmentService.searchAssignments(keyword);
        return ResponseEntity.ok(assignments);
    }

    @PostMapping
    public ResponseEntity<Assignment> createAssignment(@RequestBody Assignment assignment) {
        try {
            Assignment saved = assignmentService.createAssignment(assignment);
            return ResponseEntity.ok(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Assignment> updateAssignment(@PathVariable Long id, @RequestBody Assignment assignment) {
        try {
            Assignment updated = assignmentService.updateAssignment(id, assignment);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssignment(@PathVariable Long id) {
        try {
            assignmentService.deleteAssignmentById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Filter endpoints
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Assignment>> getAssignmentsByType(@PathVariable AssignmentType type) {
        List<Assignment> assignments = assignmentService.getAssignmentsByType(type);
        return ResponseEntity.ok(assignments);
    }

    @GetMapping("/with-time-limit")
    public ResponseEntity<List<Assignment>> getAssignmentsWithTimeLimit() {
        List<Assignment> assignments = assignmentService.getAssignmentsWithTimeLimit();
        return ResponseEntity.ok(assignments);
    }

    @GetMapping("/listening")
    public ResponseEntity<List<Assignment>> getListeningAssignments() {
        List<Assignment> assignments = assignmentService.getListeningAssignments();
        return ResponseEntity.ok(assignments);
    }

    @GetMapping("/reading")
    public ResponseEntity<List<Assignment>> getReadingAssignments() {
        List<Assignment> assignments = assignmentService.getReadingAssignments();
        return ResponseEntity.ok(assignments);
    }

    @GetMapping("/time-range")
    public ResponseEntity<List<Assignment>> getAssignmentsByTimeRange(
            @RequestParam Integer minTime,
            @RequestParam Integer maxTime) {
        List<Assignment> assignments = assignmentService.getAssignmentsByTimeRange(minTime, maxTime);
        return ResponseEntity.ok(assignments);
    }

    // Assignment-Question relationship endpoints
    @PostMapping("/{assignmentId}/questions/{questionId}")
    public ResponseEntity<Assignment> addQuestionToAssignment(
            @PathVariable Long assignmentId,
            @PathVariable Long questionId) {
        try {
            Assignment assignment = assignmentService.addQuestionToAssignment(assignmentId, questionId);
            return ResponseEntity.ok(assignment);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{assignmentId}/questions/{questionId}")
    public ResponseEntity<Assignment> removeQuestionFromAssignment(
            @PathVariable Long assignmentId,
            @PathVariable Long questionId) {
        try {
            Assignment assignment = assignmentService.removeQuestionFromAssignment(assignmentId, questionId);
            return ResponseEntity.ok(assignment);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{assignmentId}/questions")
    public ResponseEntity<List<Question>> getQuestionsByAssignmentId(@PathVariable Long assignmentId) {
        try {
            List<Question> questions = assignmentService.getQuestionsByAssignmentId(assignmentId);
            return ResponseEntity.ok(questions);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Utility endpoints
    @GetMapping("/types")
    public ResponseEntity<AssignmentType[]> getAllAssignmentTypes() {
        return ResponseEntity.ok(AssignmentType.values());
    }
}
