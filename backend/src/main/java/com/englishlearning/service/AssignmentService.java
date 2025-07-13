package com.englishlearning.service;

import com.englishlearning.model.system.Assignment;
import com.englishlearning.model.system.Question;
import com.englishlearning.repository.AssignmentRepository;
import com.englishlearning.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private QuestionRepository questionRepository;

    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    public Optional<Assignment> getAssignmentById(Long id) {
        return assignmentRepository.findById(id);
    }

    public Assignment createAssignment(Assignment assignment, List<?> questionIds) {
        if (assignment.getContent() == null || assignment.getContent().trim().isEmpty()) {
            throw new IllegalArgumentException("Assignment content cannot be empty");
        }

        if (questionIds != null && !questionIds.isEmpty()) {
            System.out.println("[DEBUG] questionIds: " + questionIds);
            for (Object num : questionIds) {
                System.out.println("[DEBUG] questionId type: " + (num == null ? "null" : num.getClass().getName()) + ", value: " + num);
            }
            List<Long> idList = new java.util.ArrayList<>();
            for (Object num : questionIds) {
                if (num instanceof Number) {
                    idList.add(((Number) num).longValue());
                } else if (num instanceof String) {
                    idList.add(Long.valueOf((String) num));
                } else {
                    throw new IllegalArgumentException("Invalid question ID type: " + num.getClass());
                }
            }
            if (idList.isEmpty()) {
                assignment.setQuestions(new java.util.ArrayList<>());
                assignment.setQuantity(0);
            } else {
                List<Question> questions = idList.stream()
                        .map(id -> questionRepository.findById(id)
                                .orElseThrow(() -> new IllegalArgumentException("Question not found with id: " + id)))
                        .collect(Collectors.toList());
                assignment.setQuestions(questions);
                assignment.setQuantity(questions.size());
            }
        }

        return assignmentRepository.save(assignment);
    }

    public Assignment updateAssignment(Long assignmentId, Assignment request, List<Long> questionIds) {
        Assignment assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new IllegalArgumentException("Assignment not found with id: " + assignmentId));

        // Update basic fields
        assignment.setContent(request.getContent());
        assignment.setDescription(request.getDescription());
        assignment.setType(request.getType());
        assignment.setTimeLimit(request.getTimeLimit());
        assignment.setPassage(request.getPassage());
        assignment.setAudioUrl(request.getAudioUrl());

        // Update questions if provided
        if (questionIds != null) {
            List<Long> idList = new java.util.ArrayList<>();
            for (Object num : questionIds) {
                if (num instanceof Number) {
                    idList.add(((Number) num).longValue());
                } else if (num instanceof String) {
                    idList.add(Long.valueOf((String) num));
                } else {
                    throw new IllegalArgumentException("Invalid question ID type: " + num.getClass());
                }
            }
            if (idList.isEmpty()) {
                assignment.getQuestions().clear();
                assignment.setQuantity(0);
            } else {
                List<Question> questions = idList.stream()
                        .map(id -> questionRepository.findById(id)
                                .orElseThrow(() -> new IllegalArgumentException("Question not found with id: " + id)))
                        .collect(Collectors.toList());
                assignment.setQuestions(questions);
                assignment.setQuantity(questions.size());
            }
        }

        return assignmentRepository.save(assignment);
    }

    public void deleteAssignment(Long id) {
        Assignment assignment = assignmentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Assignment not found with id: " + id));
        assignmentRepository.delete(assignment);
    }

    public List<Assignment> getAssignmentsByType(Assignment.AssignmentType type) {
        return assignmentRepository.findByType(type);
    }

    public List<Assignment> searchAssignments(String keyword) {
        return assignmentRepository.findByContentContainingIgnoreCase(keyword);
    }
}
