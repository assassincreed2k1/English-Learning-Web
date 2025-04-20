package com.englishlearning.service;

import com.englishlearning.model.system.Question;
import com.englishlearning.repository.QuestionRepository;

import java.util.List;

public class QuestionService {
    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    public Question updateQuestion(Long questionId, Question request) throws Exception {
        Question question = this.getQuestionById(questionId);
        question.setContent(request.getContent());
        question.setOptionA(request.getOptionA());
        question.setOptionB(request.getOptionB());
        question.setOptionC(request.getOptionC());
        question.setOptionD(request.getOptionD());
        question.setCorrectAnswer(request.getCorrectAnswer());
        question.setQuestionType(request.getQuestionType()); 
        return questionRepository.save(question);
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Question getQuestionById(Long id) throws Exception {
        Question question = questionRepository.findById(id).orElseThrow(() -> new Exception("Question not found"));
        return question;
    }

    public void deleteQuestionById(Long id) {
        questionRepository.deleteById(id);
    }
}