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
    description: "A chase event where you must keep moving or the Cat catches up. It is a scare scene, not a destructive shutdown.",
    accent: "cat",
    extreme: true
  },
  {
    id: "anime-girl-ai",
    name: "Anime Girl AI",
    category: "story",
    tag: "LOVE CURSE",
    version: "v0.9.8",
    rating: 4.8,
    description: "A fictional cursed anime companion who follows you through the night and becomes visibly angry when ignored.",
    accent: "anime",
    warning: true
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
let animeEventActive = false;

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
      button.textContent = "⚠️ RUN";
      button.addEventListener("click", () => installCatMod(mod.name));
    } else if (mod.warning) {
      button.textContent = "⚠️ WARN";
      button.addEventListener("click", () => installAnimeMod(mod.name));
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
    } else if (mod.accent === "anime") {
      badge.style.background = "linear-gradient(135deg, #ff8fab, #7b61ff)";
      card.style.borderColor = "rgba(123, 97, 255, 0.45)";
      card.style.boxShadow = "0 0 24px rgba(180, 115, 255, 0.28), 0 10px 30px rgba(0,0,0,0.18)";
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

function installAnimeMod(name) {
  statusPill.textContent = `⚠️ WARNING: ${name}`;
  statusPill.style.background = "rgba(255, 0, 97, 0.18)";
  statusPill.style.color = "#ff5fa2";

  setTimeout(() => {
    startAnimeScare();
  }, 600);
}

function startAnimeScare() {
  if (animeEventActive) return;
  animeEventActive = true;

  const body = document.body;
  body.style.overflow = "hidden";

  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, rgba(26, 13, 36, 0.94), rgba(13, 20, 40, 0.96));
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    overflow: hidden;
  `;

  const scene = document.createElement("div");
  scene.style.cssText = `
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: radial-gradient(circle at center, rgba(255, 95, 162, 0.18), rgba(10,12,27,0.9) 40%, rgba(1,1,10,1) 100%);
  `;

  const warning = document.createElement("div");
  warning.style.cssText = `
    position: absolute;
    top: 28px;
    left: 50%;
    transform: translateX(-50%);
    color: #ffd4eb;
    font-size: clamp(18px, 2vw, 32px);
    font-weight: 900;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    text-shadow: 0 0 14px rgba(255, 95, 162, 0.8);
    z-index: 3;
  `;
  warning.textContent = "She is angry";

  const text = document.createElement("div");
  text.style.cssText = `
    position: absolute;
    top: 90px;
    left: 50%;
    transform: translateX(-50%);
    width: min(700px, 80vw);
    color: #f8e7ff;
    text-align: center;
    line-height: 1.7;
    font-size: 18px;
    font-weight: 700;
    z-index: 3;
  `;
  text.textContent = "You ignored her... now she is staring at the screen, whispering your name, and waiting for you to answer.";

  const girl = document.createElement("div");
  girl.style.cssText = `
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 180px;
    height: 220px;
    border-radius: 18px;
    background: linear-gradient(180deg, rgba(255, 155, 199, 0.42), rgba(123, 97, 255, 0.26));
    border: 2px solid rgba(255, 188, 218, 0.48);
    box-shadow: 0 0 22px rgba(255, 95, 162, 0.5), inset 0 0 20px rgba(255,255,255,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 96px;
    z-index: 2;
    animation: pulse 1.8s infinite ease-in-out;
  `;
  girl.textContent = "👧";

  const mood = document.createElement("div");
  mood.style.cssText = `
    position: absolute;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 999px;
    padding: 12px 18px;
    color: #ffd4eb;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    z-index: 3;
  `;
  mood.textContent = "Stay calm";

  const exitButton = document.createElement("button");
  exitButton.textContent = "Close warning";
  exitButton.style.cssText = `
    position: absolute;
    bottom: 110px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255,255,255,0.08);
    color: white;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 12px 18px;
    font-weight: 800;
    cursor: pointer;
    z-index: 4;
  `;
  exitButton.addEventListener("click", closeAnimeScare);

  scene.appendChild(warning);
  scene.appendChild(text);
  scene.appendChild(girl);
  scene.appendChild(mood);
  scene.appendChild(exitButton);
  overlay.appendChild(scene);
  body.appendChild(overlay);

  const style = document.createElement("style");
  style.textContent = `
    @keyframes pulse {
      0%, 100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 18px rgba(255, 95, 162, 0.4); }
      50% { transform: translate(-50%, -50%) scale(1.06); box-shadow: 0 0 30px rgba(255, 95, 162, 0.75); }
    }
  `;
  document.head.appendChild(style);

  const startX = window.innerWidth / 2;
  const startY = window.innerHeight / 2;
  let x = startX;
  let y = startY;
  let angle = 0;

  function animate() {
    angle += 0.04;
    x = startX + Math.sin(angle) * 120;
    y = startY + Math.cos(angle * 1.6) * 70;
    girl.style.left = `${x}px`;
    girl.style.top = `${y}px`;
    requestAnimationFrame(animate);
  }

  animate();

  function closeAnimeScare() {
    body.removeChild(overlay);
    body.style.overflow = "auto";
    animeEventActive = false;
    statusPill.textContent = "Ready";
    statusPill.style.background = "rgba(91, 211, 141, 0.12)";
    statusPill.style.color = "#5bd38d";
    document.head.removeChild(style);
  }
}

function installCatMod(name) {
  statusPill.textContent = `⚠️ RUN: ${name}`;
  statusPill.style.background = "rgba(255, 20, 147, 0.18)";
  statusPill.style.color = "#ff1493";

  setTimeout(() => {
    startCatChase();
  }, 600);
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
    inset: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #140d24 0%, #1d1631 35%, #0d1f2e 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    overflow: hidden;
  `;

  const gameArea = document.createElement("div");
  gameArea.style.cssText = `
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: radial-gradient(circle at center, rgba(255,20,147,0.12), rgba(13,31,46,0.85) 35%, rgba(15,10,20,1) 100%);
  `;

  const statusBanner = document.createElement("div");
  statusBanner.style.cssText = `
    position: absolute;
    top: 24px;
    left: 50%;
    transform: translateX(-50%);
    color: #ffb5d8;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-size: 18px;
    text-shadow: 0 0 12px rgba(255,20,147,0.7);
  `;
  statusBanner.textContent = "The Cat in the Hat is chasing you";

  const instructions = document.createElement("div");
  instructions.style.cssText = `
    position: absolute;
    top: 64px;
    left: 24px;
    color: #dfeaff;
    font-size: 15px;
    font-weight: 700;
    max-width: 360px;
    line-height: 1.6;
  `;
  instructions.textContent = "Move with WASD or arrow keys. If you stop moving too long, the Cat catches up. This is a scare scene and resets safely.";

  const timer = document.createElement("div");
  timer.style.cssText = `
    position: absolute;
    top: 24px;
    right: 24px;
    color: #ffa857;
    font-size: 18px;
    font-weight: 800;
  `;
  timer.textContent = "Survival: 0.0s";

  const player = document.createElement("div");
  player.style.cssText = `
    position: absolute;
    width: 32px;
    height: 52px;
    background: linear-gradient(135deg, #74d0ff, #3ec6ff);
    border-radius: 10px;
    left: 50%;
    top: 72%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 16px rgba(116,208,255,0.7);
    z-index: 2;
  `;

  const cat = document.createElement("div");
  cat.style.cssText = `
    position: absolute;
    width: 56px;
    height: 56px;
    left: 50%;
    top: 18%;
    transform: translateX(-50%);
    font-size: 52px;
    filter: drop-shadow(0 0 12px rgba(255,20,147,0.7));
    z-index: 1;
  `;
  cat.textContent = "🎩";

  const resetButton = document.createElement("button");
  resetButton.textContent = "Exit Chase";
  resetButton.style.cssText = `
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255,255,255,0.08);
    color: white;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 12px 18px;
    font-weight: 800;
    cursor: pointer;
    z-index: 3;
  `;
  resetButton.addEventListener("click", () => {
    cleanupCatChase();
  });

  gameArea.appendChild(statusBanner);
  gameArea.appendChild(instructions);
  gameArea.appendChild(timer);
  gameArea.appendChild(cat);
  gameArea.appendChild(player);
  gameArea.appendChild(resetButton);
  chaseOverlay.appendChild(gameArea);
  body.appendChild(chaseOverlay);

  const keys = {};
  let playerX = window.innerWidth / 2 - 16;
  let playerY = window.innerHeight - 180;
  let catX = window.innerWidth / 2 - 28;
  let catY = 100;
  let lastMove = performance.now();
  let lastFrame = performance.now();
  let elapsed = 0;
  let chaseLoopId = null;

  const handleKeydown = (event) => {
    const key = event.key.toLowerCase();
    if (["arrowleft", "arrowright", "arrowup", "arrowdown", "a", "d", "w", "s"].includes(key) || key === " ") {
      event.preventDefault();
    }
    keys[key] = true;
    lastMove = performance.now();
  };

  const handleKeyup = (event) => {
    keys[event.key.toLowerCase()] = false;
  };

  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);

  function cleanupCatChase() {
    if (chaseLoopId) clearInterval(chaseLoopId);
    window.removeEventListener("keydown", handleKeydown);
    window.removeEventListener("keyup", handleKeyup);
    body.removeChild(chaseOverlay);
    body.style.overflow = "auto";
    catChaseActive = false;
    statusPill.textContent = "Ready";
    statusPill.style.background = "rgba(91, 211, 141, 0.12)";
    statusPill.style.color = "#5bd38d";
  }

  chaseLoopId = setInterval(() => {
    const now = performance.now();
    const dt = (now - lastFrame) / 1000;
    lastFrame = now;
    elapsed += dt;

    if (keys["arrowleft"] || keys["a"]) playerX -= 260 * dt;
    if (keys["arrowright"] || keys["d"]) playerX += 260 * dt;
    if (keys["arrowup"] || keys["w"]) playerY -= 260 * dt;
    if (keys["arrowdown"] || keys["s"]) playerY += 260 * dt;

    playerX = Math.max(12, Math.min(window.innerWidth - 44, playerX));
    playerY = Math.max(12, Math.min(window.innerHeight - 88, playerY));

    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;

    const dx = playerX - catX;
    const dy = playerY - catY;
    const dist = Math.hypot(dx, dy);

    let catSpeed = 120 + elapsed * 6;
    if (dist > 0) {
      catX += (dx / dist) * catSpeed * dt;
      catY += (dy / dist) * catSpeed * dt;
    }

    cat.style.left = `${catX}px`;
    cat.style.top = `${catY}px`;

    const idleFor = now - lastMove;
    if (idleFor > 1800) {
      const freezeMessage = document.createElement("div");
      freezeMessage.style.cssText = `
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ff1493;
        font-size: 42px;
        font-weight: 900;
        text-align: center;
        background: rgba(0,0,0,0.42);
        z-index: 4;
      `;
      freezeMessage.textContent = "You froze... the Cat got closer.";
      gameArea.appendChild(freezeMessage);
      setTimeout(() => {
        if (gameArea.contains(freezeMessage)) gameArea.removeChild(freezeMessage);
      }, 1200);
      lastMove = now;
    }

    if (dist < 42) {
      statusPill.textContent = "Caught by the Cat";
      statusPill.style.background = "rgba(255, 20, 147, 0.2)";
      statusPill.style.color = "#ff1493";

      const finalText = document.createElement("div");
      finalText.style.cssText = `
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 42px;
        font-weight: 900;
        text-align: center;
        background: rgba(0,0,0,0.66);
        z-index: 5;
      `;
      finalText.innerHTML = `
        <div style="color:#ff1493; margin-bottom:12px;">CAUGHT!</div>
        <div style="font-size:22px; color:#dfeaff;">The Cat in the Hat wins this round.</div>
      `;
      gameArea.appendChild(finalText);

      setTimeout(() => {
        cleanupCatChase();
      }, 2000);

      clearInterval(chaseLoopId);
    }

    timer.textContent = `Survival: ${(elapsed).toFixed(1)}s`;
  }, 16);
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
