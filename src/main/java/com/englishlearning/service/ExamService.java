package com.englishlearning.service;

import java.util.List;
import com.englishlearning.model.system.Exam;
import com.englishlearning.repository.ExamRepository;

public class ExamService {
    private final ExamRepository examRepository;

    public ExamService(ExamRepository examRepository) {
        this.examRepository = examRepository;
    }

    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }

    public Exam updateExam(Long examId, Exam request) throws Exception {
        Exam exam = this.getExamById(examId);
        exam.setTitle(request.getTitle());
        exam.setImage(request.getImage());
        exam.setDuration(request.getDuration());
        exam.setExamType(request.getExamType());
        return examRepository.save(exam);
    }

    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    public Exam getExamById(Long id) throws Exception {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new Exception("Exam not found"));
        return exam;
    }

    public void deleteExamById(Long id) {
        examRepository.deleteById(id);
    }
}
