import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";
import { getQuestions, searchQuestions } from "../../../api/questionApi";
import { addAssignment } from "../../../api/assignmentApi";

const CreateExercisePage = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [exerciseTitle, setExerciseTitle] = useState("");
  const [exerciseDesc, setExerciseDesc] = useState("");
  const [exerciseType, setExerciseType] = useState("READING");
  const [timeLimit, setTimeLimit] = useState("");
  const [passage, setPassage] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const data = await getQuestions();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Error loading question list!");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchQuestions = async () => {
    if (searchKeyword.trim()) {
      try {
        const data = await searchQuestions(searchKeyword);
        setQuestions(data);
      } catch (error) {
        console.error("Error searching questions:", error);
        alert("Error searching questions!");
      }
    } else {
      fetchQuestions();
    }
  };

  const handleAddQuestion = (question) => {
    if (!selectedQuestions.find((q) => q.id === question.id)) {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  const handleRemoveQuestion = (questionId) => {
    setSelectedQuestions(selectedQuestions.filter((q) => q.id !== questionId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!exerciseTitle.trim()) {
      alert("Please enter the exercise name!");
      return;
    }
    if (selectedQuestions.length === 0) {
      alert("Please select at least one question!");
      return;
    }
    try {
      await addAssignment({
        content: exerciseTitle,
        description: exerciseDesc,
        type: exerciseType,
        timeLimit: timeLimit ? Number(timeLimit) : null,
        passage: passage || null,
        audioUrl: audioUrl || null,
        questions: selectedQuestions,
        quantity: selectedQuestions.length,
      });
      alert("Exercise created successfully!");
      navigate("/admin/exercise-bank");
    } catch (error) {
      console.error("Error creating assignment:", error);
      alert("Error creating exercise!\n" + (error?.message || ""));
    }
  };

  const getCorrectAnswerText = (question) => {
    const answerMap = {
      A: question.optionA,
      B: question.optionB,
      C: question.optionC,
      D: question.optionD
    };
    return answerMap[question.correctAnswer] || "";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-100 p-8">
      <div className="text-center">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Create New Exercise</h1>
          
          {/* Basic Information Form */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exercise Name *
                  </label>
                  <input
                    type="text"
                    value={exerciseTitle}
                    onChange={(e) => setExerciseTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exercise Type
                  </label>
                  <select
                    value={exerciseType}
                    onChange={(e) => setExerciseType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="VOCABULARY">Vocabulary</option>
                    <option value="GRAMMAR">Grammar</option>
                    <option value="PRONUNCIATION">Pronunciation</option>
                    <option value="LISTENING">Listening Comprehension</option>
                    <option value="READING">Reading Comprehension</option>
                    <option value="MIXED">Mixed</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exercise Description
                  </label>
                  <textarea
                    value={exerciseDesc}
                    onChange={(e) => setExerciseDesc(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Limit (minutes)
                  </label>
                  <input
                    type="number"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                  />
                </div>
              </div>
              
              {exerciseType === "READING" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reading Passage
                  </label>
                  <textarea
                    value={passage}
                    onChange={(e) => setPassage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="5"
                  />
                </div>
              )}
              
              {exerciseType === "LISTENING" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Audio URL
                  </label>
                  <input
                    type="url"
                    value={audioUrl}
                    onChange={(e) => setAudioUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Create Exercise
              </button>
            </form>
          </div>

          {/* Questions Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Available Questions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Question List</h2>
              
              {/* Search */}
              <div className="mb-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearchQuestions()}
                />
                <button
                  onClick={handleSearchQuestions}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Search
                </button>
              </div>
              
              {/* Questions List */}
              <div className="max-h-96 overflow-y-auto">
                {questions.length === 0 ? (
                  <div className="text-center text-gray-500 py-4">
                    No questions found
                  </div>
                ) : (
                  questions.map((question) => (
                    <div key={question.id} className="border rounded-lg p-4 mb-3 flex justify-between items-center">
                      <div className="flex-1">
                        <div className="font-medium mb-2">{question.content}</div>
                        <div className="text-sm text-gray-600 mb-2">
                          <div>A. {question.optionA}</div>
                          <div>B. {question.optionB}</div>
                          <div>C. {question.optionC}</div>
                          <div>D. {question.optionD}</div>
                        </div>
                        <div className="text-sm text-green-600">
                        Answer: {question.correctAnswer}. {getCorrectAnswerText(question)}
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddQuestion(question)}
                        disabled={selectedQuestions.find((q) => q.id === question.id)}
                        className={`px-3 py-1 rounded text-sm ${
                          selectedQuestions.find((q) => q.id === question.id)
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                      >
                        {selectedQuestions.find((q) => q.id === question.id) ? "Selected" : "Add"}
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Selected Questions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">
                Selected Questions ({selectedQuestions.length})
              </h2>
              
              <div className="max-h-96 overflow-y-auto">
                {selectedQuestions.length === 0 ? (
                  <div className="text-center text-gray-500 py-4">
                  No questions selected
                  </div>
                ) : (
                  selectedQuestions.map((question, index) => (
                    <div key={question.id} className="border rounded-lg p-4 mb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-medium mb-2">
                            {index + 1}. {question.content}
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            <div>A. {question.optionA}</div>
                            <div>B. {question.optionB}</div>
                            <div>C. {question.optionC}</div>
                            <div>D. {question.optionD}</div>
                          </div>
                          <div className="text-sm text-green-600">
                          Answer: {question.correctAnswer}. {getCorrectAnswerText(question)}
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveQuestion(question.id)}
                          className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateExercisePage;
