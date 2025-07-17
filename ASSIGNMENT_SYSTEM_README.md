# Assignment Management System

## Overview
This system provides a comprehensive solution for managing assignments (exercises) with questions in an English learning application.

## Features

### Backend (Spring Boot)
- **Assignment Model**: Full CRUD operations for assignments
- **Many-to-Many Relationships**: Assignment ↔ Question, Assignment ↔ Exam
- **Assignment Types**: Vocabulary, Grammar, Pronunciation, Listening, Reading, Mixed
- **Advanced Search**: Search assignments by content, description, or type
- **Question Management**: Associate questions with assignments

### Frontend (React)
- **Assignment Bank Page**: View all assignments with search and filter
- **Create Assignment Page**: Create new assignments with question selection
- **Assignment Detail Page**: View and edit assignment details
- **Question Selection**: Interactive interface for adding/removing questions

## API Endpoints

### Assignment Management
```
GET    /api/assignments              - Get all assignments
GET    /api/assignments/{id}         - Get assignment by ID
POST   /api/assignments              - Create new assignment
PUT    /api/assignments/{id}         - Update assignment
DELETE /api/assignments/{id}         - Delete assignment
GET    /api/assignments/search       - Search assignments
GET    /api/assignments/type/{type}  - Get assignments by type
```

### Payload Structure
```json
{
  "assignment": {
    "content": "Assignment Title",
    "description": "Assignment Description",
    "type": "READING",
    "timeLimit": 30,
    "passage": "Reading passage text...",
    "audioUrl": "https://example.com/audio.mp3"
  },
  "questionIds": [1, 2, 3, 4, 5]
}
```

## Database Schema

### assignments table
- `id` (Primary Key)
- `content` (Assignment title)
- `description` (Assignment description)
- `type` (VOCABULARY, GRAMMAR, PRONUNCIATION, LISTENING, READING, MIXED)
- `time_limit` (Time limit in minutes)
- `passage` (Reading passage for reading comprehension)
- `audio_url` (Audio URL for listening exercises)
- `quantity` (Number of questions)
- `created_date`, `modified_date`, `created_by`, `modified_by`

### assignment_questions table (Junction table)
- `assignment_id` (Foreign Key to assignments)
- `question_id` (Foreign Key to questions)

## Frontend Routes

```
/admin/exercise-bank              - Assignment bank page
/admin/exercises/create           - Create new assignment
/admin/assignments/{id}           - Assignment detail/edit page
```

## Usage Instructions

### Creating an Assignment
1. Navigate to "Ngân hàng bài tập" (Assignment Bank)
2. Click "Tạo bài tập mới" (Create New Assignment)
3. Fill in basic information (title, type, time limit, etc.)
4. Select questions from the left panel
5. Review selected questions in the right panel
6. Click "Tạo bài tập" (Create Assignment)

### Editing an Assignment
1. Go to Assignment Bank
2. Click "Xem chi tiết" (View Details) on any assignment
3. Click "Chỉnh sửa" (Edit) button
4. Modify assignment details and questions
5. Click "Cập nhật bài tập" (Update Assignment)

### Assignment Types
- **VOCABULARY**: Vocabulary exercises
- **GRAMMAR**: Grammar exercises
- **PRONUNCIATION**: Pronunciation exercises
- **LISTENING**: Listening comprehension (supports audio)
- **READING**: Reading comprehension (supports passage text)
- **MIXED**: Mixed skill exercises

## Technical Implementation

### Backend Technologies
- Spring Boot 3.x
- Spring Data JPA
- MySQL/PostgreSQL
- Lombok for boilerplate reduction

### Frontend Technologies
- React 18
- React Router for navigation
- Tailwind CSS for styling
- Fetch API for HTTP requests

### Key Components
1. **AssignmentService**: Business logic for assignment management
2. **AssignmentRepository**: Data access layer with custom queries
3. **AssignmentController**: REST API endpoints
4. **Assignment Model**: Entity with proper relationships

## Installation & Setup

1. **Database Setup**:
   ```sql
   -- Run the SQL script
   database/assignment_questions.sql
   ```

2. **Backend Setup**:
   - Ensure Question API is working
   - Add Assignment entities and repositories
   - Configure Spring Boot application

3. **Frontend Setup**:
   - Install React dependencies
   - Configure routing
   - Set up API integration

## Error Handling
- Proper validation for required fields
- User-friendly error messages
- Rollback on failed operations
- Consistent API response format

## Security
- JWT token authentication
- Authorization headers for all API calls
- Input validation and sanitization
- CORS configuration for frontend integration
