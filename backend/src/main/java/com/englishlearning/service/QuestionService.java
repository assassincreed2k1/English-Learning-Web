
package com.englishlearning.service;

import com.englishlearning.model.system.Question;
// import com.englishlearning.model.system.Question.AnswerOption;
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
        if (question.getContent() == null || question.getContent().trim().isEmpty()) {
            throw new IllegalArgumentException("Question content cannot be empty");
        }
        if (question.getOptionA() == null || question.getOptionB() == null || question.getOptionC() == null || question.getOptionD() == null) {
            throw new IllegalArgumentException("All options (A-D) are required");
        }
        if (question.getCorrectAnswer() == null) {
            throw new IllegalArgumentException("Correct answer must be one of: A, B, C, D");
        }
        // No points field anymore
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
        question.setTopic(request.getTopic());
        question.setExplanation(request.getExplanation());
        question.setCategory(request.getCategory());
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

    public List<Question> getQuestionsByTopic(String topic) {
        return questionRepository.findByTopic(topic);
    }

    public List<Question> getQuestionsByCategory(String category) {
        return questionRepository.findByCategory(category);
    }

    public List<Question> searchQuestions(String keyword) {
        return questionRepository
                .findByContentContainingIgnoreCaseOrTopicContainingIgnoreCaseOrCategoryContainingIgnoreCase(
                        keyword, keyword, keyword);
    }

}