import React, { useState, useEffect } from 'react';
import useWorksheetData from './hooks/useWorksheetData';
import GradeTopicSelector from './components/GradeTopicSelector';
import QuestionDisplay from './components/QuestionDisplay';
import ResultsDisplay from './components/ResultsDisplay';
import ProgressBar from './components/ProgressBar';
import { motion } from 'framer-motion';
import './App.css'; // Main application styles

function App() {
  const { worksheetData, loading, error } = useWorksheetData();
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); // Stores { questionIndex, answer, timeTaken }
  const [startTime, setStartTime] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (selectedGrade && selectedTopic && worksheetData) {
      const questionsForGrade = worksheetData[selectedGrade] || [];
      const questionsForTopic = questionsForGrade.filter(q => q.topic === selectedTopic);
      setFilteredQuestions(questionsForTopic);
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
      setQuizFinished(false);
      setScore(0);
    }
  }, [selectedGrade, selectedTopic, worksheetData]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setStartTime(Date.now()); // Start timer for the first question
  };

  const handleAnswerSubmit = (answer) => {
    const timeTaken = (Date.now() - startTime) / 1000; // Time in seconds
    const currentQuestion = filteredQuestions[currentQuestionIndex];

    // Placeholder for actual answer checking (you'll need to define correct answers in your Excel or derive them)
    // For now, let's assume the correct answer is embedded or we'll mock it.
    // In a real scenario, your Excel might have an "Correct-Answer" column.
    const isCorrect = currentQuestion.question.includes(answer); // Very basic check

    setUserAnswers(prev => [
      ...prev,
      {
        question: currentQuestion.question,
        userAnswer: answer,
        correct: isCorrect,
        timeTaken: timeTaken,
        topic: currentQuestion.topic,
        difficulty: currentQuestion.difficulty,
        averageTime: currentQuestion.averageTime
      }
    ]);

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Move to the next question or finish quiz
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setStartTime(Date.now()); // Reset timer for the next question
    } else {
      setQuizFinished(true);
      setQuizStarted(false); // Quiz is over
    }
  };

  const handleRetryQuiz = () => {
    setSelectedGrade('');
    setSelectedTopic('');
    setQuizStarted(false);
    setQuizFinished(false);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
  };

  if (loading) {
    return <div className="loading-container">Loading worksheet data...</div>;
  }

  if (error) {
    return <div className="error-container">Error: {error.message}. Please check the Excel file.</div>;
  }

  const grades = worksheetData ? Object.keys(worksheetData) : [];
  const topics = selectedGrade && worksheetData[selectedGrade]
    ? [...new Set(worksheetData[selectedGrade].map(q => q.topic))]
    : [];

  return (
    <motion.div
      className="app-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="app-title">Math Worksheet Generator</h1>

      {!quizStarted && !quizFinished && (
        <GradeTopicSelector
          grades={grades}
          topics={topics}
          selectedGrade={selectedGrade}
          setSelectedGrade={setSelectedGrade}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          onStartQuiz={handleStartQuiz}
          canStartQuiz={selectedGrade && selectedTopic && filteredQuestions.length > 0}
        />
      )}

      {quizStarted && !quizFinished && filteredQuestions.length > 0 && (
        <>
          <ProgressBar
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={filteredQuestions.length}
          />
          <QuestionDisplay
            question={filteredQuestions[currentQuestionIndex].question}
            onSubmitAnswer={handleAnswerSubmit}
            key={currentQuestionIndex} // Key to force re-render when question changes
          />
        </>
      )}

      {quizFinished && (
        <ResultsDisplay
          score={score}
          totalQuestions={filteredQuestions.length}
          userAnswers={userAnswers}
          onRetry={handleRetryQuiz}
        />
      )}

      {/* Handle case where no questions are found for selected grade/topic */}
      {!quizStarted && !quizFinished && selectedGrade && selectedTopic && filteredQuestions.length === 0 && (
        <p className="no-questions-message">No questions found for the selected grade and topic. Please choose different options.</p>
      )}
    </motion.div>
  );
}

export default App;
