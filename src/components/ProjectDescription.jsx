import React from 'react';
import { TreeDeciduous } from 'lucide-react';


const ProjectDescription = () => {
    return (
        <div className="max-w-4xl mx-auto p-8 bg-white full-screen">
            <h1 className="text-3xl font-bold mb-8 text-center">A Projektről</h1>

            <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                    Platformunk célja, hogy segítse a pályaválasztás előtt álló középiskolásokat és egyetemistákat,
                    akik bizonytalanok a jövőbeli karrierlehetőségeik terén. Átfogó képet nyújtunk a munkakörök
                    mindennapjairól, a különböző szakmai lehetőségekről és a valós munkahelyi tapasztalatokról.
                </p>

                <p className="text-lg leading-relaxed">
                    Összehozzuk a tapasztalt szakembereket a fiatalokkal, hogy részletesen bemutathassák
                    munkájukat, megoszthassák karrierútjukat és betekintést nyújthassanak választott szakmájuk
                    gyakorlati oldalába.
                </p>

                <div className="mt-12">
                    <h2 className="text-2xl font-semibold mb-4">Szolgáltatásaink közé tartoznak:</h2>
                    <ul className="space-y-4">
                        <li className="flex items-center space-x-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span className="text-lg">Online órák és videóbeszélgetések szakértőkkel</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span className="text-lg">Mesterséges intelligencia-alapú pályaorientációs modul</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span className="text-lg">Virtuális cégtúrák</span>
                        </li>
                    </ul>
                </div>

                <div className="mt-12 bg-green-50 p-6 rounded-lg">
                    <TreeDeciduous className="text-green-600 w-6 h-6"/>
                    <p className="text-lg text-green-800">
                        Minden sikeres interakció után egy fát ültetünk, hozzájárulva ezzel a környezet védelméhez is.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProjectDescription;