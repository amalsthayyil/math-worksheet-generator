import React from 'react';
import { motion } from 'framer-motion';
import { FaSyncAlt, FaDownload } from 'react-icons/fa'; // Icons

const ResultsDisplay = ({ score, totalQuestions, userAnswers, onRetry }) => {
  const percentage = (score / totalQuestions) * 100;

  const downloadReport = () => {
    let reportContent = `--- Math Worksheet Report ---\n`;
    reportContent += `Score: ${score} / ${totalQuestions} (${percentage.toFixed(2)}%)\n\n`;
    reportContent += `Detailed Answers:\n\n`;

    userAnswers.forEach((answer, index) => {
      reportContent += `Question ${index + 1}: ${answer.question}\n`;
      reportContent += `Your Answer: ${answer.userAnswer}\n`;
      // Note: You'd need to add 'correctAnswer' to userAnswers if you want to display it
      reportContent += `Correct: ${answer.correct ? 'Yes' : 'No'}\n`;
      reportContent += `Time Taken: ${answer.timeTaken.toFixed(2)} seconds\n`;
      reportContent += `Topic: ${answer.topic}\n`;
      reportContent += `Difficulty: ${answer.difficulty}\n`;
      reportContent += `Average Time To Solve (from Excel): ${answer.averageTime} seconds\n`;
      reportContent += `--------------------------\n`;
    });

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `math_worksheet_report_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      className="results-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Worksheet Completed!</h2>
      <p className="score-text">Your Score: {score} / {totalQuestions}</p>
      <p className="percentage-text">Percentage: {percentage.toFixed(2)}%</p>

      <h3>Your Answers:</h3>
      <ul className="answers-list">
        {userAnswers.map((answer, index) => (
          <li key={index} className={`answer-item ${answer.correct ? 'correct' : 'incorrect'}`}>
            <p><strong>Q{index + 1}:</strong> {answer.question}</p>
            <p>Your Answer: {answer.userAnswer} ({answer.correct ? 'Correct' : 'Incorrect'})</p>
            <p>Time Taken: {answer.timeTaken.toFixed(2)}s</p>
          </li>
        ))}
      </ul>

      <div className="results-actions">
        <motion.button
          className="retry-button"
          onClick={onRetry}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaSyncAlt className="button-icon" /> Retry Worksheet
        </motion.button>
        <motion.button
          className="download-button"
          onClick={downloadReport}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaDownload className="button-icon" /> Download Report
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ResultsDisplay;