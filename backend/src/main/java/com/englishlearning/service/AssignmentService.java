package com.englishlearning.service;

import java.util.List;
import com.englishlearning.model.system.Assignment;
import com.englishlearning.model.system.Assignment.AssignmentType;
import com.englishlearning.model.system.Question;
import com.englishlearning.repository.AssignmentRepository;
import com.englishlearning.repository.QuestionRepository;

import org.springframework.stereotype.Service;

@Service
public class AssignmentService {
    private final AssignmentRepository assignmentRepository;
    private final QuestionRepository questionRepository;

    public AssignmentService(AssignmentRepository assignmentRepository, QuestionRepository questionRepository) {
        this.assignmentRepository = assignmentRepository;
        this.questionRepository = questionRepository;
    }

    public Assignment createAssignment(Assignment assignment) {
        // Validate required fields
        if (assignment.getContent() == null || assignment.getContent().trim().isEmpty()) {
            throw new IllegalArgumentException("Assignment content cannot be empty");
        }

        // Set default values if not provided
        if (assignment.getQuantity() == null) {
            assignment.setQuantity(0);
        }

        return assignmentRepository.save(assignment);
    }

    public Assignment updateAssignment(Long assignmentId, Assignment request) throws Exception {
        Assignment assignment = this.getAssignmentById(assignmentId);

        // Update basic fields
        assignment.setContent(request.getContent());
        assignment.setDescription(request.getDescription());
        assignment.setType(request.getType());
        assignment.setQuantity(request.getQuantity());

        // Update new fields
        assignment.setTimeLimit(request.getTimeLimit());
        assignment.setPassage(request.getPassage());
        assignment.setAudioUrl(request.getAudioUrl());

        return assignmentRepository.save(assignment);
    }

    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    public Assignment getAssignmentById(Long id) throws Exception {
        return assignmentRepository.findById(id)
                .orElseThrow(() -> new Exception("Assignment not found with id: " + id));
    }

    public void deleteAssignmentById(Long id) {
        assignmentRepository.deleteById(id);
    }

    public List<Assignment> searchAssignments(String keyword) {
        return assignmentRepository.searchByKeyword(keyword);
    }

    // Additional methods for filtering
    public List<Assignment> getAssignmentsByType(AssignmentType type) {
        return assignmentRepository.findByType(type);
    }

    public List<Assignment> getAssignmentsWithTimeLimit() {
        return assignmentRepository.findByTimeLimitIsNotNull();
    }

    public List<Assignment> getListeningAssignments() {
        return assignmentRepository.findByAudioUrlIsNotNull();
    }

    public List<Assignment> getReadingAssignments() {
        return assignmentRepository.findByPassageIsNotNull();
    }

    public List<Assignment> getAssignmentsByTimeRange(Integer minTime, Integer maxTime) {
        return assignmentRepository.findByTimeLimitBetween(minTime, maxTime);
    }

    // Assignment-Question relationship methods
    public Assignment addQuestionToAssignment(Long assignmentId, Long questionId) throws Exception {
        Assignment assignment = getAssignmentById(assignmentId);
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new Exception("Question not found with id: " + questionId));

        if (!assignment.getQuestions().contains(question)) {
            assignment.getQuestions().add(question);
            assignment.setQuantity(assignment.getQuestions().size());
        }

        return assignmentRepository.save(assignment);
    }

    public Assignment removeQuestionFromAssignment(Long assignmentId, Long questionId) throws Exception {
        Assignment assignment = getAssignmentById(assignmentId);
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new Exception("Question not found with id: " + questionId));

        assignment.getQuestions().remove(question);
        assignment.setQuantity(assignment.getQuestions().size());

        return assignmentRepository.save(assignment);
    }

    public List<Question> getQuestionsByAssignmentId(Long assignmentId) throws Exception {
        Assignment assignment = getAssignmentById(assignmentId);
        return assignment.getQuestions();
    }
}