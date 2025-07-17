-- Run all data insert scripts
\i './truncate_all.sql'
\i './questions.sql'
\i './assignments.sql'
\i './exams.sql'
\i './vocabulary_lessons.sql'
\i './assignment_questions.sql'
\i './exam_assignments.sql'

-- Đồng bộ sequence cho các bảng có id tự tăng (PostgreSQL)
SELECT setval('questions_id_seq', (SELECT COALESCE(MAX(id), 1) FROM questions));
SELECT setval('assignments_id_seq', (SELECT COALESCE(MAX(id), 1) FROM assignments));
SELECT setval('exams_id_seq', (SELECT COALESCE(MAX(id), 1) FROM exams));