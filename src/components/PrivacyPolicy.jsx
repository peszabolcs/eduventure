import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto py-10 px-4 md:px-8 text-white pt-24">
      <div className="max-w-4xl mx-auto bg-gray-800 bg-opacity-70 rounded-lg shadow-xl p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Adatkezelési Tájékoztató
        </h1>

        <p className="mb-6">
          Az EduVenture (a továbbiakban: Szolgáltató) elkötelezett a
          felhasználók személyes adatainak védelme iránt. Jelen adatkezelési
          tájékoztató célja, hogy a felhasználókat tájékoztassa a személyes
          adataik kezeléséről, azok felhasználásának módjáról és jogaikról.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            1. Az adatkezelő megnevezése és elérhetőségei
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Név: EduVenture</li>
            <li>Székhely: -</li>
            <li>E-mail cím: info@edu-venture.hu</li>
            <li>Telefonszám: -</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. Az adatkezelés célja és jogalapja
          </h2>
          <p className="mb-4">
            A felhasználói fiók létrehozása és kezelése során a Szolgáltató az
            alábbi személyes adatokat kezeli:
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>Felhasználónév: A felhasználó azonosítása céljából.</li>
            <li>
              E-mail cím: A felhasználó azonosítása, kapcsolattartás és
              értesítések küldése céljából.
            </li>
            <li>
              Titkosított jelszó: A felhasználói fiók biztonságos hozzáférésének
              biztosítása érdekében.
            </li>
          </ul>
          <p>
            Az adatkezelés jogalapja a felhasználó önkéntes hozzájárulása,
            amelyet a regisztráció során ad meg. A felhasználó bármikor jogosult
            hozzájárulását visszavonni, azonban ez a fiók megszüntetését
            eredményezheti.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. Az adatok tárolása és védelme
          </h2>
          <p>
            A megadott adatokat a Szolgáltató szerver oldali MySQL adatbázisában
            tárolja. A jelszavak hashelve kerülnek mentésre a biztonság növelése
            érdekében. A Szolgáltató megfelelő technikai és szervezési
            intézkedésekkel biztosítja az adatok védelmét a jogosulatlan
            hozzáférés, módosítás vagy törlés ellen.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. Az adatok felhasználása
          </h2>
          <p>
            A Szolgáltató az adatokat kizárólag a felhasználói fiók kezelésére
            és a felhasználóval történő kapcsolattartásra használja fel. Ezek
            közé tartozik például a rendszerüzenetek, értesítések küldése. Az
            adatokat harmadik fél számára a Szolgáltató nem továbbítja, kivéve,
            ha azt jogszabály írja elő.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. Az adatok megőrzésének időtartama
          </h2>
          <p>
            A személyes adatokat a felhasználói fiók fennállásáig, illetve a
            felhasználó hozzájárulásának visszavonásáig őrizzük meg. A fiók
            törlésekor az adatok véglegesen törlésre kerülnek a rendszerből.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            6. A felhasználó jogai
          </h2>
          <p className="mb-4">A felhasználó jogosult:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Tájékoztatást kérni személyes adatai kezeléséről.</li>
            <li>Hozzáférést kérni a kezelt adataihoz.</li>
            <li>
              Adatainak helyesbítését kérni, ha azok pontatlanok vagy hiányosak.
            </li>
            <li>
              Adatainak törlését kérni, amennyiben az adatkezelés jogellenes
              vagy az adatkezelés célja megszűnt.
            </li>
            <li>Az adatkezelés korlátozását kérni bizonyos esetekben.</li>
            <li>
              Adathordozhatósághoz való jogát gyakorolni, azaz kérni, hogy az
              általa megadott adatokat géppel olvasható formátumban megkapja.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            7. Jogorvoslati lehetőségek
          </h2>
          <p className="mb-4">
            Amennyiben a felhasználó úgy véli, hogy személyes adatainak kezelése
            sérti a hatályos jogszabályokat, panaszt tehet a Nemzeti Adatvédelmi
            és Információszabadság Hatóságnál (NAIH):
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Cím: 1055 Budapest, Falk Miksa utca 9-11.</li>
            <li>Postacím: 1363 Budapest, Pf. 9.</li>
            <li>Telefon: +36 (1) 391-1400</li>
            <li>E-mail: ugyfelszolgalat@naih.hu</li>
            <li>
              Honlap:{" "}
              <a
                href="https://www.naih.hu/"
                className="text-blue-300 hover:text-blue-200 underline"
              >
                https://www.naih.hu/
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            8. Az adatkezelési tájékoztató módosítása
          </h2>
          <p>
            A Szolgáltató fenntartja a jogot, hogy jelen tájékoztatót módosítsa.
            A módosításokról a felhasználókat megfelelő módon értesíti, például
            e-mailben vagy a weboldalon keresztül.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Kapcsolatfelvétel</h2>
          <p className="mb-4">
            Adatkezeléssel kapcsolatos kérdéseivel vagy észrevételeivel
            forduljon hozzánk bizalommal az alábbi elérhetőségek egyikén:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>E-mail: info@eduventure.hu</li>
            <li>Telefonszám: -</li>
          </ul>
        </section>

        <p className="mt-8 text-center">
          Köszönjük, hogy igénybe veszi szolgáltatásainkat és megbízik bennünk
          személyes adatainak kezelésében.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
