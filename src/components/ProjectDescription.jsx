"use client";

import { motion } from "framer-motion";
import { Lightbulb, Users, Building, Sprout } from "lucide-react";

const features = [
  {
    icon: Lightbulb,
    title: "Szakértői Tanácsadás",
    description:
      "Tapasztalt szakemberek osztják meg tudásukat és tapasztalataikat.",
  },
  {
    icon: Users,
    title: "Közösségi Támogatás",
    description:
      "Csatlakozz hasonló érdeklődésű fiatalokhoz és építs kapcsolatokat.",
  },
  {
    icon: Building,
    title: "Virtuális Cégtúrák",
    description:
      "Fedezd fel a különböző munkakörnyezeteket és vállalati kultúrákat.",
  },
  {
    icon: Sprout,
    title: "Fenntarthatóság",
    description:
      "Minden interakció után egy fát ültetünk a bolygónk védelmében.",
  },
];

export default function ProjectDetails() {
  return (
    <section
      id="project-details"
      className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-indigo-100 to-purple-100 min-h-screen"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center text-indigo-900"
        >
          A Projektről
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/50 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <feature.icon className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-600 mb-4 sm:mb-6" />
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-indigo-900">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-indigo-700">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <p className="text-lg sm:text-xl text-indigo-800 max-w-3xl mx-auto px-4">
            Platformunk célja, hogy segítse a pályaválasztás előtt álló
            fiatalokat átfogó képet nyújtva a különböző szakmákról és
            karrierlehetőségekről. Csatlakozz hozzánk, és fedezd fel a benned
            rejlő potenciált!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
