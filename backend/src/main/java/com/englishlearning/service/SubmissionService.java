package com.englishlearning.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.englishlearning.dto.QuestionDto;
import com.englishlearning.dto.response.SubmissionDto;
import com.englishlearning.model.system.Assignment;
import com.englishlearning.model.system.Exam;
import com.englishlearning.model.system.Question;
import com.englishlearning.model.user.Submission;
import com.englishlearning.model.user.SubmissionAnswer;
import com.englishlearning.model.user.User;
import com.englishlearning.repository.ExamRepository;
import com.englishlearning.repository.SubmissionAnswerRepository;
import com.englishlearning.repository.SubmissionRepository;

import org.springframework.stereotype.Service;

@Service
public class SubmissionService {
    private final SubmissionRepository submissionRepository;
    private final UserService userService;
    private final ExamRepository examRepository;
    private final QuestionService questionService;
    private final SubmissionAnswerRepository submissionAnswerRepository;

    public SubmissionService(SubmissionRepository submissionRepository, UserService userService, ExamRepository examRepository, QuestionService questionService, SubmissionAnswerRepository submissionAnswerRepository) {
        this.userService = userService;
        this.submissionRepository = submissionRepository;
        this.examRepository = examRepository;
        this.questionService = questionService;
        this.submissionAnswerRepository = submissionAnswerRepository;
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
            Long questionId = submissionAnswer.getQuestion().getId();
            Question question = questionService.getQuestionById(questionId);
            String userAnswer = submissionAnswer.getAnswer();
            // Compare user's answer (string) with correctAnswer enum name
            if(userAnswer != null && question.getCorrectAnswer() != null && userAnswer.trim().equalsIgnoreCase(question.getCorrectAnswer().name())){
                numberCorrect++;
            }
            submissionAnswer.setSubmission(submission);
            submissionAnswer.setQuestion(question);
        }
        submission.setAnswers(submissionAnswers);
        submission.setUser(user);
        Integer x = 100/numberQuestion;//so diem moi cau, 100/50=2
        Integer score = numberCorrect * x;// 20 cau , moi cau 5 diem.Dung = 100
        submission.setScore(score);
        submission.setRightAnswers(numberCorrect);
        submission.setPercentageCorrect(numberCorrect*100.0 / numberQuestion);
        submission.setTotalQuestion(numberQuestion);
        submission.setExam(exam);
        submission = submissionRepository.save(submission);
        return submission;
    }
    public List<QuestionDto> getResults(Long submissionId) throws Exception {
        Submission submission = submissionRepository.findById(submissionId).orElseThrow(() -> new Exception("Submission not found"));
        List<QuestionDto> res = new ArrayList<>();
        for(SubmissionAnswer submissionAnswer : submission.getAnswers()) {
            Question q = submissionAnswer.getQuestion();
            Question.AnswerOption correct = q.getCorrectAnswer();
            boolean isCorrect = correct.name().equals(submissionAnswer.getAnswer());
            QuestionDto questionDto = new QuestionDto();
            questionDto.setCorrect(isCorrect);
            questionDto.setContent(q.getContent());
            questionDto.setExplanation(q.getExplanation());
            questionDto.setOptionB(q.getOptionB());
            questionDto.setOptionA(q.getOptionA());
            questionDto.setOptionC(q.getOptionC());
            questionDto.setOptionD(q.getOptionD());
            questionDto.setCorrectAnswer(correct.name());
            questionDto.setQuestionId(q.getId());
            questionDto.setUserAnswer(submissionAnswer.getAnswer());
            res.add(questionDto);
        }
        return res;
    }
    public SubmissionDto toDto(Submission submission){
        SubmissionDto dto = new SubmissionDto();
        dto.setId(submission.getId());
        dto.setScore(submission.getScore());
        dto.setPercentageCorrect(submission.getPercentageCorrect());
        dto.setTotalQuestion(submission.getTotalQuestion());
        dto.setRightAnswers(submission.getRightAnswers());
        return dto;
    }
    public List<SubmissionDto> toDtos(List<Submission> submissions){
        return submissions.stream().map(s->toDto(s)).collect(Collectors.toList());
    }

    public Submission updateSubmission(Long submissionId, Submission request) throws Exception {
        Submission submission = this.getSubmissionById(submissionId);
        submission.setScore(request.getScore());
        submission.setTotalQuestion(request.getTotalQuestion());
        submission.setRightAnswers(request.getRightAnswers());
        submission.setPercentageCorrect(request.getPercentageCorrect());
        return submissionRepository.save(submission);
    }


    public List<Submission> getSubmissionsByExamId(Long examId){
        return submissionRepository.findByExamId(examId);
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
