package com.englishlearning.controller;

import com.englishlearning.dto.QuestionDto;
import com.englishlearning.dto.response.SubmissionDto;
import com.englishlearning.model.user.Submission;
import com.englishlearning.model.user.SubmissionAnswer;
import com.englishlearning.model.user.User;
import com.englishlearning.service.SubmissionService;
import com.englishlearning.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SubmissionController {
    private final SubmissionService submissionService;
    private final UserService userService;
    public SubmissionController(SubmissionService submissionService, UserService userService) {
        this.submissionService = submissionService;
        this.userService = userService;
    }
    @PostMapping("/exams/{examId}/submissions")
    public SubmissionDto submit(@RequestBody List<SubmissionAnswer> submissionAnswers, @PathVariable Long examId) throws Exception {
        User user = userService.getCurrentUser();
        Submission submission = submissionService.createSubmission(user.getId(), submissionAnswers, examId);
        return submissionService.toDto(submission);
    }
    @GetMapping("/exams/{examId}/submissions")
    public List<SubmissionDto> getSubmissions(@PathVariable Long examId) throws Exception {
        List<Submission> submissions = submissionService.getSubmissionsByExamId(examId);
        return submissionService.toDtos(submissions);
    }

    @GetMapping("/submissions/{submissionId}/results")
    public ResponseEntity<List<QuestionDto>> getSubmissionResults(@PathVariable Long submissionId) throws Exception {
        List<QuestionDto> results = submissionService.getResults(submissionId);
        return ResponseEntity.ok(results);
    }
    @DeleteMapping("/submissions/{id}")
    public void deleteSubmissions(@PathVariable Long id) throws Exception {
        submissionService.deleteSubmissionById(id);
    }
}
