export type Project = {
  slug: string;
  name: string;
  type: string;
  language: string;
  framework: string;
  paragraphs: string[];
  images: string[];
  live?: string;
  repository?: string;
};

export const projects: Project[] = [
  {
    slug: "in-the-name-of-god",
    name: "In the Name of God",
    type: "Videogame",
    language: "C++",
    framework: "Unreal Engine 5",
    paragraphs: [
      "A solo survivors-style game in Unreal Engine 5, the final project for the Master's in Game Programming at The Core, 2023. Enemies spawn and close in, with custom animations and enemy AI. Experience drops, and the player picks up knives, a spiral attack, and first-aid kits.",
    ],
    images: [],
    repository: "https://github.com/Salexmineralex/InTheNameOfGod",
  },
  {
    slug: "agora",
    name: "Ágora",
    type: "Social network",
    language: "Java",
    framework: "Android Studio",
    paragraphs: [
      "Ágora was my final project for Multi-platform Application Development. It is a place to make plans with people who share your interests. Someone proposes a plan, and you accept or reject it. The plan is the excuse to meet, which was meant as an alternative to swipe-based dating apps.",
      "The Android app, finished in 2021, has registration, login, and four tabs: Plans, Create Plans, Profile, and Chat.",
    ],
    images: ["/work/agora/2.jpg", "/work/agora/3.jpg"],
  },
  {
    slug: "minesweeper",
    name: "Minesweeper",
    type: "Game",
    language: "Java",
    framework: "Android Studio",
    paragraphs: [
      "A Minesweeper for Android. Easy, medium, and hard change how many squares are on the board. Clear every square that is not a mine.",
      "A timer is there so you can play against your own best time.",
    ],
    images: [
      "/work/minesweeper/1.png",
      "/work/minesweeper/2.png",
      "/work/minesweeper/3.png",
    ],
    repository: "https://github.com/Salexmineralex/Minesweeper",
  },
  {
    slug: "space-invaders",
    name: "Space Invaders",
    type: "Videogame",
    language: "C++",
    framework: "SFML",
    paragraphs: [
      "A Space Invaders variant. Enemies arrive in waves and the difficulty climbs. Instead of three lives, the ship has a health bar. At zero, a game over screen appears.",
      "Arrows move the ship, space shoots, R restarts, and Escape quits.",
    ],
    images: [
      "/work/space-invaders/1.png",
      "/work/space-invaders/2.png",
      "/work/space-invaders/3.png",
    ],
    repository: "https://github.com/Salexmineralex/SFML_SpaceInvaderClone",
  },
  {
    slug: "pokepairs",
    name: "PokePairs",
    type: "Game",
    language: "Java",
    framework: "Android Studio",
    paragraphs: [
      "A pairs game for Android with a Pokémon theme. Three difficulties change the size of the board. Matching tiles stay face up once you find them.",
    ],
    images: [
      "/work/pokepairs/1.png",
      "/work/pokepairs/2.png",
      "/work/pokepairs/3.png",
    ],
    repository: "https://github.com/Salexmineralex/PokePairs",
  },
  {
    slug: "films-sqlite",
    name: "Films",
    type: "Database",
    language: "Java",
    framework: "SQLite",
    paragraphs: [
      "An Android app with a local SQLite database. You create an account, log in, and add films. The poster can be played as a puzzle, and the app can search for a trailer.",
      "Wiring that trailer search up was the hard part.",
    ],
    images: ["/work/films/1.png", "/work/films/2.png", "/work/films/3.png"],
    repository: "https://github.com/Salexmineralex/Films_SQLITE",
  },
  {
    slug: "encrypted-ftp",
    name: "Encrypted FTP",
    type: "Server and client",
    language: "Java",
    framework: "Swing",
    paragraphs: [
      "An FTP server and client. The server picks a folder to share. The client uploads and downloads files. Traffic is encrypted both symmetrically and asymmetrically.",
    ],
    images: [
      "/work/encrypted-ftp/1.png",
      "/work/encrypted-ftp/2.png",
      "/work/encrypted-ftp/3.png",
    ],
    repository: "https://github.com/Salexmineralex/TCP_FTP_Encrypted",
  },
  {
    slug: "a-star",
    name: "A*",
    type: "Tool",
    language: "JavaScript",
    framework: "Browser",
    paragraphs: [
      "A grid where you place a start, a goal, and walls, then run A* and watch it draw the route.",
    ],
    images: [],
    live: "https://salexmineralex.github.io/AStarPage/",
    repository: "https://github.com/Salexmineralex/AStarPage",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
