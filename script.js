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
    category: "horror",
    tag: "EXTREME",
    version: "v0.9.1",
    rating: 4.8,
    description: "A stylized anime-inspired ghost scene with glowing eyes, drifting hair, and a quiet classroom dread that resets safely.",
    accent: "anime",
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
let animeSceneActive = false;

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
      button.addEventListener("click", () => {
        if (mod.id === "anime-girl-ai") {
          installAnimeGirlMod(mod.name);
        } else {
          installCatMod(mod.name);
        }
      });
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
      badge.style.background = "linear-gradient(135deg, #9a4dff, #ff5ba8)";
      card.style.borderColor = "rgba(154, 77, 255, 0.45)";
      card.style.boxShadow = "0 0 28px rgba(154, 77, 255, 0.22), 0 12px 30px rgba(0,0,0,0.2)";
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
  statusPill.textContent = `⚠️ RUN: ${name}`;
  statusPill.style.background = "rgba(255, 20, 147, 0.18)";
  statusPill.style.color = "#ff1493";

  setTimeout(() => {
    startCatChase();
  }, 600);
}

function installAnimeGirlMod(name) {
  statusPill.textContent = `⚠️ RUN: ${name}`;
  statusPill.style.background = "rgba(154, 77, 255, 0.18)";
  statusPill.style.color = "#d39dff";

  setTimeout(() => {
    startAnimeGirlScene();
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

function startAnimeGirlScene() {
  if (animeSceneActive) return;
  animeSceneActive = true;

  const body = document.body;
  body.style.overflow = "hidden";

  const overlay = document.createElement("div");
  overlay.id = "anime-scene-overlay";
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(180deg, rgba(15, 12, 25, 0.96) 0%, rgba(26, 15, 30, 0.96) 35%, rgba(11, 14, 32, 1) 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    overflow: hidden;
  `;

  const scene = document.createElement("div");
  scene.style.cssText = `
    position: relative;
    width: min(100%, 1100px);
    height: min(100%, 700px);
    overflow: hidden;
    border-radius: 28px;
    background: radial-gradient(circle at 50% 30%, rgba(182, 112, 255, 0.18), rgba(24, 12, 30, 0.9) 32%, rgba(8, 10, 16, 1) 100%);
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 0 40px rgba(154, 77, 255, 0.22);
  `;

  const title = document.createElement("div");
  title.style.cssText = `
    position: absolute;
    top: 28px;
    left: 50%;
    transform: translateX(-50%);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #f7d9ff;
    font-weight: 900;
    font-size: 18px;
    text-shadow: 0 0 16px rgba(205, 112, 255, 0.8);
  `;
  title.textContent = "AI Ghost Room";

  const text = document.createElement("div");
  text.style.cssText = `
    position: absolute;
    top: 70px;
    left: 30px;
    width: 320px;
    color: #dfeaff;
    font-size: 15px;
    line-height: 1.7;
    font-weight: 700;
    text-shadow: 0 0 14px rgba(255,255,255,0.12);
  `;
  text.textContent = "Stay still for too long and the room starts listening. This is a safe, stylized scare scene—nothing harmful, just eerie atmosphere.";

  const girlWrap = document.createElement("div");
  girlWrap.style.cssText = `
    position: absolute;
    left: 50%;
    top: 56%;
    transform: translate(-50%, -50%);
    width: 220px;
    height: 360px;
    filter: drop-shadow(0 0 18px rgba(238, 144, 255, 0.35));
    z-index: 2;
  `;

  const hair = document.createElement("div");
  hair.style.cssText = `
    position: absolute;
    left: 50%;
    top: 10px;
    width: 170px;
    height: 190px;
    transform: translateX(-50%);
    background: linear-gradient(180deg, rgba(31, 12, 36, 0.9), rgba(10, 10, 18, 0.95));
    border-radius: 48% 52% 42% 58% / 56% 48% 52% 44%;
    box-shadow: inset 0 0 18px rgba(255,255,255,0.08);
  `;

  const face = document.createElement("div");
  face.style.cssText = `
    position: absolute;
    left: 50%;
    top: 86px;
    width: 94px;
    height: 104px;
    transform: translateX(-50%);
    background: linear-gradient(180deg, rgba(245, 220, 255, 0.92), rgba(232, 203, 245, 0.74));
    border-radius: 42% 42% 46% 46%;
    box-shadow: inset 0 0 22px rgba(255,255,255,0.18);
  `;

  const eyeLeft = document.createElement("div");
  eyeLeft.style.cssText = `
    position: absolute;
    left: 50%;
    top: 120px;
    width: 16px;
    height: 18px;
    transform: translateX(-30px);
    background: linear-gradient(180deg, #f0f5ff, #7fd3ff);
    border-radius: 50%;
    box-shadow: 0 0 12px rgba(127,211,255,0.8);
  `;

  const eyeRight = document.createElement("div");
  eyeRight.style.cssText = `
    position: absolute;
    left: 50%;
    top: 120px;
    width: 16px;
    height: 18px;
    transform: translateX(14px);
    background: linear-gradient(180deg, #f0f5ff, #7fd3ff);
    border-radius: 50%;
    box-shadow: 0 0 12px rgba(127,211,255,0.8);
  `;

  const smile = document.createElement("div");
  smile.style.cssText = `
    position: absolute;
    left: 50%;
    top: 154px;
    width: 30px;
    height: 16px;
    transform: translateX(-50%);
    border-bottom: 4px solid rgba(77, 33, 67, 0.7);
    border-radius: 0 0 18px 18px;
  `;

  const body = document.createElement("div");
  body.style.cssText = `
    position: absolute;
    left: 50%;
    bottom: 30px;
    width: 110px;
    height: 140px;
    transform: translateX(-50%);
    background: linear-gradient(180deg, rgba(96, 72, 164, 0.9), rgba(45, 33, 78, 0.9));
    border-radius: 18px 18px 24px 24px;
    box-shadow: inset 0 0 24px rgba(255,255,255,0.06);
  `;

  const armLeft = document.createElement("div");
  armLeft.style.cssText = `
    position: absolute;
    left: 25px;
    bottom: 48px;
    width: 22px;
    height: 90px;
    background: rgba(50, 35, 82, 0.8);
    border-radius: 30px;
    transform: rotate(18deg);
  `;

  const armRight = document.createElement("div");
  armRight.style.cssText = `
    position: absolute;
    right: 25px;
    bottom: 48px;
    width: 22px;
    height: 90px;
    background: rgba(50, 35, 82, 0.8);
    border-radius: 30px;
    transform: rotate(-18deg);
  `;

  const shadow = document.createElement("div");
  shadow.style.cssText = `
    position: absolute;
    left: 50%;
    bottom: 10px;
    width: 190px;
    height: 30px;
    transform: translateX(-50%);
    background: rgba(0,0,0,0.45);
    border-radius: 50%;
    filter: blur(12px);
  `;

  girlWrap.appendChild(hair);
  girlWrap.appendChild(face);
  girlWrap.appendChild(eyeLeft);
  girlWrap.appendChild(eyeRight);
  girlWrap.appendChild(smile);
  girlWrap.appendChild(body);
  girlWrap.appendChild(armLeft);
  girlWrap.appendChild(armRight);
  girlWrap.appendChild(shadow);

  const exitButton = document.createElement("button");
  exitButton.textContent = "Exit Scene";
  exitButton.style.cssText = `
    position: absolute;
    bottom: 22px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 18px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.08);
    color: white;
    font-weight: 800;
    cursor: pointer;
    z-index: 4;
  `;

  exitButton.addEventListener("click", () => cleanupAnimeGirlScene());

  scene.appendChild(title);
  scene.appendChild(text);
  scene.appendChild(girlWrap);
  scene.appendChild(exitButton);
  overlay.appendChild(scene);
  body.appendChild(overlay);

  let animFrame = null;
  let phase = 0;

  function animateScene() {
    phase += 0.03;
    const driftX = Math.sin(phase) * 28;
    const driftY = Math.cos(phase * 1.6) * 18;
    const sway = Math.sin(phase * 1.3) * 8;
    girlWrap.style.transform = `translate(-50%, -50%) translate(${driftX}px, ${driftY}px) rotate(${sway}deg)`;
    eyeLeft.style.transform = `translateX(-30px) scale(${1 + Math.sin(phase * 2.5) * 0.15})`;
    eyeRight.style.transform = `translateX(14px) scale(${1 + Math.sin(phase * 2.5 + 0.7) * 0.15})`;
    animFrame = requestAnimationFrame(animateScene);
  }

  function cleanupAnimeGirlScene() {
    if (animFrame) cancelAnimationFrame(animFrame);
    body.removeChild(overlay);
    body.style.overflow = "auto";
    animeSceneActive = false;
    statusPill.textContent = "Ready";
    statusPill.style.background = "rgba(91, 211, 141, 0.12)";
    statusPill.style.color = "#5bd38d";
  }

  animateScene();
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
