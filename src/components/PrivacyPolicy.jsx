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
            a hozzájárulását visszavonni, amely azonban nem érinti a visszavonás
            előtti adatkezelés jogszerűségét.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. Sütik (cookie-k) használata
          </h2>
          <p className="mb-4">
            Weboldalunk sütiket (cookie-kat) használ a felhasználói élmény
            javítása, valamint a weboldal működésének biztosítása érdekében.
          </p>

          <h3 className="text-xl font-semibold mb-2 mt-4">
            3.1. Mi az a süti (cookie)?
          </h3>
          <p className="mb-4">
            A sütik kis szöveges fájlok, amelyeket a weboldal az Ön által
            használt eszközön (számítógép, mobiltelefon vagy táblagép) tárol el.
            A sütik lehetővé teszik, hogy a weboldal felismerje Önt, amikor
            visszatér az oldalra, és megjegyezze a beállításait, preferenciáit.
          </p>

          <h3 className="text-xl font-semibold mb-2">
            3.2. Milyen sütiket használunk?
          </h3>
          <p className="mb-2">
            Weboldalunkon az alábbi típusú sütiket használjuk:
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>
              <strong>Feltétlenül szükséges sütik:</strong> Ezek a sütik
              elengedhetetlenek a weboldal működéséhez. Lehetővé teszik az
              alapvető funkciókat, például a bejelentkezést és a felhasználói
              fiók létrehozását. Ezen sütik nélkül a weboldal nem tud
              megfelelően működni.
            </li>
            <li>
              <strong>Statisztikai sütik:</strong> Ezek a sütik anonim
              információkat gyűjtenek arról, hogyan használják a látogatók a
              weboldalunkat. Segítenek megérteni, hogy mely oldalaink a
              legnépszerűbbek, és hogyan navigálnak a felhasználók az oldalon.
            </li>
            <li>
              <strong>Funkcionális sütik:</strong> Ezek a sütik lehetővé teszik,
              hogy a weboldal megjegyezzen bizonyos választásokat, amelyeket Ön
              tett (például felhasználónév, nyelvi beállítások) a jobb
              felhasználói élmény érdekében.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-2">
            3.3. Mire használjuk a sütiket?
          </h3>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>
              Felhasználói munkamenetek kezelésére (bejelentkezés, regisztráció)
            </li>
            <li>A weboldal működésének és teljesítményének javítására</li>
            <li>Felhasználói élmény személyre szabására</li>
            <li>Weboldal-használati statisztikák készítésére</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2">
            3.4. Süti beállítások kezelése
          </h3>
          <p className="mb-4">
            A süti használatot az oldal alján megjelenő süti értesítő sávban
            tudja elfogadni vagy elutasítani. Fontos tudni, hogy a sütik
            elutasítása esetén bizonyos funkciókat nem tud majd használni,
            például:
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>Nem tud bejelentkezni vagy regisztrálni a weboldalon</li>
            <li>Nem tudunk személyre szabott tartalmat biztosítani</li>
            <li>Bizonyos funkciókat nem tud majd használni</li>
          </ul>
          <p>
            A süti beállításokat bármikor módosíthatja a böngészője
            beállításaiban, vagy törölheti a sütiket. Kérjük vegye figyelembe,
            hogy a sütik törlése után ismét döntenie kell a süti használatról,
            amikor újra ellátogat weboldalunkra.
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
