// frame.jsx
import { useState } from "react";
import axios from "axios";
import GroupComponent from "./GroupComponent";
import Send from "../UI/Send";
import QAComponent from "./QAComponent";
import GradualAnswer from "./GradualAnswer";

const Frame = () => {
  const [question, setQuestion] = useState('');
  const [qaList, setQaList] = useState([]);

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newQa = { question, answer: "" };
    setQaList(prevQaList => [...prevQaList, newQa]);
    setQuestion('');
    try {
      const response = await axios.post('http://localhost:8000/ask', { question });
      const answer = response.data.answer;
      setQaList(prevQaList => {
        const updatedQaList = [...prevQaList];
        updatedQaList[updatedQaList.length - 1].answer = answer;
        return updatedQaList;
      });
    } catch (error) {
      console.error('Error asking question:', error);
    }
  };

  return (
    <div className="w-full h-screen fixed top-0 left-0 overflow-hidden">
      <div className="w-full h-full absolute bg-white hidden max-w-full" />
      <GroupComponent />
      <div className="overflow-y-auto p-4" style={{ height: "calc(100vh - 128px)" }}>
        {qaList.map((qa, index) => (
          <div key={index} className="w-full p-4 mb-4 border-b border-solid border-gainsboro-100 text-left">
            <QAComponent question={qa.question} />
            <GradualAnswer answer={qa.answer} />
          </div>
        ))}
      </div>
      <footer className="w-full fixed bottom-0 left-0 bg-gainsboro-200 box-border flex flex-row items-center justify-between py-4 pr-4 pl-4 gap-4 sm:py-6 sm:pr-8 sm:pl-8 sm:gap-6 z-10 text-left text-sm sm:text-base text-slategray font-inter border-t border-solid border-gainsboro-100">
        <form onSubmit={handleSubmit} className="flex items-center w-full gap-2">
          <input
            type="text"
            value={question}
            onChange={handleQuestionChange}
            placeholder="What Question Do you want to ask ..."
            className="flex-grow h-12 sm:h-14 px-4 rounded-lg bg-white border border-solid border-gainsboro-100 text-gray-500 text-sm sm:text-base font-inter text-left"
          />
          <button type="submit" className="cursor-pointer h-12 sm:h-14 px-4 flex items-center justify-center bg-green-700 text-white rounded-lg">
            <Send />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default Frame;
