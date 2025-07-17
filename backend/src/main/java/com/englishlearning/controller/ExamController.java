package com.englishlearning.controller;

import com.englishlearning.model.system.Exam;
import com.englishlearning.model.system.Exam.ExamType;
import com.englishlearning.model.system.Exam.DifficultyLevel;
import com.englishlearning.model.system.Assignment;
import com.englishlearning.service.ExamService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exams")
@CrossOrigin(origins = "http://localhost:3000")
public class ExamController {

    private final ExamService examService;

    public ExamController(ExamService examService) {
        this.examService = examService;
    }

    @PostMapping
    public ResponseEntity<Exam> createExam(@RequestBody Exam exam) {
        try {
            Exam created = examService.createExam(exam);
            return ResponseEntity.ok(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Exam> updateExam(@PathVariable Long id, @RequestBody Exam exam) {
        try {
            Exam updated = examService.updateExam(id, exam);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exam> getExamById(@PathVariable Long id) {
        try {
            Exam exam = examService.getExamById(id);
            return ResponseEntity.ok(exam);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Exam>> getAllExams() {
        List<Exam> exams = examService.getAllExams();
        return ResponseEntity.ok(exams);
    }

    @GetMapping("/active")
    public ResponseEntity<List<Exam>> getActiveExams() {
        List<Exam> exams = examService.getActiveExams();
        return ResponseEntity.ok(exams);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExam(@PathVariable Long id) {
        try {
            examService.deleteExamById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Filter endpoints
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Exam>> getExamsByType(@PathVariable ExamType type) {
        List<Exam> exams = examService.getExamsByType(type);
        return ResponseEntity.ok(exams);
    }

    @GetMapping("/difficulty/{difficulty}")
    public ResponseEntity<List<Exam>> getExamsByDifficulty(@PathVariable DifficultyLevel difficulty) {
        List<Exam> exams = examService.getExamsByDifficulty(difficulty);
        return ResponseEntity.ok(exams);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Exam>> getExamsByTypeAndDifficulty(
            @RequestParam(required = false) ExamType examType,
            @RequestParam(required = false) DifficultyLevel difficulty) {
        
        if (examType != null && difficulty != null) {
            List<Exam> exams = examService.getExamsByTypeAndDifficulty(examType, difficulty);
            return ResponseEntity.ok(exams);
        } else if (examType != null) {
            List<Exam> exams = examService.getExamsByType(examType);
            return ResponseEntity.ok(exams);
        } else if (difficulty != null) {
            List<Exam> exams = examService.getExamsByDifficulty(difficulty);
            return ResponseEntity.ok(exams);
        } else {
            List<Exam> exams = examService.getAllExams();
            return ResponseEntity.ok(exams);
        }
    }

    @GetMapping("/duration-range")
    public ResponseEntity<List<Exam>> getExamsByDurationRange(
            @RequestParam Integer minDuration,
            @RequestParam Integer maxDuration) {
        List<Exam> exams = examService.getExamsByDurationRange(minDuration, maxDuration);
        return ResponseEntity.ok(exams);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Exam>> searchExams(@RequestParam String keyword) {
        List<Exam> exams = examService.searchExams(keyword);
        return ResponseEntity.ok(exams);
    }

    // Exam-Assignment relationship endpoints
    @PostMapping("/{examId}/assignments/{assignmentId}")
    public ResponseEntity<Exam> addAssignmentToExam(
            @PathVariable Long examId,
            @PathVariable Long assignmentId) {
        try {
            Exam exam = examService.addAssignmentToExam(examId, assignmentId);
            return ResponseEntity.ok(exam);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{examId}/assignments/{assignmentId}")
    public ResponseEntity<Exam> removeAssignmentFromExam(
            @PathVariable Long examId,
            @PathVariable Long assignmentId) {
        try {
            Exam exam = examService.removeAssignmentFromExam(examId, assignmentId);
            return ResponseEntity.ok(exam);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{examId}/assignments")
    public ResponseEntity<List<Assignment>> getAssignmentsByExamId(@PathVariable Long examId) {
        try {
            List<Assignment> assignments = examService.getAssignmentsByExamId(examId);
            return ResponseEntity.ok(assignments);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Utility endpoints
    @PutMapping("/{id}/activate")
    public ResponseEntity<Exam> activateExam(@PathVariable Long id) {
        try {
            Exam exam = examService.activateExam(id);
            return ResponseEntity.ok(exam);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/deactivate")
    public ResponseEntity<Exam> deactivateExam(@PathVariable Long id) {
        try {
            Exam exam = examService.deactivateExam(id);
            return ResponseEntity.ok(exam);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/types")
    public ResponseEntity<ExamType[]> getAllExamTypes() {
        return ResponseEntity.ok(ExamType.values());
    }

    @GetMapping("/difficulties")
    public ResponseEntity<DifficultyLevel[]> getAllDifficulties() {
        return ResponseEntity.ok(DifficultyLevel.values());
    }
}
