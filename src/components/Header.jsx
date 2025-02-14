"use client"

import { useState } from "react"
import {Link} from 'react-scroll';
import { Menu, X } from "lucide-react"

const menuItems = [
    { name: "Főoldal", to: "hero-section" },
    { name: "Projekt", to: "project-description" },
    { name: "Csapat", to: "team-section" },
    { name: "Kérdőív", to: "form-section", href: "https://forms.gle/hewV8BhLbWoBoLsLA" },
]

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = (item) => {
        if(item.href) {
            window.location.href = item.href;
        } else {
            setIsOpen(false);
        }
    }

    return (
        <header className="absolute top-4 left-0 right-0 z-50 flex justify-center">
            <nav className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg px-2 py-1.5 mx-4">
                {/* Desktop menu */}
                <div className="hidden md:block">
                    <div className="flex items-center space-x-1">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.to}
                                smooth={true}
                                duration={100}
                                spy={true}
                                activeClass="text-white bg-purple-600 shadow-sm"
                                // onClick={console.log(item.to)}
                                onClick={() => handleClick(item)}
                                className={`px-4 py-1.5 text-sm font-medium transition-all duration-200 rounded-full no-underline ${
                                    item.to === "hero-section"
                                        ? "text-white bg-purple-600 shadow-sm"
                                        : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-4 rounded-full text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200"
                    >
                        <span className="sr-only">Menü megnyitása</span>
                        {isOpen ? <X className="h-8 w-8" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
                    </button>
                </div>
            </nav>

            {/* Mobile menu dropdown */}
            {isOpen && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-sm md:hidden">
                    <div className="bg-white rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden mx-4">
                        <div className="space-y-1 p-2">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    to={item.to}
                                    smooth={true}
                                    duration={100}
                                    spy={true}
                                    className={`block px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200 ${
                                        item.to === "hero-section"
                                            ? "text-white bg-purple-600"
                                            : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                                    }`}
                                    onClick={() => handleClick(item)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}

