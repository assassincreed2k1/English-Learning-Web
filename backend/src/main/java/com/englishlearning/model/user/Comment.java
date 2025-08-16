package com.englishlearning.model.user;

import com.englishlearning.model.BaseEntity;
import com.englishlearning.model.system.Exam;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "comments")
public class Comment extends BaseEntity {
    private String content;
    @ManyToOne
    private User user;
    @ManyToOne
    private Exam exam;
}
