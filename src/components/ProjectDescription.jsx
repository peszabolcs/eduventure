"use client";

import { motion } from "framer-motion";
import {Lightbulb, Users, Building, Sprout, BookOpen, Search, Layers, Globe} from "lucide-react";

const features = [
  {
    icon: Lightbulb,
    title: "Szakértői Tanácsadás",
    description:
        "Tapasztalt szakemberek és mentorok segítenek eligazodni a különböző karrierutak között.",
  },
  {
    icon: Users,
    title: "Közösségi Támogatás",
    description:
        "Kapcsolódj hozzád hasonló érdeklődésű fiatalokhoz, osszátok meg tapasztalataitokat és tanuljatok egymástól.",
  },
  {
    icon: Building,
    title: "Virtuális Cégtúrák",
    description:
        "Fedezd fel a különböző munkakörnyezeteket, és ismerd meg a vállalati kultúrákat valós példákon keresztül.",
  },
  {
    icon: BookOpen,
    title: "Oktatási Anyagok",
    description:
        "Szakirány-specifikus tananyagok és útmutatók segítik a döntésed megalapozását.",
  },
  {
    icon: Search,
    title: "Személyre Szabott Pályaválasztás",
    description:
        "AI-alapú útmutató, amely személyiségtesztek és preferenciák alapján ajánl szakmákat és lehetőségeket.",
  },
  {
    icon: Layers,
    title: "Gyakorlati Tapasztalat",
    description:
        "Gyakornoki lehetőségek, esettanulmányok és valós projektek segítik a felkészülésedet a munka világára.",
  },
  {
    icon: Globe,
    title: "Nemzetközi Perspektíva",
    description:
        "Nemzetközi tapasztalatok és külföldi lehetőségek bemutatása azok számára, akik globálisan gondolkodnak.",
  },
  {
    icon: Sprout,
    title: "Fenntarthatóság",
    description:
        "Minden interakció után egy fát ültetünk a bolygónk védelmében, hogy a tanulás pozitív hatással legyen a környezetre is.",
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
            Platformunk célja, hogy segítse a pályaválasztás előtt álló fiatalokat átfogó és hiteles információkkal,
            gyakorlati tapasztalatokkal és közösségi támogatással. Csatlakozz hozzánk, és fedezd fel a lehetőségeid világát!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
