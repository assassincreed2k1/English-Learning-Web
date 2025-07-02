package com.englishlearning.controller;

import com.englishlearning.model.system.Exam;
import com.englishlearning.model.user.Submission;
import com.englishlearning.model.user.SubmissionAnswer;
import com.englishlearning.model.user.User;
import com.englishlearning.service.ExamService;
import com.englishlearning.service.SubmissionService;
import com.englishlearning.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ExamController {

    private final ExamService examService;

    public ExamController(ExamService examService) {
        this.examService = examService;
    }

    @PostMapping("/exams")
    public Exam create(@RequestBody Exam exam) throws Exception {
        Exam created = examService.createExam(exam);
        return exam;
    }
    @GetMapping("/exams/{examId}")
    public Exam getExamById(@PathVariable Long examId) throws Exception {
        Exam exam = examService.getExamById(examId);
        return exam;
    }
    @GetMapping("/exams")
    public List<Exam> getExams() throws Exception {
        return examService.getAllExams();
    }

}
