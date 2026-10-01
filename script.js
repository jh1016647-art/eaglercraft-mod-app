const mods = [
  {
    id: "verity",
    name: "Verity Mod",
    category: "story",
    tag: "Story",
    version: "v1.4.2",
    rating: 4.9,
    description: "A creepy, lore-driven add-on with investigative scenes, hidden endings, and atmospheric world changes.",
    accent: "verity"
  },
  {
    id: "fnaf",
    name: "FNAF Pack",
    category: "horror",
    tag: "Horror",
    version: "v2.0.1",
    rating: 4.8,
    description: "A night-shift themed collection with suspenseful ambiance, custom mechanics, and chase sequences.",
    accent: "fnaf"
  },
  {
    id: "curse-steve",
    name: "Curse Steve",
    category: "popular",
    tag: "Popular",
    version: "v3.1.0",
    rating: 4.7,
    description: "A high-energy mod profile built for players who want a stronger combat and survival challenge.",
    accent: "curse"
  },
  {
    id: "herobrine",
    name: "Herobrine Mod",
    category: "horror",
    tag: "Horror",
    version: "v2.5.0",
    rating: 4.9,
    description: "Experience the legendary Herobrine entity with spine-chilling encounters, mysterious structures, and eerie ambient effects.",
    accent: "herobrine"
  },
  {
    id: "cat-in-hat",
    name: "The Cat in the Hat",
    category: "horror",
    tag: "EXTREME",
    version: "v1.0.0",
    rating: 5.0,
    description: "You must RUN. If you stop, the Cat will find you and the game will shut down. Never stop moving. Can you survive?",
    accent: "cat",
    extreme: true
  },
  {
    id: "boost-kit",
    name: "Utility Boost",
    category: "utility",
    tag: "Utility",
    version: "v1.8.0",
    rating: 4.6,
    description: "Quality-of-life upgrades for performance tuning, inventory shortcuts, and cleaner interface actions.",
    accent: "utility"
  }
];

const modGrid = document.getElementById("modGrid");
const template = document.getElementById("modCardTemplate");
const searchInput = document.getElementById("searchInput");
const navButtons = document.querySelectorAll(".nav-item");
const statusPill = document.getElementById("statusPill");
const launchButton = document.getElementById("launchButton");
const refreshButton = document.getElementById("refreshButton");

let activeFilter = "all";
let catChaseActive = false;

function renderMods(list = mods) {
  modGrid.innerHTML = "";

  list.forEach((mod) => {
    const fragment = template.content.cloneNode(true);
    const card = fragment.querySelector(".mod-card");
    const badge = fragment.querySelector(".mod-badge");
    const tag = fragment.querySelector(".tag");
    const version = fragment.querySelector(".version");
    const name = fragment.querySelector(".mod-name");
    const description = fragment.querySelector(".mod-description");
    const rating = fragment.querySelector(".rating");
    const button = fragment.querySelector(".install-btn");

    tag.textContent = mod.tag;
    version.textContent = mod.version;
    name.textContent = mod.name;
    description.textContent = mod.description;
    rating.textContent = mod.rating.toFixed(1);
    
    if (mod.extreme) {
      button.textContent = "⚠️ INSTALL";
      button.addEventListener("click", () => installCatMod(mod.name));
    } else {
      button.addEventListener("click", () => installMod(mod.name));
    }

    if (mod.accent === "verity") {
      badge.style.background = "linear-gradient(135deg, #74d0ff, #9eb7ff)";
    } else if (mod.accent === "fnaf") {
      badge.style.background = "linear-gradient(135deg, #ff7dcf, #ff9b71)";
    } else if (mod.accent === "curse") {
      badge.style.background = "linear-gradient(135deg, #ffa857, #ffd56b)";
    } else if (mod.accent === "herobrine") {
      badge.style.background = "linear-gradient(135deg, #8b0000, #ff4444)";
    } else if (mod.accent === "cat") {
      badge.style.background = "linear-gradient(135deg, #ff1493, #ff69b4)";
      card.style.borderColor = "rgba(255, 20, 147, 0.5)";
      card.style.boxShadow = "0 0 30px rgba(255, 20, 147, 0.3), 0 10px 30px rgba(0,0,0,0.18)";
    } else {
      badge.style.background = "linear-gradient(135deg, #5bd38d, #8eeeb9)";
    }

    card.dataset.category = mod.category;
    modGrid.appendChild(fragment);
  });
}

function filterMods() {
  const term = searchInput.value.trim().toLowerCase();
  const filtered = mods.filter((mod) => {
    const matchesCategory = activeFilter === "all" || mod.category === activeFilter;
    const matchesQuery = mod.name.toLowerCase().includes(term) || mod.description.toLowerCase().includes(term);
    return matchesCategory && matchesQuery;
  });

  renderMods(filtered);
}

function installMod(name) {
  statusPill.textContent = `Installing ${name}`;
  statusPill.style.background = "rgba(255, 168, 87, 0.12)";
  statusPill.style.color = "#ffa857";

  setTimeout(() => {
    statusPill.textContent = "Ready";
    statusPill.style.background = "rgba(91, 211, 141, 0.12)";
    statusPill.style.color = "#5bd38d";
  }, 1200);
}

function installCatMod(name) {
  statusPill.textContent = `⚠️ INSTALLING: ${name}`;
  statusPill.style.background = "rgba(255, 20, 147, 0.2)";
  statusPill.style.color = "#ff1493";

  setTimeout(() => {
    startCatChase();
  }, 1500);
}

function startCatChase() {
  if (catChaseActive) return;
  catChaseActive = true;

  const body = document.body;
  body.style.overflow = "hidden";

  const chaseOverlay = document.createElement("div");
  chaseOverlay.id = "cat-chase-overlay";
  chaseOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #1a0a2e 0%, #16213e 50%, #0f3460 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    flex-direction: column;
  `;

  const gameArea = document.createElement("div");
  gameArea.style.cssText = `
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background: linear-gradient(to bottom, #0a0a1a 0%, #1a0a2e 50%, #2d0a3a 100%);
  `;

  const player = document.createElement("div");
  player.style.cssText = `
    position: absolute;
    width: 40px;
    height: 60px;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #74d0ff, #3ec6ff);
    border-radius: 8px;
    z-index: 100;
  `;

  const cat = document.createElement("div");
  cat.style.cssText = `
    position: absolute;
    width: 50px;
    height: 50px;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 48px;
    z-index: 99;
    animation: catFloat 1s infinite;
  `;
  cat.textContent = "🎩👤";

  const instructions = document.createElement("div");
  instructions.style.cssText = `
    position: absolute;
    top: 30px;
    left: 30px;
    color: #ff1493;
    font-weight: bold;
    font-size: 18px;
    text-shadow: 0 0 10px rgba(255, 20, 147, 0.8);
  `;
  instructions.textContent = "RUN! Use arrow keys or WASD to move. Don't stop!";

  const timer = document.createElement("div");
  timer.style.cssText = `
    position: absolute;
    top: 30px;
    right: 30px;
    color: #ffa857;
    font-weight: bold;
    font-size: 20px;
  `;

  gameArea.appendChild(player);
  gameArea.appendChild(cat);
  gameArea.appendChild(instructions);
  gameArea.appendChild(timer);
  chaseOverlay.appendChild(gameArea);
  body.appendChild(chaseOverlay);

  let playerX = window.innerWidth / 2;
  let playerY = window.innerHeight - 160;
  let catX = window.innerWidth / 2;
  let catY = 50;
  let catSpeed = 2;
  let survived = 0;
  let gameRunning = true;
  let isMoving = false;
  let moveTimeout;
  let distance = 0;

  const keys = {};

  window.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;
    isMoving = true;
    clearTimeout(moveTimeout);
  });

  window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
    moveTimeout = setTimeout(() => {
      isMoving = Object.values(keys).some(v => v === true);
    }, 100);
  });

  const gameLoop = setInterval(() => {
    if (!gameRunning) {
      clearInterval(gameLoop);
      return;
    }

    if (keys['arrowleft'] || keys['a']) playerX -= 8;
    if (keys['arrowright'] || keys['d']) playerX += 8;
    if (keys['arrowup'] || keys['w']) playerY -= 8;
    if (keys['arrowdown'] || keys['s']) playerY += 8;

    playerX = Math.max(0, Math.min(window.innerWidth - 40, playerX));
    playerY = Math.max(0, Math.min(window.innerHeight - 60, playerY));

    player.style.left = playerX + "px";
    player.style.bottom = "auto";
    player.style.top = playerY + "px";

    if (!isMoving && survived > 0) {
      gameRunning = false;
      endGame(false);
      return;
    }

    const dx = playerX - catX;
    const dy = playerY - catY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    distance = Math.floor(dist);

    if (dist > 0) {
      catX += (dx / dist) * catSpeed;
      catY += (dy / dist) * catSpeed;
    }

    cat.style.left = catX + "px";
    cat.style.top = catY + "px";

    survived++;
    timer.textContent = `Survived: ${(survived / 60).toFixed(1)}s | Distance: ${Math.floor(distance)}px`;

    if (dist < 60) {
      gameRunning = false;
      endGame(false);
    } else {
      catSpeed = 2 + (survived / 600);
    }
  }, 16);

  function endGame(won) {
    clearInterval(gameLoop);
    const endScreen = document.createElement("div");
    endScreen.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      z-index: 200;
    `;

    if (won) {
      endScreen.innerHTML = `
        <h1 style="color: #5bd38d; font-size: 48px; margin: 0;">YOU ESCAPED!</h1>
        <p style="color: #8ea0bf; font-size: 20px;">Survived: ${(survived / 60).toFixed(1)}s</p>
      `;
    } else {
      endScreen.innerHTML = `
        <h1 style="color: #ff1493; font-size: 48px; margin: 0;">CAUGHT!</h1>
        <p style="color: #ff69b4; font-size: 20px;">The Cat got you...</p>
        <p style="color: #8ea0bf; font-size: 16px;">Survived: ${(survived / 60).toFixed(1)}s</p>
      `;
    }

    gameArea.appendChild(endScreen);

    setTimeout(() => {
      body.removeChild(chaseOverlay);
      body.style.overflow = "auto";
      catChaseActive = false;
      statusPill.textContent = "Mod Uninstalled";
      statusPill.style.background = "rgba(91, 211, 141, 0.12)";
      statusPill.style.color = "#5bd38d";
    }, 3000);
  }

  const style = document.createElement("style");
  style.textContent = `
    @keyframes catFloat {
      0%, 100% { transform: translateX(-50%) translateY(0); }
      50% { transform: translateX(-50%) translateY(-10px); }
    }
  `;
  document.head.appendChild(style);
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    navButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    filterMods();
  });
});

searchInput.addEventListener("input", filterMods);
launchButton.addEventListener("click", () => {
  statusPill.textContent = "Launching client";
  statusPill.style.background = "rgba(116, 208, 255, 0.12)";
  statusPill.style.color = "#74d0ff";
});

refreshButton.addEventListener("click", () => {
  filterMods();
  statusPill.textContent = "Mod list refreshed";
  statusPill.style.background = "rgba(91, 211, 141, 0.12)";
  statusPill.style.color = "#5bd38d";
  setTimeout(() => {
    statusPill.textContent = "Ready";
  }, 1000);
});

renderMods();
