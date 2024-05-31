import { useState } from 'react';
import axios from 'axios';

const Ask = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/ask', {
        question: question
      });
      // console.log(response.data.answer);
      setAnswer(response.data.answer);
    } catch (error) {
      console.error('Error asking question:', error);
    }
  };

  return (
    <div>
      <h1>Ask a Question</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={question} placeholder="Enter your question" onChange={handleQuestionChange} />
        
        <button type="submit">Ask</button>
      </form>
      <p>Answer: {answer}</p>
    </div>
  );
};

export default Ask;

