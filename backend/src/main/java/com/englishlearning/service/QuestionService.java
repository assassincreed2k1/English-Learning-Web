package com.englishlearning.service;

import com.englishlearning.model.system.Question;
import com.englishlearning.model.system.Question.TopicOption;
import com.englishlearning.model.system.Question.QuestionType;
import com.englishlearning.repository.QuestionRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Question createQuestion(Question question) {
        // Validate required fields
        if (question.getContent() == null || question.getContent().trim().isEmpty()) {
            throw new IllegalArgumentException("Question content cannot be empty");
        }

        // Set default values if not provided
        if (question.getPoints() == null) {
            question.setPoints(1);
        }

        return questionRepository.save(question);
    }

    public Question updateQuestion(Long questionId, Question request) throws Exception {
        Question question = this.getQuestionById(questionId);

        // Update basic fields
        question.setContent(request.getContent());
        question.setOptionA(request.getOptionA());
        question.setOptionB(request.getOptionB());
        question.setOptionC(request.getOptionC());
        question.setOptionD(request.getOptionD());
        question.setCorrectAnswer(request.getCorrectAnswer());
        question.setQuestionType(request.getQuestionType());

        // Update new fields
        question.setTopic(request.getTopic());
        question.setExplanation(request.getExplanation());
        question.setPoints(request.getPoints());
        question.setAudioUrl(request.getAudioUrl());
        question.setImageUrl(request.getImageUrl());

        return questionRepository.save(question);
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Question getQuestionById(Long id) throws Exception {
        return questionRepository.findById(id)
                .orElseThrow(() -> new Exception("Question not found with id: " + id));
    }

    public void deleteQuestionById(Long id) {
        questionRepository.deleteById(id);
    }

    // Additional methods for filtering
    public List<Question> getQuestionsByTopic(TopicOption topic) {
        return questionRepository.findByTopic(topic);
    }

    public List<Question> getQuestionsByType(QuestionType type) {
        return questionRepository.findByQuestionType(type);
    }

    public List<Question> getQuestionsByTopicAndType(TopicOption topic, QuestionType type) {
        return questionRepository.findByTopicAndQuestionType(topic, type);
    }

    public List<Question> getQuestionsByPoints(Integer points) {
        return questionRepository.findByPoints(points);
    }

    public List<Question> getListeningQuestions() {
        return questionRepository.findByAudioUrlIsNotNull();
    }

    public List<Question> getReadingQuestions() {
        return questionRepository.findByImageUrlIsNotNull();
    }
}