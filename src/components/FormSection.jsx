"use client"

import { motion } from "framer-motion"

export default function FormSection() {
    return (
        <section className="relative py-12 sm:py-16 md:py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
            </div>

            <div className="container relative mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-6xl mx-auto"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center text-white">Csatlakozz hozzánk</h2>
                    <div className="relative group">
                        {/* Subtle gradient border effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-sm"></div>

                        {/* Main content container */}
                        <div className="relative bg-white/5 backdrop-blur-xl p-2 sm:p-3 rounded-2xl">
                            <div className="bg-black/10 rounded-xl overflow-hidden">
                                <iframe
                                    src="https://forms.gle/hewV8BhLbWoBoLsLA"
                                    className="w-full min-h-[700px] lg:min-h-[800px] rounded-xl bg-transparent"
                                    frameBorder="0"
                                    marginHeight={0}
                                    marginWidth={0}
                                >
                                    Loading...
                                </iframe>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <style jsx global>{`
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </section>
    )
}

