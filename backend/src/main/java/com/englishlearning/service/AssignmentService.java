package com.englishlearning.service;

import com.englishlearning.model.system.Assignment;
import com.englishlearning.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AssignmentService {
    
    @Autowired
    private AssignmentRepository assignmentRepository;

    public Assignment createAssignment(Assignment assignment) {
        // Validate input
        if (assignment.getContent() == null || assignment.getContent().trim().isEmpty()) {
            throw new IllegalArgumentException("Assignment content cannot be empty");
        }
        
        // Set quantity based on questions
        if (assignment.getQuestions() != null) {
            assignment.setQuantity(assignment.getQuestions().size());
        } else {
            assignment.setQuantity(0);
        }
        
        return assignmentRepository.save(assignment);
    }

    public Assignment updateAssignment(Long id, Assignment assignment) {
        Assignment existing = assignmentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Assignment not found with id: " + id));
        
        // Update basic fields
        existing.setContent(assignment.getContent());
        existing.setDescription(assignment.getDescription());
        existing.setType(assignment.getType());
        existing.setTimeLimit(assignment.getTimeLimit());
        existing.setPassage(assignment.getPassage());
        existing.setAudioUrl(assignment.getAudioUrl());
        
        // Update questions if provided
        if (assignment.getQuestions() != null) {
            existing.setQuestions(assignment.getQuestions());
            existing.setQuantity(assignment.getQuestions().size());
        }
        
        return assignmentRepository.save(existing);
    }

    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    public Assignment getAssignmentById(Long id) {
        return assignmentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Assignment not found with id: " + id));
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
        return assignmentRepository.searchByKeyword(keyword);
    }
}
