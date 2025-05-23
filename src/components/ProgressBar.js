import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ currentQuestion, totalQuestions }) => {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <motion.div
      className="progress-bar-container"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.3 }}
    >
      <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
      <span className="progress-text">{currentQuestion} / {totalQuestions}</span>
    </motion.div>
  );
};

export default ProgressBar;