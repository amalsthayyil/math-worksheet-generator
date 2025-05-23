import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa'; // Example icon

const GradeTopicSelector = ({
  grades,
  topics,
  selectedGrade,
  setSelectedGrade,
  selectedTopic,
  setSelectedTopic,
  onStartQuiz,
  canStartQuiz
}) => {
  return (
    <motion.div
      className="selector-container"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Select Grade and Topic</h2>
      <div className="form-group">
        <label htmlFor="grade-select">Grade:</label>
        <select
          id="grade-select"
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
          className="select-input"
        >
          <option value="">Select a Grade</option>
          {grades.map(grade => (
            <option key={grade} value={grade}>{grade}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="topic-select">Topic:</label>
        <select
          id="topic-select"
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="select-input"
          disabled={!selectedGrade}
        >
          <option value="">Select a Topic</option>
          {topics.map(topic => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>
      </div>

      <motion.button
        className="start-button"
        onClick={onStartQuiz}
        disabled={!canStartQuiz}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaPlay className="button-icon" /> Start Worksheet
      </motion.button>
    </motion.div>
  );
};

export default GradeTopicSelector;