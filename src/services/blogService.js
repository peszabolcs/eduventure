// Mock data for demonstration purposes
// In a real application, this would connect to a backend API

const mockArticles = [
  {
    id: "1",
    title: "Szoftverfejlesztői karrier: Út a sikerhez",
    summary:
      "Minden, amit tudnod kell a szoftverfejlesztői karrierről, a szükséges képzettségektől a fizetési lehetőségekig.",
    content: `
        <h2>Mi a szoftverfejlesztő feladata?</h2>
        <p>A szoftverfejlesztők számítógépes programokat terveznek, kódolnak és tesztelnek. Munkájuk során problémákat oldanak meg, és innovatív megoldásokat hoznak létre különböző iparágak számára.</p>
        
        <h3>Szükséges képzettség</h3>
        <p>A legtöbb szoftverfejlesztői pozícióhoz informatikai vagy számítástechnikai diploma szükséges, de egyre több önképzett fejlesztő is sikeresen helyezkedik el a szakmában.</p>
        
        <h3>Fizetési lehetőségek</h3>
        <p>Magyarországon egy junior szoftverfejlesztő átlagosan havi 400-600 ezer forintot kereshet, míg a senior fejlesztők fizetése akár az 1-1,5 millió forintot is elérheti.</p>
      `,
    category: "it",
    tags: ["programozás", "karrier", "fizetés"],
    image: "/placeholder.svg?height=600&width=1200",
    publishDate: "2023-05-15",
    readTime: 8,
    author: {
      name: "Nagy János",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    id: "2",
    title: "Orvosi egyetem: Amit a felvételiről tudni kell",
    summary:
      "Részletes útmutató az orvosi egyetemre való jelentkezésről, a felvételi követelményekről és a képzés menetéről.",
    content: `
        <h2>Felvételi követelmények</h2>
        <p>Az orvosi egyetemre való bejutáshoz emelt szintű érettségi szükséges biológiából és kémiából vagy fizikából. A magas pontszám mellett fontos a megfelelő motiváció és elhivatottság is.</p>
        
        <h3>A képzés menete</h3>
        <p>Az orvosképzés Magyarországon 6 éves, amelyből az első két év főként elméleti alapozó tárgyakból áll, míg a későbbi években egyre több a gyakorlati oktatás.</p>
        
        <h3>Karrierlehetőségek</h3>
        <p>Az orvosi diploma megszerzése után számos specializációs lehetőség közül választhatnak a végzettek, a háziorvosi praxistól kezdve a különböző szakterületekig.</p>
      `,
    category: "medicine",
    tags: ["egyetem", "felvételi", "orvostudomány"],
    image: "/placeholder.svg?height=600&width=1200",
    publishDate: "2023-06-22",
    readTime: 10,
    author: {
      name: "Dr. Kovács Éva",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    id: "3",
    title: "Mérnöki pályák: Melyik a neked való?",
    summary:
      "Összehasonlítjuk a különböző mérnöki szakirányokat, hogy segítsünk megtalálni a hozzád legjobban illő területet.",
    content: `
        <h2>Gépészmérnök</h2>
        <p>A gépészmérnökök gépek, berendezések tervezésével, fejlesztésével és karbantartásával foglalkoznak. Ez az egyik legsokoldalúbb mérnöki terület.</p>
        
        <h3>Villamosmérnök</h3>
        <p>A villamosmérnökök elektronikai rendszerek, áramkörök tervezésével és fejlesztésével foglalkoznak. Munkájuk az energetikától a telekommunikációig számos területet érint.</p>
        
        <h3>Építőmérnök</h3>
        <p>Az építőmérnökök épületek, hidak, utak és egyéb infrastruktúra tervezésével és kivitelezésével foglalkoznak. Munkájuk során figyelembe kell venniük a statikai, környezeti és gazdasági szempontokat is.</p>
      `,
    category: "engineering",
    tags: ["mérnök", "karrier", "szakirány"],
    image: "/placeholder.svg?height=600&width=1200",
    publishDate: "2023-07-10",
    readTime: 7,
    author: {
      name: "Szabó Péter",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  },
];

// Get all articles
export const getAllArticles = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockArticles);
    }, 500);
  });
};

// Get article by ID
export const getArticleById = async (id) => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const article = mockArticles.find((article) => article.id === id);
      if (article) {
        resolve(article);
      } else {
        reject(new Error("Article not found"));
      }
    }, 500);
  });
};

// Get related articles
export const getRelatedArticles = async (currentId, category) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const related = mockArticles
        .filter(
          (article) => article.id !== currentId && article.category === category
        )
        .slice(0, 3);
      resolve(related);
    }, 500);
  });
};

// Create new article
export const createArticle = async (articleData) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newArticle = {
        id: Date.now().toString(),
        ...articleData,
        publishDate: new Date().toISOString(),
        author: {
          name: "Current User",
          avatar: "/placeholder.svg?height=100&width=100",
        },
      };
      mockArticles.push(newArticle);
      resolve(newArticle);
    }, 1000);
  });
};

// Update article
export const updateArticle = async (id, articleData) => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockArticles.findIndex((article) => article.id === id);
      if (index !== -1) {
        mockArticles[index] = {
          ...mockArticles[index],
          ...articleData,
          id,
        };
        resolve(mockArticles[index]);
      } else {
        reject(new Error("Article not found"));
      }
    }, 1000);
  });
};

// Delete article
export const deleteArticle = async (id) => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockArticles.findIndex((article) => article.id === id);
      if (index !== -1) {
        mockArticles.splice(index, 1);
        resolve({ success: true });
      } else {
        reject(new Error("Article not found"));
      }
    }, 500);
  });
};
