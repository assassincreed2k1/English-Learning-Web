package com.englishlearning.dto;

import java.util.List;
import com.englishlearning.model.system.Assignment;

public class AssignmentRequest {
    private Assignment assignment;
    private List<Long> questionIds;

    public AssignmentRequest() {}

    public Assignment getAssignment() {
        return assignment;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }

    public List<Long> getQuestionIds() {
        return questionIds;
    }

    public void setQuestionIds(List<Long> questionIds) {
        this.questionIds = questionIds;
    }

    @Override
    public String toString() {
        return "AssignmentRequest{" +
                "assignment=" + assignment +
                ", questionIds=" + questionIds +
                '}';
    }
}
