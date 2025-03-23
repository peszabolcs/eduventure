import { motion } from "framer-motion";
import { useState } from "react";

const CareerQuestion = ({ question, onAnswer }) => {
  const [hoveredOption, setHoveredOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option.id);

    // Short delay to show visual feedback before moving to next question
    setTimeout(() => {
      onAnswer(question.id, option.id, option.areas);
      setSelectedOption(null); // Reset for next question
    }, 300);
  };

  // Option variants for animation
  const optionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.5,
      },
    }),
    tap: { scale: 0.98 },
    hover: { scale: 1.02, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)" },
    selected: {
      scale: 1.03,
      boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
      borderColor: "rgba(255, 255, 255, 0.3)",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <motion.div className="relative mb-8">
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-center"
        >
          {question.text}
        </motion.h3>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-4 rounded-full"
        />
      </motion.div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <motion.button
            key={option.id}
            custom={index}
            initial="hidden"
            animate={selectedOption === option.id ? "selected" : "visible"}
            whileHover={selectedOption ? {} : "hover"}
            whileTap={selectedOption ? {} : "tap"}
            variants={optionVariants}
            onClick={() => !selectedOption && handleOptionClick(option)}
            onMouseEnter={() => setHoveredOption(option.id)}
            onMouseLeave={() => setHoveredOption(null)}
            disabled={selectedOption !== null}
            className={`w-full text-left p-6 rounded-xl backdrop-blur-lg border transition-all duration-200 group
              ${
                selectedOption === option.id
                  ? "bg-white/15 border-white/30"
                  : hoveredOption === option.id
                  ? "bg-white/10 border-white/20"
                  : "bg-white/5 border-white/10"
              }
              ${
                selectedOption !== null && selectedOption !== option.id
                  ? "opacity-50"
                  : "opacity-100"
              }
            `}
          >
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 transition-colors
                ${
                  selectedOption === option.id
                    ? "bg-gradient-to-br from-purple-500/50 to-blue-500/50"
                    : "bg-gradient-to-br from-purple-500/20 to-blue-500/20 group-hover:from-purple-500/30 group-hover:to-blue-500/30"
                }
              `}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 font-medium text-lg">
                  {option.id.toUpperCase()}
                </span>
              </div>
              <p className="text-purple-100 text-lg flex-1 leading-relaxed">
                {option.text}
              </p>
              {selectedOption === option.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </motion.div>
              )}
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
