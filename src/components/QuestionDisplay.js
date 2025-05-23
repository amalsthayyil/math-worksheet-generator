import React, { useState } from 'react';
import { motion } from 'framer-motion';

const QuestionDisplay = ({ question, onSubmitAnswer }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmitAnswer(answer.trim());
      setAnswer(''); // Clear input for next question
    }
  };

  return (
    <motion.div
      className="question-card"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
      <h3>Question:</h3>
      <p className="question-text">{question}</p>
      <form onSubmit={handleSubmit} className="answer-form">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Your answer"
          className="answer-input"
          autoFocus
        />
        <motion.button
          type="submit"
          className="submit-answer-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit Answer
        </motion.button>
      </form>
    </motion.div>
  );
};

export default QuestionDisplay;