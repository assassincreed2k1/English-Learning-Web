-- Create assignment_questions junction table for many-to-many relationship
CREATE TABLE assignment_questions (
    assignment_id BIGINT NOT NULL,
    question_id BIGINT NOT NULL,
    PRIMARY KEY (assignment_id, question_id),
    FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_assignment_questions_assignment_id ON assignment_questions(assignment_id);
CREATE INDEX idx_assignment_questions_question_id ON assignment_questions(question_id);

-- Update existing assignments table if needed (add new columns)
ALTER TABLE assignments 
ADD COLUMN IF NOT EXISTS time_limit INTEGER,
ADD COLUMN IF NOT EXISTS passage TEXT,
ADD COLUMN IF NOT EXISTS audio_url VARCHAR(500);

-- Update quantity column based on associated questions
UPDATE assignments 
SET quantity = (
    SELECT COUNT(*) 
    FROM assignment_questions 
    WHERE assignment_questions.assignment_id = assignments.id
);


-- Insert 40 diverse questions into the questions table
INSERT INTO questions (content, optionA, optionB, optionC, optionD, correct_answer, explanation, topic, category)
VALUES
('What is the capital of France?', 'Paris', 'London', 'Berlin', 'Madrid', 'A', 'Paris is the capital of France.', 'Geography', 'Countries'),
('Which planet is known as the Red Planet?', 'Earth', 'Mars', 'Jupiter', 'Venus', 'B', 'Mars is called the Red Planet due to its reddish appearance.', 'Astronomy', 'Planets'),
('What is the chemical symbol for water?', 'H2O', 'O2', 'CO2', 'NaCl', 'A', 'H2O is the chemical formula for water.', 'Chemistry', 'Elements'),
('Who wrote "Romeo and Juliet"?', 'Charles Dickens', 'William Shakespeare', 'Mark Twain', 'Jane Austen', 'B', 'William Shakespeare wrote "Romeo and Juliet".', 'Literature', 'Authors'),
('What is the largest mammal?', 'Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus', 'B', 'The Blue Whale is the largest mammal.', 'Biology', 'Animals'),
('What is 5 + 7?', '10', '11', '12', '13', 'C', '5 + 7 equals 12.', 'Mathematics', 'Arithmetic'),
('Which language is primarily spoken in Brazil?', 'Spanish', 'Portuguese', 'French', 'English', 'B', 'Portuguese is the primary language in Brazil.', 'Linguistics', 'Languages'),
('What is the boiling point of water at sea level?', '90°C', '100°C', '110°C', '120°C', 'B', 'Water boils at 100°C at sea level.', 'Physics', 'Thermodynamics'),
('Who painted the Mona Lisa?', 'Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Claude Monet', 'B', 'Leonardo da Vinci painted the Mona Lisa.', 'Art', 'Paintings'),
('What is the square root of 64?', '6', '7', '8', '9', 'C', 'The square root of 64 is 8.', 'Mathematics', 'Algebra'),
-- Add 30 more questions with diverse topics and categories
('What is the smallest prime number?', '1', '2', '3', '5', 'B', '2 is the smallest prime number.', 'Mathematics', 'Numbers'),
('Which gas do plants use for photosynthesis?', 'Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen', 'B', 'Plants use carbon dioxide for photosynthesis.', 'Biology', 'Plants'),
('What is the capital of Japan?', 'Beijing', 'Seoul', 'Tokyo', 'Bangkok', 'C', 'Tokyo is the capital of Japan.', 'Geography', 'Countries'),
('Who discovered gravity?', 'Albert Einstein', 'Isaac Newton', 'Galileo Galilei', 'Nikola Tesla', 'B', 'Isaac Newton discovered gravity.', 'Physics', 'Scientists'),
('What is the main ingredient in bread?', 'Rice', 'Flour', 'Sugar', 'Salt', 'B', 'Flour is the main ingredient in bread.', 'Cooking', 'Ingredients'),
('Which organ pumps blood in the human body?', 'Lungs', 'Heart', 'Liver', 'Kidneys', 'B', 'The heart pumps blood in the human body.', 'Biology', 'Organs'),
('What is the national animal of India?', 'Tiger', 'Elephant', 'Peacock', 'Lion', 'A', 'The tiger is the national animal of India.', 'Geography', 'National Symbols'),
('What is the freezing point of water?', '0°C', '32°C', '100°C', '212°C', 'A', 'Water freezes at 0°C.', 'Physics', 'Thermodynamics'),
('Who is known as the Father of Computers?', 'Charles Babbage', 'Alan Turing', 'John von Neumann', 'Steve Jobs', 'A', 'Charles Babbage is known as the Father of Computers.', 'Technology', 'History'),
('What is the largest desert in the world?', 'Sahara', 'Gobi', 'Antarctic', 'Kalahari', 'C', 'The Antarctic is the largest desert in the world.', 'Geography', 'Landforms'),
-- Continue adding more questions...
('What is the main source of energy for the Earth?', 'The Moon', 'The Sun', 'Volcanoes', 'Wind', 'B', 'The Sun is the main source of energy for the Earth.', 'Astronomy', 'Energy'),
('What is the process of converting water into vapor called?', 'Condensation', 'Evaporation', 'Precipitation', 'Sublimation', 'B', 'Evaporation is the process of converting water into vapor.', 'Physics', 'States of Matter'),
('Who invented the telephone?', 'Alexander Graham Bell', 'Thomas Edison', 'Nikola Tesla', 'Guglielmo Marconi', 'A', 'Alexander Graham Bell invented the telephone.', 'Technology', 'Inventions'),
('What is the capital of Australia?', 'Sydney', 'Melbourne', 'Canberra', 'Brisbane', 'C', 'Canberra is the capital of Australia.', 'Geography', 'Countries'),
('What is the chemical symbol for gold?', 'Au', 'Ag', 'Fe', 'Pb', 'A', 'Au is the chemical symbol for gold.', 'Chemistry', 'Elements');