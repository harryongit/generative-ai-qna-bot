import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './index.css';  // Or './tailwind.css' if you named it differently

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI('AIzaSyCORTVv5uO9aAzRRBpNlsL7mZqXzvPnIFw');

const QuestionAnswerBot = () => {
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [evaluationResult, setEvaluationResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generateQuestion = async () => {
    if (!topic) {
      alert('Please select a topic');
      return;
    }

    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Generate a challenging, random question about ${topic} that tests comprehensive knowledge.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const generatedQuestion = response.text().trim();
      
      setQuestion(generatedQuestion);
      setEvaluationResult('');
    } catch (error) {
      console.error('Question generation error:', error);
      alert('Failed to generate question');
    } finally {
      setLoading(false);
    }
  };

  const evaluateAnswer = async () => {
    if (!question || !userAnswer) {
      alert('Please generate a question and provide an answer');
      return;
    }

    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Evaluate the following answer to the question: "${question}"

      User's Answer: "${userAnswer}"

      Provide a detailed assessment of the answer's accuracy, completeness, and relevance. Respond with:
      - "Correct" if the answer fully addresses the question
      - "Partially Correct" if the answer is incomplete or has minor inaccuracies
      - "Incorrect" if the answer is fundamentally wrong or irrelevant`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const evaluation = response.text().trim();
      
      setEvaluationResult(evaluation);
    } catch (error) {
      console.error('Answer evaluation error:', error);
      alert('Failed to evaluate answer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-black text-white rounded-lg shadow-lg mt-20">
      <h1 className="text-3xl font-semibold mb-6 text-center">Harry's QnA Bot</h1>
      
      <div className="mb-6">
        <select 
          value={topic} 
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-3 bg-gray-800 text-white rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a Topic</option>
          <option value="Geography">Geography</option>
          <option value="Health">Health</option>
          <option value="Sports">Sports</option>
        </select>
      </div>

      <button 
        onClick={generateQuestion}
        disabled={!topic || loading}
        className="w-full p-3 bg-green-500 text-white rounded-lg shadow-md disabled:opacity-50 hover:bg-green-400 transition duration-300"
      >
        {loading ? 'Generating...' : 'Generate Question'}
      </button>

      {question && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md text-gray-800">
          <p className="font-semibold text-xl">Question:</p>
          <p>{question}</p>
        </div>
      )}

      <textarea 
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Type your answer here"
        className="w-full p-4 mt-6 bg-gray-100 text-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 min-h-[120px]"
        disabled={!question}
      />

      <button 
        onClick={evaluateAnswer}
        disabled={!question || !userAnswer || loading}
        className="w-full p-3 mt-4 bg-yellow-500 text-white rounded-lg shadow-md disabled:opacity-50 hover:bg-yellow-400 transition duration-300"
      >
        {loading ? 'Evaluating...' : 'Submit Answer'}
      </button>

      {evaluationResult && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md text-gray-800">
          <p className="font-semibold text-xl">Evaluation:</p>
          <p>{evaluationResult}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionAnswerBot;
