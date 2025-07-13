package com.englishlearning.controller;

import com.englishlearning.dto.AssignmentRequest;
import com.englishlearning.model.system.Assignment;
import com.englishlearning.service.AssignmentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/assignments")
@CrossOrigin(origins = "*")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @GetMapping
    public ResponseEntity<List<Assignment>> getAllAssignments() {
        List<Assignment> assignments = assignmentService.getAllAssignments();
        return ResponseEntity.ok(assignments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Assignment> getAssignmentById(@PathVariable Long id) {
        Optional<Assignment> assignment = assignmentService.getAssignmentById(id);
        return assignment.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Assignment> createAssignment(@RequestBody Map<String, Object> payload) {
        try {
            Assignment assignment = new ObjectMapper().convertValue(payload.get("assignment"), Assignment.class);
            List<?> rawIds = (List<?>) payload.get("questionIds");
            System.out.println("questionIds raw: " + rawIds);
            List<Long> questionIds = new java.util.ArrayList<>();
            if (rawIds != null) {
                for (Object id : rawIds) {
                    System.out.println("Type: " + id.getClass() + ", Value: " + id);
                    if (id instanceof Number) {
                        questionIds.add(((Number) id).longValue());
                    } else if (id instanceof String) {
                        questionIds.add(Long.valueOf((String) id));
                    } else {
                        throw new IllegalArgumentException("Unsupported questionId type: " + id.getClass());
                    }
                }
            }
            Assignment saved = assignmentService.createAssignment(assignment, questionIds);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Assignment> updateAssignment(@PathVariable Long id, @RequestBody Map<String, Object> payload) {
        try {
            Assignment assignment = new ObjectMapper().convertValue(payload.get("assignment"), Assignment.class);
            List<?> rawIds = (List<?>) payload.get("questionIds");
            System.out.println("questionIds raw: " + rawIds);
            List<Long> questionIds = new java.util.ArrayList<>();
            if (rawIds != null) {
                for (Object qid : rawIds) {
                    System.out.println("Type: " + qid.getClass() + ", Value: " + qid);
                    if (qid instanceof Number) {
                        questionIds.add(((Number) qid).longValue());
                    } else if (qid instanceof String) {
                        questionIds.add(Long.valueOf((String) qid));
                    } else {
                        throw new IllegalArgumentException("Unsupported questionId type: " + qid.getClass());
                    }
                }
            }
            Assignment updated = assignmentService.updateAssignment(id, assignment, questionIds);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssignment(@PathVariable Long id) {
        try {
            assignmentService.deleteAssignment(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Assignment>> getAssignmentsByType(@PathVariable Assignment.AssignmentType type) {
        List<Assignment> assignments = assignmentService.getAssignmentsByType(type);
        return ResponseEntity.ok(assignments);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Assignment>> searchAssignments(@RequestParam String keyword) {
        List<Assignment> assignments = assignmentService.searchAssignments(keyword);
        return ResponseEntity.ok(assignments);
    }
}
