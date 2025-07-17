-- 10 sample exams
INSERT INTO exams (id, title, description, image, duration, total_assignment, total_questions, passing_score, is_active, max_attempts, exam_type, difficulty) VALUES
(1, 'Beginner Vocabulary Test', 'Test your basic vocabulary.', NULL, 30, 10, 50, 60, TRUE, 3, 'VOCABULARY', 'BEGINNER'),
(2, 'Intermediate Grammar Exam', 'Grammar for intermediate learners.', NULL, 40, 12, 60, 60, TRUE, 3, 'GRAMMAR', 'INTERMEDIATE'),
(3, 'Listening Practice', 'Test your listening skills.', NULL, 35, 8, 40, 60, TRUE, 3, 'LISTENING', 'BEGINNER'),
(4, 'Reading Comprehension', 'Test your reading skills.', NULL, 45, 10, 50, 60, TRUE, 3, 'READING', 'INTERMEDIATE'),
(5, 'Advanced Vocabulary', 'Advanced vocabulary test.', NULL, 50, 15, 80, 70, TRUE, 3, 'VOCABULARY', 'ADVANCED'),
(6, 'Grammar Mastery', 'Advanced grammar exam.', NULL, 60, 15, 80, 70, TRUE, 3, 'GRAMMAR', 'ADVANCED'),
(7, 'Mock Test 1', 'Full skills mock test.', NULL, 60, 15, 80, 60, TRUE, 3, 'MOCK_TEST', 'ADVANCED'),
(8, 'Mixed Skills Test', 'Test all skills.', NULL, 55, 12, 70, 65, TRUE, 3, 'MIXED', 'INTERMEDIATE'),
(9, 'Beginner Mixed Test', 'Mixed test for beginners.', NULL, 30, 8, 40, 60, TRUE, 3, 'MIXED', 'BEGINNER'),
(10, 'Reading and Listening', 'Test reading and listening.', NULL, 50, 10, 60, 65, TRUE, 3, 'MIXED', 'INTERMEDIATE');
