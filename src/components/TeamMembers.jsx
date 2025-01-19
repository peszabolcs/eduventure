import React from 'react';

const TeamMembers = () => {
    const teamMembers = [
        {
            name: "Perjési Szabolcs",
            education: "SZTE - Programtervező informatika",
            role: "Tech Lead Developer"
        },
        {
            name: "Lengyel Patrik Gábor",
            education: "SZTE - Pénzügy és számvitel",
            role: "Pénzügyi elemző"
        },
        {
            name: "Gellén Zalán",
            education: "BCE - Nemzetközi gazdálkodás",
            role: "Marketing vezető"
        },
        {
            name: "Báló Dávid Levente",
            education: "BCE - Nemzetközi gazdálkodás",
            role: "Műszaki termékfejlesztő"
        }
    ];

    return (
        <div className="mx-auto p-8 full-screen" style={{backgroundColor: '#10202d'}}>
            <h1 className="text-3xl font-bold text-center mb-12 text-white">Csapatunk</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md p-4 sm:p-6 flex flex-col items-center transition-transform duration-300 hover:scale-105"
                    >
                        <div className="w-16 h-16 sm:w-24 sm:h-24  bg-gray-200 rounded-full mb-4" />
                        <h2 className="text-lg sm:text-xl font-semibold mb-2">{member.name}</h2>
                        <p className="text-gray-600 text-center mb-2">{member.education}</p>
                        <p className="text-blue-600">{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamMembers;