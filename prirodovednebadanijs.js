const PROJECTS_DATA = [
  {
    id: 1,
    title: "Prázdné",
    author: "Prázdné",
    category: "Ekologie",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
    snippet: "Chemický a biologický rozbor vody vzaté ze tří různých úseků potoka.",
    description: "Cílem projektu bylo zjistit, zda má blízká průmyslová zóna negativní vliv na kvalitu vody v místním toku. Vzorky byly odebírány po dobu tří týdnů.",
    methodology: "Měřili jsme pH, pH pufry, přítomnost dusičnanů a pozorovali mikroskopické organismy (snímky z mikroskopu).",
    results: "Voda vykazuje mírně zvýšený obsah dusičnanů u dolního toku, ale celkově je stav vody podle biologických indikátorů dobrý."
  },
  {
    id: 2,
    title: "Prázdné",
    author: "Prázdné",
    category: "Biologie",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80",
    snippet: "Srovnání růstu hrachu pod červeným, modrým a přirozeným denním světlem.",
    description: "Pokus sledoval rychlost klíčení a přírůstek stonku u sazenic hrachu pod odlišným LED osvětlením po dobu 14 dnů.",
    methodology: "Tři stejné nádoby se semeny, stejná zálivka i teplota. Měření výšky probíhalo každý den v 17:00.",
    results: "Rostliny pod modrým světlem měly silnější stonky, pod červeným světlem rostly rychleji do výšky, ale byly slabší."
  },
  {
    id: 3,
    title: "Prázdné",
    author: "Prázdné",
    category: "Chemie",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=600&q=80",
    snippet: "Kvantitativní analýza tlaku vznikajícího při reakci kyseliny octové a hydrogenuhličitanu sodného.",
    description: "Projekt zkoumá ideální poměr reaktantů pro dosažení maximálního tlaku v uzavřené komoře pro výstup modelu.",
    methodology: "Měření reakční rychlosti v plastovém reaktoru s tlakovým čidlem spojeným s měřicí kartou.",
    results: "Nejvyššího tlaku bylo dosaženo při poměru 100 ml 8% octa na 15 g jedlé sody."
  }
];

let activeCategory = "all";
let searchQuery = "";

const projectsGrid = document.getElementById("projectsGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.getElementById("filterButtons");

const projectModal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalAuthor = document.getElementById("modalAuthor");
const modalDescription = document.getElementById("modalDescription");
const modalMethodology = document.getElementById("modalMethodology");
const modalResults = document.getElementById("modalResults");

function renderProjects() {
  const filtered = PROJECTS_DATA.filter(project => {
    const matchesCategory = activeCategory === "all" || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery) ||
                          project.author.toLowerCase().includes(searchQuery) ||
                          project.snippet.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    projectsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem;">Žádné projekty neodpovídají zadaným kritériím.</p>`;
    return;
  }

  projectsGrid.innerHTML = filtered.map(project => `
    <article class="project-card">
      <img src="${project.image}" alt="${project.title}" class="card-image">
      <div class="card-body">
        <span class="badge">${project.category}</span>
        <h2 class="card-title">${project.title}</h2>
        <div class="card-author">${project.author}</div>
        <p class="card-snippet">${project.snippet}</p>
        <button class="btn-detail" onclick="openModal(${project.id})">Zobrazit detail</button>
      </div>
    </article>
  `).join("");
}

function openModal(projectId) {
  const project = PROJECTS_DATA.find(p => p.id === projectId);
  if (!project) return;

  modalTitle.textContent = project.title;
  modalCategory.textContent = project.category;
  modalAuthor.textContent = `Autor: ${project.author}`;
  modalDescription.textContent = project.description;
  modalMethodology.textContent = project.methodology;
  modalResults.textContent = project.results;

  projectModal.classList.add("open");
}

function closeModal() {
  projectModal.classList.remove("open");
}

searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value.toLowerCase().trim();
  renderProjects();
});

filterButtons.addEventListener("click", (e) => {
  if (e.target.classList.contains("filter-btn")) {
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");
    activeCategory = e.target.dataset.category;
    renderProjects();
  }
});

modalClose.addEventListener("click", closeModal);
projectModal.addEventListener("click", (e) => {
  if (e.target === projectModal) closeModal();
});

renderProjects();