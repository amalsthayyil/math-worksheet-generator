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
    // Convert sheet to JSON, starting from the second row (skipping headers)
    const jsonSheet = XLSX.utils.sheet_to_json(worksheet);

    // Map column names to more descriptive variable names if needed
    const processedQuestions = jsonSheet.map(row => ({
      question: row.Question,
      topic: row.Topic,
      difficulty: row['Difficulty-Level'],
      averageTime: row['Average-Time-To-Solve'],
      // Add other properties as needed
    }));
    data[sheetName] = processedQuestions;
  });

  return data;
};