import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa'; // Make sure you have react-icons installed (`npm install react-icons`)

const GradeTopicSelector = ({
  grades,
  topics,
  subTopics, // New prop: array of available sub-topics
  selectedGrade,
  setSelectedGrade,
  selectedTopic,
  setSelectedTopic,
  selectedSubTopic, // New prop: currently selected sub-topic
  setSelectedSubTopic, // New prop: function to update selected sub-topic
  onStartQuiz,
  canStartQuiz // Prop indicating if the quiz can be started
}) => {
  return (
    <motion.div
      className="selector-container"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Select Grade, Topic, and Sub-Topic</h2> {/* Updated title */}

      {/* Grade Selector */}
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

      {/* Topic Selector */}
      <div className="form-group">
        <label htmlFor="topic-select">Topic:</label>
        <select
          id="topic-select"
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="select-input"
          disabled={!selectedGrade} /* Disabled until a grade is chosen */ // <--- FIX IS HERE
        >
          <option value="">Select a Topic</option>
          {topics.map(topic => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>
      </div>

      {/* Sub-Topic Selector - NEW DROPDOWN */}
      <div className="form-group">
        <label htmlFor="subtopic-select">Sub-Topic:</label>
        <select
          id="subtopic-select"
          value={selectedSubTopic}
          onChange={(e) => setSelectedSubTopic(e.target.value)}
          className="select-input"
          disabled={!selectedTopic} /* Disabled until a topic is chosen */ // <--- FIX IS ALSO HERE
        >
          <option value="">Select a Sub-Topic</option>
          {subTopics.map(subTopic => (
            <option key={subTopic} value={subTopic}>{subTopic}</option>
          ))}
        </select>
      </div>

      {/* Start Quiz Button */}
      <motion.button
        className="start-button"
        onClick={onStartQuiz}
        disabled={!canStartQuiz} /* Button disabled until all selections are made and questions exist */ // <--- AND HERE
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaPlay className="button-icon" /> Start Worksheet
      </motion.button>
    </motion.div>
  );
};

export default GradeTopicSelector;