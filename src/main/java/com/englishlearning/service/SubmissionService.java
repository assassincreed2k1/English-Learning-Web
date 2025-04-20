package com.englishlearning.service;

import java.util.List;
import com.englishlearning.model.user.Submission;
import com.englishlearning.repository.SubmissionRepository;

public class SubmissionService {
    private final SubmissionRepository submissionRepository;

    public SubmissionService(SubmissionRepository submissionRepository) {
        this.submissionRepository = submissionRepository;
    }

    public Submission createSubmission(Submission submission) {
        return submissionRepository.save(submission);
    }

    public Submission updateSubmission(Long submissionId, Submission request) throws Exception {
        Submission submission = this.getSubmissionById(submissionId);
        submission.setScore(request.getScore());
        submission.setTotalQuestion(request.getTotalQuestion());
        submission.setRightAnswers(request.getRightAnswers());
        submission.setPercentageCorrect(request.getPercentageCorrect());
        return submissionRepository.save(submission);
    }

    public List<Submission> getAllSubmissions() {
        return submissionRepository.findAll();
    }

    public Submission getSubmissionById(Long id) throws Exception {
        Submission submission = submissionRepository.findById(id)
                .orElseThrow(() -> new Exception("Submission not found"));
        return submission;
    }

    public void deleteSubmissionById(Long id) {
        submissionRepository.deleteById(id);
    }
    
}
