// GradualAnswer.jsx
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import systemAvatar from '../../assets/robots.png'; // Update with actual path

const GradualAnswer = ({ answer }) => {
  const [displayedAnswer, setDisplayedAnswer] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < answer.length) {
      const timer = setTimeout(() => {
        setDisplayedAnswer(displayedAnswer + answer[index]);
        setIndex(index + 1);
      }, 50); // Adjust the delay as needed
      return () => clearTimeout(timer);
    }
  }, [index, answer, displayedAnswer]);

  return (
    <div className="flex items-start mt-2 text-gray-600">
      <img src={systemAvatar} alt="System Avatar" className="w-8 h-8 mr-2 rounded-full" />
      <p className="text-lg text-left">{displayedAnswer}</p>
    </div>
  );
};

GradualAnswer.propTypes = {
  answer: PropTypes.string.isRequired,
};

export default GradualAnswer;
