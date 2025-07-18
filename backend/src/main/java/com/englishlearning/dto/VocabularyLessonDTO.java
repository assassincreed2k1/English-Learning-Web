package com.englishlearning.dto;

import com.englishlearning.model.system.VocabularyLesson;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class VocabularyLessonDTO {
    private Long id;
    private String title;
    private String description;
    private String thumbnail;
    private String content;
    private Long examId;
    private Boolean isPublished;
    private Integer viewCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static VocabularyLessonDTO fromEntity(VocabularyLesson lesson) {
        VocabularyLessonDTO dto = new VocabularyLessonDTO();
        dto.setId(lesson.getId());
        dto.setTitle(lesson.getTitle());
        dto.setDescription(lesson.getDescription());
        dto.setThumbnail(lesson.getThumbnail());
        dto.setContent(lesson.getContent());
        dto.setExamId(lesson.getExamId());
        dto.setIsPublished(lesson.getIsPublished());
        dto.setViewCount(lesson.getViewCount());
        return dto;
    }

    public VocabularyLesson toEntity() {
        VocabularyLesson lesson = new VocabularyLesson();
        lesson.setId(this.id);
        lesson.setTitle(this.title);
        lesson.setDescription(this.description);
        lesson.setThumbnail(this.thumbnail);
        lesson.setContent(this.content);
        lesson.setExamId(this.examId);
        lesson.setIsPublished(this.isPublished);
        lesson.setViewCount(this.viewCount);
        return lesson;
    }
}
