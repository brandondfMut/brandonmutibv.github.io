const projects = {
  "ai-training": {
    title:"AI Training for Teachers", kicker:"Campaign flyer · Sakiso Digital",
    image:"assets/ai-training.jpg",
    description:"A recruitment flyer for Sakiso Digital's school-based AI training programme, designed to put the offer in front of school leadership at a glance. The supplied portfolio describes a tailored curriculum, on-site delivery across Zimbabwe and certification on completion.",
    client:"Sakiso Digital", deliverable:"Print + digital flyer", tools:"Photoshop, Canva", results:"Not specified in supplied portfolio"
  },
  starlink: {
    title:"Stay Connected, Anywhere", kicker:"Product / pricing flyer · Sakiso Digital × Starlink",
    image:"assets/starlink.jpg",
    description:"A pricing and package flyer for Starlink connectivity kits sold and installed through Sakiso Digital. The design uses product photography and a clean breakdown of kit, consultancy and setup information.",
    client:"Sakiso Digital", deliverable:"Product / pricing flyer", tools:"Photoshop, Canva", results:"Not specified in supplied portfolio"
  },
  elshebab: {
    title:"El Shebab EP Launch", kicker:"Event poster · Platinum FM",
    image:"assets/el-shebab.jpg",
    description:"An event poster for Stan Culture's El Shebab EP launch, broadcast live on Platinum FM. The supplied portfolio notes a darker editorial photo treatment and heavy display type while keeping event details legible.",
    client:"Platinum FM", deliverable:"Event poster", tools:"Photoshop", results:"Not specified in supplied portfolio"
  },
  selected: {
    title:"Selected Work / 2026", kicker:"Campaign graphics · client collateral · community",
    image:"assets/selected-work.jpg",
    description:"A contact sheet of recent design work spanning AI and education campaigns, client and product design, and culture and community pieces.",
    client:"Multiple clients / organisations", deliverable:"Mixed portfolio work", tools:"Various", results:"Not specified in supplied portfolio"
  },
  church: {
    title:"Church Flyer Designs", kicker:"Community communications",
    image:"assets/church-flyers.jpg",
    description:"A selection of church flyer designs from Brandon's graphic design portfolio, showing event-led visual communication across community and faith contexts.",
    client:"Community / church work", deliverable:"Flyers and social graphics", tools:"Not specified on supplied page", results:"Not specified"
  },
  personalised: {
    title:"Personalised Designs", kicker:"Event and personal graphics",
    image:"assets/personalised-designs.jpg",
    description:"A selection of personalised visual pieces from the supplied portfolio, including birthday and event-oriented designs.",
    client:"Various", deliverable:"Personalised graphics", tools:"Not specified on supplied page", results:"Not specified"
  },
  other: {
    title:"Other Creative Work", kicker:"Print · branding · advertising",
    image:"assets/other-designs.jpg",
    description:"Additional design work including a graphic design print ad, logo design and activity advertising.",
    client:"Various", deliverable:"Print ad, logo and activity ad", tools:"Not specified on supplied page", results:"Not specified"
  },
  photography: {
    title:"Photography Work", kicker:"Photography · nature",
    image:"assets/photography.jpg",
    description:"Nature photography from the supplied graphic design portfolio, extending Brandon's practice beyond layout and campaign graphics into image-making.",
    client:"Personal / portfolio work", deliverable:"Photography", tools:"Not specified on supplied page", results:"Not specified"
  },
  program: {
    title:"Program Designs", kicker:"Programme / print design",
    image:"assets/program-designs.jpg",
    description:"A selection of programme designs presented in the supplied portfolio.",
    client:"Various", deliverable:"Programme designs", tools:"Not specified on supplied page", results:"Not specified"
  },
  more: {
    title:"More Work", kicker:"Mixed recent work",
    image:"assets/more-work.jpg",
    description:"A wider selection of recent work including campaign flyers, product flyers, conference materials, certificates and social content.",
    client:"Multiple clients / organisations", deliverable:"Mixed creative collateral", tools:"Photoshop, Canva and other tools listed in portfolio", results:"Not specified in supplied portfolio"
  }
};

const nav = document.querySelector(".nav");
const menuToggle = document.querySelector(".menu-toggle");
menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});
document.querySelectorAll(".nav-link").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 20));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add("in-view"); });
},{threshold:.08});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".project-card");
filters.forEach(filter => filter.addEventListener("click", () => {
  filters.forEach(f => f.classList.remove("active"));
  filter.classList.add("active");
  const value = filter.dataset.filter;
  cards.forEach(card => {
    const match = value === "all" || card.dataset.category.split(" ").includes(value);
    card.classList.toggle("hidden", !match);
  });
}));

const modal = document.getElementById("projectModal");
const modalImage = document.getElementById("modalImage");
function openProject(id){
  const p = projects[id]; if(!p) return;
  modalImage.src = p.image;
  modalImage.alt = p.title;
  document.getElementById("modalKicker").textContent = p.kicker;
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalDescription").textContent = p.description;
  document.getElementById("modalClient").textContent = p.client;
  document.getElementById("modalDeliverable").textContent = p.deliverable;
  document.getElementById("modalTools").textContent = p.tools;
  document.getElementById("modalResults").textContent = p.results;
  modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden";
}
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow="";}
document.querySelectorAll(".project-card").forEach(card => card.addEventListener("click", e => {
  if(e.target.closest("button") || e.currentTarget) openProject(card.dataset.project);
}));
document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => { if(e.key === "Escape") closeModal(); });

const sections = [...document.querySelectorAll("main section[id]")];
const links = [...document.querySelectorAll(".nav-link")];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#"+entry.target.id));
    }
  });
},{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s => sectionObserver.observe(s));

document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.currentTarget);
  const subject = encodeURIComponent(`Project inquiry from ${f.get("name")}`);
  const body = encodeURIComponent(
`Name: ${f.get("name")}
Email: ${f.get("email")}
Project type: ${f.get("type")}
Budget: ${f.get("budget")}

Message:
${f.get("message")}`);
  window.location.href = `mailto:brandonmutibvu@gmail.com?subject=${subject}&body=${body}`;
});
