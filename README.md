# 🧠 English Learning Web Application

**English Learning** là một ứng dụng web hỗ trợ học tiếng Anh hiệu quả dành cho học sinh, sinh viên và giáo viên. Dự án cung cấp một hệ thống quản lý học liệu, bài tập, đề thi và ngân hàng câu hỏi với giao diện trực quan và dễ sử dụng.

## 🚀 Mục Tiêu Dự Án

- Hỗ trợ người học luyện tập tiếng Anh thông qua các đề thi, bài tập được phân loại rõ ràng.
- Giúp giáo viên dễ dàng tạo và quản lý câu hỏi, bài tập, đề thi.
- Tối ưu trải nghiệm người dùng với giao diện thân thiện, responsive.
- Cấu trúc frontend - backend rõ ràng, dễ bảo trì và mở rộng.

---

## 📚 Tính Năng Chính

### 👨‍🏫 Dành cho Admin
- Quản lý **Ngân hàng câu hỏi**: tạo, chỉnh sửa, xóa, phân loại theo chủ đề.
- Quản lý **Ngân hàng bài tập**: nhóm các câu hỏi thành một bài tập.
- Quản lý **Ngân hàng đề thi**: tạo đề thi từ bài tập hoặc câu hỏi.
- Quản lý **Kho học liệu**: lưu trữ và phân phối tài liệu học tập (PDF, video, v.v.).
- Giao diện dashboard quản trị rõ ràng, dễ thao tác.

### 👩‍🎓 Dành cho Học Viên
- Truy cập và làm bài tập, đề thi online.
- Xem lại kết quả và phân tích lỗi sai.
- Tải và sử dụng tài liệu học tập miễn phí.

---

## 🛠️ Công Nghệ Sử Dụng

### Backend
- **Java Spring Boot**: REST API phục vụ dữ liệu cho frontend.
- **PostgreSQL**: lưu trữ dữ liệu chính (câu hỏi, bài tập, đề thi...).
- **Spring Security** *(nếu dùng)*: xác thực và phân quyền người dùng.

### Frontend
- **ReactJS**: xây dựng giao diện người dùng động và hiện đại.
- **React Router**: định tuyến các trang frontend.
- **TailwindCSS**: tùy chỉnh giao diện.

## 🗂️ Cấu Trúc Dự Án

<br>

```bash
english-learning/
├── backend/                                 # Backend - Java Spring Boot
│   └── src/
│       └── main/
│           ├── java/com/example/
│           │   ├── config/                  # Cấu hình Spring Security, CORS, ...
│           │   ├── controller/              # REST Controller (API endpoints)
│           │   ├── dto/                     # Data Transfer Object
│           │   ├── model/                   # Entity JPA (User, Question, …)
│           │   ├── repository/              # Spring Data JPA Repositories
│           │   ├── service/                 # Business logic
│           │   └── util/                    # Các class tiện ích (Token, Convert, …)
│           └── resources/
│               └── application.properties   # File cấu hình Spring Boot
│
│   └── pom.xml                              # Cấu hình Maven
│
├── frontend/                                # Frontend - ReactJS
│   ├── node_modules/                        # Thư viện npm
│   ├── public/                              # Index HTML, favicon, …
│   ├── src/
│   │   ├── api/                             # Gọi API backend
│   │   ├── assets/                          # Hình ảnh, icon, …
│   │   ├── components/                      # Các component dùng chung
│   │   ├── pages/                           # Các trang chính
│   │   │   ├── Admin/
│   │   │   │   ├── AdminDashboard.js        # Trang quản trị dashboard
│   │   │   │   └── QuestionBank.js          # Trang ngân hàng câu hỏi
│   │   │   └── Register.js                  # Trang đăng ký
│   │   ├── routers/                         # Cấu hình route với React Router
│   │   ├── services/                        # Xử lý nghiệp vụ (Auth, Token, …)
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js                         # Điểm khởi chạy React
│   │   ├── index.css
│   │   ├── logo.svg
│   │   ├── App.test.js
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│
│   ├── package.json                         # Cấu hình project React
│   ├── package-lock.json                    # Khóa version các dependencies
│   └── .gitignore
│
├── .idea/                                   # Cấu hình cho IDE JetBrains (IntelliJ, WebStorm,…)
├── .vscode/                                 # Cấu hình cho Visual Studio Code
├── docs/                                    # Tài liệu dự án, thiết kế, mockup, … (nếu có)
├── scripts/                                 # Scripts tự động (build, deploy, test,…)
