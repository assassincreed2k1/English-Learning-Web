package com.englishlearning.controller;

import java.util.List;

import com.englishlearning.model.system.Assignment;
import com.englishlearning.repository.AssignmentRepository;
import com.englishlearning.service.AssignmentService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AssignmentController {

    private final AssignmentRepository assignmentRepository;
    private final AssignmentService assignmentService;

    public AssignmentController(AssignmentService assignmentService, AssignmentRepository assignmentRepository) {
        this.assignmentService = assignmentService;
        this.assignmentRepository = assignmentRepository;
    }

    @GetMapping("/assignments/search")
    public ResponseEntity<List<Assignment>> searchAssignments(@RequestParam String keyword) {
        return ResponseEntity.ok(assignmentRepository.searchByKeyword(keyword));
    }
    
}
