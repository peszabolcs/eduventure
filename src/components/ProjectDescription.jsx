'use client'

import { motion } from 'framer-motion'
import { Lightbulb, Users, Building, Sprout } from 'lucide-react'

const features = [
    {
        icon: Lightbulb,
        title: 'Szakértői Tanácsadás',
        description: 'Tapasztalt szakemberek osztják meg tudásukat és tapasztalataikat.'
    },
    {
        icon: Users,
        title: 'Közösségi Támogatás',
        description: 'Csatlakozz hasonló érdeklődésű fiatalokhoz és építs kapcsolatokat.'
    },
    {
        icon: Building,
        title: 'Virtuális Cégtúrák',
        description: 'Fedezd fel a különböző munkakörnyezeteket és vállalati kultúrákat.'
    },
    {
        icon: Sprout,
        title: 'Fenntarthatóság',
        description: 'Minden interakció után egy fát ültetünk a bolygónk védelmében.'
    }
]

export default function ProjectDetails() {
    return (
        <section id="project-details" className="py-24 bg-gradient-to-br from-indigo-100 to-purple-100">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold mb-12 text-center text-indigo-900"
                >
                    A Projektről
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-white/50 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <feature.icon className="w-12 h-12 text-indigo-600 mb-6" />
                            <h3 className="text-2xl font-semibold mb-4 text-indigo-900">{feature.title}</h3>
                            <p className="text-indigo-700">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <p className="text-xl text-indigo-800 max-w-3xl mx-auto">
                        Platformunk célja, hogy segítse a pályaválasztás előtt álló fiatalokat átfogó képet nyújtva a különböző szakmákról és karrierlehetőségekről. Csatlakozz hozzánk, és fedezd fel a benned rejlő potenciált!
                    </p>
                </motion.div>
            </div>
        </section>
    )
}

