package com.englishlearning.service;

import java.util.List;
import com.englishlearning.model.system.Exam;
import com.englishlearning.model.system.Exam.ExamType;
import com.englishlearning.model.system.Exam.DifficultyLevel;
import com.englishlearning.model.system.Assignment;
import com.englishlearning.repository.ExamRepository;
import com.englishlearning.repository.AssignmentRepository;

import org.springframework.stereotype.Service;

@Service
public class ExamService {
    private final ExamRepository examRepository;
    private final AssignmentRepository assignmentRepository;

    public ExamService(ExamRepository examRepository, AssignmentRepository assignmentRepository) {
        this.examRepository = examRepository;
        this.assignmentRepository = assignmentRepository;
    }

    public Exam createExam(Exam exam) {
        // Validate required fields
        if (exam.getTitle() == null || exam.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Exam title cannot be empty");
        }

        // Set default values if not provided
        if (exam.getTotalAssignment() == null) {
            exam.setTotalAssignment(0);
        }
        if (exam.getTotalQuestions() == null) {
            exam.setTotalQuestions(0);
        }
        if (exam.getPassingScore() == null) {
            exam.setPassingScore(60);
        }
        if (exam.getIsActive() == null) {
            exam.setIsActive(true);
        }
        if (exam.getMaxAttempts() == null) {
            exam.setMaxAttempts(3);
        }

        return examRepository.save(exam);
    }

    public Exam updateExam(Long examId, Exam request) throws Exception {
        Exam exam = this.getExamById(examId);

        // Update basic fields
        exam.setTitle(request.getTitle());
        exam.setDescription(request.getDescription());
        exam.setImage(request.getImage());
        exam.setDuration(request.getDuration());
        exam.setExamType(request.getExamType());
        exam.setDifficulty(request.getDifficulty());

        // Update new fields
        exam.setTotalAssignment(request.getTotalAssignment());
        exam.setTotalQuestions(request.getTotalQuestions());
        exam.setPassingScore(request.getPassingScore());
        exam.setIsActive(request.getIsActive());
        exam.setMaxAttempts(request.getMaxAttempts());

        return examRepository.save(exam);
    }

    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    public List<Exam> getActiveExams() {
        return examRepository.findByIsActiveTrue();
    }

    public Exam getExamById(Long id) throws Exception {
        return examRepository.findById(id)
                .orElseThrow(() -> new Exception("Exam not found with id: " + id));
    }

    public void deleteExamById(Long id) {
        examRepository.deleteById(id);
    }

    // Additional methods for filtering
    public List<Exam> getExamsByType(ExamType examType) {
        return examRepository.findByExamType(examType);
    }

    public List<Exam> getExamsByDifficulty(DifficultyLevel difficulty) {
        return examRepository.findByDifficulty(difficulty);
    }

    public List<Exam> getExamsByTypeAndDifficulty(ExamType examType, DifficultyLevel difficulty) {
        return examRepository.findByExamTypeAndDifficulty(examType, difficulty);
    }

    public List<Exam> getExamsByDurationRange(Integer minDuration, Integer maxDuration) {
        return examRepository.findByDurationBetween(minDuration, maxDuration);
    }

    public List<Exam> searchExams(String keyword) {
        return examRepository.searchByKeyword(keyword);
    }

    // Exam-Assignment relationship methods
    public Exam addAssignmentToExam(Long examId, Long assignmentId) throws Exception {
        Exam exam = getExamById(examId);
        Assignment assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new Exception("Assignment not found with id: " + assignmentId));

        if (!exam.getExamAssignments().contains(assignment)) {
            exam.getExamAssignments().add(assignment);
            exam.setTotalAssignment(exam.getExamAssignments().size());

            // Update total questions count
            int totalQuestions = exam.getExamAssignments().stream()
                    .mapToInt(a -> a.getQuantity())
                    .sum();
            exam.setTotalQuestions(totalQuestions);
        }

        return examRepository.save(exam);
    }

    public Exam removeAssignmentFromExam(Long examId, Long assignmentId) throws Exception {
        Exam exam = getExamById(examId);
        Assignment assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new Exception("Assignment not found with id: " + assignmentId));

        exam.getExamAssignments().remove(assignment);
        exam.setTotalAssignment(exam.getExamAssignments().size());

        // Update total questions count
        int totalQuestions = exam.getExamAssignments().stream()
                .mapToInt(a -> a.getQuantity())
                .sum();
        exam.setTotalQuestions(totalQuestions);

        return examRepository.save(exam);
    }

    public List<Assignment> getAssignmentsByExamId(Long examId) throws Exception {
        Exam exam = getExamById(examId);
        return exam.getExamAssignments();
    }

    // Utility methods
    public Exam activateExam(Long examId) throws Exception {
        Exam exam = getExamById(examId);
        exam.setIsActive(true);
        return examRepository.save(exam);
    }

    public Exam deactivateExam(Long examId) throws Exception {
        Exam exam = getExamById(examId);
        exam.setIsActive(false);
        return examRepository.save(exam);
    }
}