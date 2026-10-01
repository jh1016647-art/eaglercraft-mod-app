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
    button.addEventListener("click", () => installMod(mod.name));

    if (mod.accent === "verity") {
      badge.style.background = "linear-gradient(135deg, #74d0ff, #9eb7ff)";
    } else if (mod.accent === "fnaf") {
      badge.style.background = "linear-gradient(135deg, #ff7dcf, #ff9b71)";
    } else if (mod.accent === "curse") {
      badge.style.background = "linear-gradient(135deg, #ffa857, #ffd56b)";
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
