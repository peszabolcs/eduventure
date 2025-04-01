import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const CareerQuestion = ({
  question,
  onAnswer,
  currentQuestion,
  totalQuestions,
}) => {
  return (
    <>
      <style jsx global>{`
        body {
          background: linear-gradient(
            to bottom right,
            #312e81,
            #581c87,
            #831843
          );
          background-attachment: fixed;
        }
      `}</style>
      <div className="min-h-screen py-8">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-purple-500/20"
          >
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-3">
                <span className="text-sm font-medium text-purple-200">
                  Kérdés {currentQuestion + 1} / {totalQuestions}
                </span>
                <span className="text-sm font-medium text-purple-200">
                  {Math.round(((currentQuestion + 1) / totalQuestions) * 100)}%
                </span>
              </div>
              <div className="w-full bg-purple-500/10 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-4">
                {question.text}
              </h2>
              <p className="text-purple-200/80 text-lg">
                Kérjük, válaszd ki azt az opciót, amelyik legjobban illik
                hozzád.
              </p>
            </div>

            {/* Answer options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option, index) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => onAnswer(option.id)}
                  className="w-full text-left p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 hover:border-purple-400 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <p className="text-white text-xl font-medium group-hover:text-purple-300 transition-colors">
                    {option.text}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CareerQuestion;
