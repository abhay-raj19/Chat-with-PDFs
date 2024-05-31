// QAComponent.jsx
import PropTypes from 'prop-types';
import userAvatar from '../../assets/avtar.png'; // Update with actual path

const QAComponent = ({ question }) => {
  return (
    <div className="flex items-start mb-4">
      <img src={userAvatar} alt="User Avatar" className="w-8 h-8 mr-2 rounded-full" />
      <p className="text-lg text-gray-800 font-semibold">{question}</p>
    </div>
  );
};

QAComponent.propTypes = {
  question: PropTypes.string.isRequired,
};

export default QAComponent;
