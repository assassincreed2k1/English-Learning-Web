package com.englishlearning.service;

import java.util.List;
import com.englishlearning.model.system.Assignment;
import com.englishlearning.repository.AssignmentRepository;

import org.springframework.stereotype.Service;

@Service
public class AssignmentService {
    private final AssignmentRepository assignmentRepository;

    public AssignmentService(AssignmentRepository assignmentRepository) {
        this.assignmentRepository = assignmentRepository;
    }

    public Assignment createAssignment(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    public Assignment updateAssignment(Long assignmentId, Assignment request) throws Exception {
        Assignment assignment = this.getAssignmentById(assignmentId);
        assignment.setContent((request.getContent()));
        assignment.setDescription(request.getDescription());
        assignment.setType(request.getType());
        return assignmentRepository.save(assignment);
    }

    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    public Assignment getAssignmentById(Long id) throws Exception {
        Assignment assignment = assignmentRepository.findById(id)
                .orElseThrow(() -> new Exception("Assignment not found"));
        return assignment;
    }

    public void deleteAssignmentById(Long id) {
        assignmentRepository.deleteById(id);
    }

    public List<Assignment> searchAssignments(String keyword) {
        return assignmentRepository.searchByKeyword(keyword);
    }    

    // public List<Assignment> getAssignmentsByUserId(Long userId);     Dev when need sort by userId or LessonId
    // public List<Assignment> getAssignmentsByLessonId(Long lessonId);
    // public Page<Assignment> getAssignments(Pageable pageable) {      Dev when there are many assignments
    //     return assignmentRepository.findAll(pageable);
    // }
}
