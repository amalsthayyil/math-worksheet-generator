import * as XLSX from 'xlsx';

/**
 * Parses the Excel file and extracts worksheet data.
 * @param {ArrayBuffer} arrayBuffer - The ArrayBuffer of the Excel file.
 * @returns {Object} An object where keys are sheet names (grades) and values are arrays of question objects.
 */
export const parseExcelFile = (arrayBuffer) => {
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  const data = {};

  workbook.SheetNames.forEach(sheetName => {
    const worksheet = workbook.Sheets[sheetName];
    // Convert sheet to JSON
    const jsonSheet = XLSX.utils.sheet_to_json(worksheet);

    // Map column names to more descriptive variable names
    const processedQuestions = jsonSheet.map(row => ({
      question: row.Question,
      topic: row.Topic,
      subTopic: row['Sub-Topic'],
      difficulty: row['Difficulty-Level'],
      averageTime: row['Average-Time-To-Solve'],
      // --- IMPORTANT CHANGE HERE ---
      // Ensure correctAnswer is converted to a string and trimmed, handling potential null/undefined
      correctAnswer: String(row['Correct-Answer'] || '').trim().toLowerCase()
    }));
    data[sheetName] = processedQuestions;
  });

  return data;
};