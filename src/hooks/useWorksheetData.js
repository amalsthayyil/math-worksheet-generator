import { useState, useEffect } from 'react';
import { parseExcelFile } from '../utils/dataParser';
import excelFile from '../assets/math_questions.xlsx'; // Import the Excel file

/**
 * Custom hook to load and parse the Excel worksheet data.
 * @returns {Object} An object containing the parsed data and loading status.
 */
const useWorksheetData = () => {
  const [worksheetData, setWorksheetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch the Excel file as an ArrayBuffer
        const response = await fetch(excelFile);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const parsedData = parseExcelFile(arrayBuffer);
        setWorksheetData(parsedData);
      } catch (err) {
        console.error("Error loading or parsing Excel file:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []); // Run once on component mount

  return { worksheetData, loading, error };
};

export default useWorksheetData;