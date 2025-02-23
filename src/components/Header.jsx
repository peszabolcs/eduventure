"use client"

import { useState } from "react"
import {Link} from 'react-scroll';
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence} from "framer-motion";
import { useNavigate, NavLink } from "react-router-dom";

const menuItems = [
    { name: "Főoldal", to: "hero-section", href: "/" },
    { name: "Projekt", to: "project-description" },
    { name: "Csapat", to: "team-section" },
    { name: "Kérdőív", to: "form-section", href: "https://forms.gle/hewV8BhLbWoBoLsLA" },
    {name: "Regisztráció", href: "/register" },
]

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate();

    const handleClick = (item) => {
        if(item.href && item.href.startsWith("http")) {
            window.open(item.href, "_blank");
        } else if(item.href) {
            navigate(item.href);
        } else {
            setIsOpen(false);
        }
    }

    return (
        <header className="absolute top-0 left-0 right-0 z-50 h-16 py-2.5">
            <nav className="hidden md:block">
                {/* Desktop menu */}
                <div className="flex justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg px-2 py-1.5 cursor-pointer">
                        <div className="flex items-center space-x-1">
                        {menuItems.map((item) => (
                            item.href && !item.href.startsWith("http") ? (
                                <NavLink
                                    key={item.name}
                                    to={item.href}
                                    className="px-4 py-1.5 text-sm font-medium rounded-full text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                                >
                                    {item.name}
                                </NavLink>
                            ) : (
                                <Link
                                    key={item.name}
                                    to={item.to}
                                    smooth={true}
                                    duration={100}
                                    spy={true}
                                    className="px-4 py-1.5 text-sm font-medium rounded-full text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                                    onClick={() => handleClick(item)}
                                >
                                    {item.name}
                                </Link>
                            )
                        ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden absolute top-4 left-4">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-3 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                    <span className="sr-only">Menü megnyitása</span>
                    {isOpen ? <X className="h-6 w-6" aria-hidden="true"/> :
                        <Menu className="h-6 w-6" aria-hidden="true"/>}
                </button>
            </div>
            {/* Mobile menu dropdown */}
            <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="fixed top-0 left-0 w-full h-full bg-purple-900/95 z-50 flex flex-col items-center justify-center"
                >
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-6 right-6 p-3 rounded-full bg-purple-200 text-purple-700 hover:bg-purple-300 transition-colors duration-200"
                    >
                        <X className="h-8 w-8" aria-hidden="true" />
                    </button>

                    <div className="space-y-6 text-xl font-semibold text-gray-200">
                        {menuItems.map((item) =>
                            item.href && !item.href.startsWith("http") ? (
                                <NavLink
                                    key={item.name}
                                    to={item.href}
                                    className="block text-xl py-4 px-6 rounded-lg bg-purple-700 text-purple-200 hover:bg-purple-800 transition-colors duration-200 no-underline"
                                >
                                    {item.name}
                                </NavLink>
                            ) : (
                                <Link
                                    key={item.name}
                                    to={item.to}
                                    smooth={true}
                                    duration={100}
                                    spy={true}
                                    className="block text-xl py-4 px-6 rounded-lg bg-purple-700 text-purple-200 hover:bg-purple-800 transition-colors duration-200 no-underline"
                                    onClick={() => {
                                        handleClick(item);
                                        setIsOpen(false);
                                    }}
                                >
                                    {item.name}
                                </Link>
                            )
                        )}
                    </div>
                </motion.div>
            )}
            </AnimatePresence>
        </header>
    )
}

