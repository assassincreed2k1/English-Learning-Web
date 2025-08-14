# 🧠 英語学習ウェブアプリケーション

**English Learning** は、学生・教師向けの効果的な英語学習をサポートするウェブアプリです。教材管理、練習問題、試験、問題バンクを直感的なUIで提供します。

## 🚀 プロジェクト目標

- 分類された試験・練習問題で英語力を向上。
- 教師が問題・練習・試験を簡単に作成・管理。
- ユーザーフレンドリーでレスポンシブなUI。
- フロントエンド・バックエンドの明確な構造。

---

## 📚 主な機能

### 📝 ボキャブラリーレッスンシステム
- リッチテキスト（HTML/CSS、画像、動画、数式）対応のレッスン管理。
- 各レッスンは examId で試験と紐付け（テーブル結合なし、IDのみ保存）。
- レッスン詳細で「試験を受ける」リンクから関連試験ページへ遷移。
- 管理者は ReactQuill エディタでレッスン作成・編集・削除可能。
- レッスンは全てデータベースに保存、ファイルは生成しません。

### 👨‍💻 レッスン機能の使い方
- **管理者**:
  - ボキャブラリーレッスン管理画面で新規作成・編集・削除。
  - エディタでリッチな内容（画像・動画・数式）を入力。
  - 試験を紐付ける場合は examId を選択、未選択も可。
  - レッスンは公開・下書きどちらも可能。
- **ユーザー**:
  - 美しいUIでレッスン一覧を検索・閲覧。
  - 詳細ページでリッチテキスト・画像・動画を表示。
  - examId がある場合「試験を受ける」ボタンで試験ページへ。

---

## 🛠️ 使用技術

### レッスンシステム
- **ReactQuill**: レッスン内容用リッチテキストエディタ。
- **DTOパターン**: バックエンド・フロントエンド間のデータ転送、Hibernate Proxyエラー回避。
- **Exam Link**: examIdのみ保存、テーブル結合なし、拡張・保守が容易。

### バックエンド
- **Java Spring Boot**: REST API。
- **PostgreSQL**: データ保存（問題・練習・試験など）。
- **Spring Security**（必要に応じて）: 認証・権限管理。

### フロントエンド
- **ReactJS**: モダンなUI。
- **React Router**: ページ遷移。
- **TailwindCSS**: UIカスタマイズ。

---

## 🗂️ プロジェクト構成

### 📦 セットアップ & データベースマイグレーション
1. React（18以上）を使用し、ReactQuillと互換性を確保。
2. frontendディレクトリで `npm install` を実行。
3. peer dependencyエラー時はReact/ReactQuillのバージョンを確認。
4. `database/update_vocabulary_lessons.sql` を実行し、レッスンテーブルを更新。
5. Spring Boot（バックエンド）とReactJS（フロントエンド）を起動。

```bash
english-learning/
├── database/
│   └── update_vocabulary_lessons.sql         # レッスンテーブル更新用スクリプト
├── backend/                                 # Java Spring Boot
│   └── src/
│       └── main/
│           ├── java/com/example/
│           │   ├── config/                  # Spring Security, CORS設定
│           │   ├── controller/              # REST APIエンドポイント
│           │   ├── dto/                     # DTO
│           │   ├── model/                   # JPAエンティティ
│           │   ├── repository/              # JPAリポジトリ
│           │   ├── service/                 # ビジネスロジック
│           │   └── util/                    # ユーティリティ
│           └── resources/
│               └── application.properties   # Spring Boot設定
│   └── pom.xml                              # Maven設定
├── frontend/                                # ReactJS
│   ├── public/
│   ├── src/
│   │   ├── api/                             # API呼び出し
│   │   ├── assets/                          # 画像・アイコン
│   │   ├── components/                      # 共通コンポーネント
│   │   ├── pages/                           # ページ
│   │   ├── routers/                         # React Router設定
│   │   ├── services/                        # 業務処理
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   ├── index.css
│   │   ├── logo.svg
│   │   ├── App.test.js
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│   ├── package.json                         # Reactプロジェクト設定
│   ├── package-lock.json                    # 依存関係ロック
│   └── .gitignore
├── .idea/                                   # JetBrains IDE設定
├── .vscode/                                 # VS Code設定
├── docs/                                    # ドキュメント
├── scripts/                                 # 自動化スクリプト
```
