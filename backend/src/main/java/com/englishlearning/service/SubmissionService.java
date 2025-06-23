package com.englishlearning.service;

import java.util.List;

import com.englishlearning.model.system.Assignment;
import com.englishlearning.model.system.Exam;
import com.englishlearning.model.system.Question;
import com.englishlearning.model.user.Submission;
import com.englishlearning.model.user.SubmissionAnswer;
import com.englishlearning.model.user.User;
import com.englishlearning.repository.ExamRepository;
import com.englishlearning.repository.SubmissionRepository;

import org.springframework.stereotype.Service;

@Service
public class SubmissionService {
    private final SubmissionRepository submissionRepository;
    private final UserService userService;
    private final ExamRepository examRepository;
    private final QuestionService questionService;

    public SubmissionService(SubmissionRepository submissionRepository, UserService userService, ExamRepository examRepository, QuestionService questionService) {
        this.userService = userService;
        this.submissionRepository = submissionRepository;
        this.examRepository = examRepository;
        this.questionService = questionService;
    }

    public Submission createSubmission(Long userId, List<SubmissionAnswer> submissionAnswers, Long examId) throws Exception {
        Exam exam = examRepository.findById(examId).orElseThrow(() -> new Exception("Exam not found"));
        User user = userService.getUserById(userId);
        List<Assignment> assignments = exam.getExamAssignments();
        int numberQuestion = 0;
        // tinh tong so cau hoi
        for(Assignment assignment : assignments) {
            numberQuestion += assignment.getQuestions().size();
        }
        Submission submission = new Submission();
        int numberCorrect=0;
        for(SubmissionAnswer submissionAnswer : submissionAnswers) {
            Question question = submissionAnswer.getQuestion();
            if(submissionAnswer.getAnswerOption().equals(question.getCorrectAnswer())){
                numberCorrect++;
            }
        }
        submission.setUser(user);
        Integer x = 100/numberQuestion;//so diem moi cau, 100/50=2
        Integer score = numberCorrect * x;// 20 cau , moi cau 5 diem.Dung = 100
        submission.setScore(score);
        submission.setRightAnswers(numberCorrect);
        submission.setPercentageCorrect(numberCorrect*100.0 / numberQuestion);
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
