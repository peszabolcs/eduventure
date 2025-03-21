import { motion } from "framer-motion";

const CareerQuestion = ({ question, onAnswer }) => {
  const handleOptionClick = (option) => {
    onAnswer(question.id, option.id, option.areas);
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <h3 className="text-xl md:text-2xl font-medium text-white mb-6">
        {question.text}
      </h3>

      <div className="space-y-4">
        {question.options.map((option) => (
          <motion.button
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleOptionClick(option)}
            className="w-full text-left p-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all duration-200 text-white border border-white/20"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 mr-3 rounded-full bg-purple-500/40 border border-purple-300/50 flex items-center justify-center">
                {option.id}
              </div>
              <span>{option.text}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default CareerQuestion;
