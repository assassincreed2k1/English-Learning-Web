-- Update vocabulary_lessons table schema
-- Run this to update the existing table structure

-- Add new columns if they don't exist
ALTER TABLE vocabulary_lessons 
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS thumbnail VARCHAR(255),
ADD COLUMN IF NOT EXISTS exam_id BIGINT,
ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS view_count INT DEFAULT 0;

-- Update content column to LONGTEXT for rich content
ALTER TABLE vocabulary_lessons 
MODIFY COLUMN content LONGTEXT;

-- Remove foreign key constraint if exists (since we're using examId as simple field)
-- ALTER TABLE vocabulary_lessons DROP FOREIGN KEY fk_vocabulary_lesson_exam;

-- Update existing records to have default values
UPDATE vocabulary_lessons 
SET 
    is_published = COALESCE(is_published, FALSE),
    view_count = COALESCE(view_count, 0)
WHERE is_published IS NULL OR view_count IS NULL;

-- Show current table structure
DESCRIBE vocabulary_lessons;
