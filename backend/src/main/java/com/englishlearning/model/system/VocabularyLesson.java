package com.englishlearning.model.system;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import com.englishlearning.model.BaseEntity;
@Entity
@Table(name = "vocabulary_lessons")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VocabularyLesson extends BaseEntity {
    private String title; // Tiêu đề bài học
    private String description; // Mô tả ngắn về bài học
    private String thumbnail; // Ảnh đại diện cho bài học
    
    @Column(columnDefinition = "LONGTEXT")
    private String content; // Nội dung bài học với HTML/CSS
    
    private Long examId; // ID của exam liên quan (không liên kết bảng)
    private Boolean isPublished = false; // Trạng thái xuất bản
    private Integer viewCount = 0; // Số lượt xem
}
