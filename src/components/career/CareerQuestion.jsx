import { motion } from "framer-motion";

const CareerQuestion = ({ question, onAnswer }) => {
  const handleOptionClick = (option) => {
    onAnswer(question.id, option.id, option.areas);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-8 text-center"
      >
        {question.text}
      </motion.h3>

      <div className="space-y-4">
        {question.options.map((option, index) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            onClick={() => handleOptionClick(option)}
            className="w-full text-left p-6 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-200 group"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mr-4 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-colors">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 font-medium text-lg">
                  {option.id.toUpperCase()}
                </span>
              </div>
              <p className="text-purple-100 text-lg flex-1 leading-relaxed">
                {option.text}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-8 text-center"
      >
        <p className="text-purple-300 text-sm">
          Válaszd ki azt az opciót, ami leginkább jellemző rád
        </p>
      </motion.div>
    </motion.div>
  );
};

export default CareerQuestion;
