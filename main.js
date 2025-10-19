// Extensions Data
const extensionsData = [
  {
    id: 1,
    name: "DevLens",
    description: "Quickly inspect page layouts and visualize element boundaries.",
    icon: "assets/images/logo-devlens.svg",
    status: "active",
  },
  {
    id: 2,
    name: "StyleSpy",
    description: "Instantly analyze and copy CSS from any webpage element.",
    icon: "assets/images/logo-style-spy.svg",
    status: "active",
  },
  {
    id: 3,
    name: "SpeedBoost",
    description: "Optimizes browser resource usage to accelerate page loading.",
    icon: "assets/images/logo-speed-boost.svg",
    status: "inactive",
  },
  {
    id: 4,
    name: "JSONWizard",
    description: "Formats, validates, and prettifies JSON responses in-browser.",
    icon: "assets/images/logo-json-wizard.svg",
    status: "active",
  },
  {
    id: 5,
    name: "TabMaster Pro",
    description: "Organizes browser tabs into groups and sessions.",
    icon: "assets/images/logo-tab-master-pro.svg",
    status: "inactive",
  },
  {
    id: 6,
    name: "ViewportBuddy",
    description: "Simulates various screen resolutions directly within the browser.",
    icon: "assets/images/logo-viewport-buddy.svg",
    status: "active",
  },
  {
    id: 7,
    name: "Markup Notes",
    description: "Enables annotation and notes directly onto webpages for collaborative debugging.",
    icon: "assets/images/logo-markup-notes.svg",
    status: "active",
  },
  {
    id: 8,
    name: "GridGuides",
    description: "Overlay customizable grids and alignment guides on any webpage.",
    icon: "assets/images/logo-grid-guides.svg",
    status: "inactive",
  },
  {
    id: 9,
    name: "Palette Picker",
    description: "Instantly extracts color palettes from any webpage.",
    icon: "assets/images/logo-palette-picker.svg",
    status: "active",
  },
  {
    id: 10,
    name: "LinkChecker",
    description: "Scans and highlights broken links on any page.",
    icon: "assets/images/logo-link-checker.svg",
    status: "inactive",
  },
  {
    id: 11,
    name: "DOM Snapshot",
    description: "Capture and export DOM structures quickly.",
    icon: "assets/images/logo-dom-snapshot.svg",
    status: "active",
  },
  {
    id: 12,
    name: "ConsolePlus",
    description: "Enhanced developer console with advanced filtering and logging.",
    icon: "assets/images/logo-console-plus.svg",
    status: "active",
  },
];

// Global state
let currentFilter = "all";
let extensions = [...extensionsData]; // Copy of data we can modify

const extensionsContainer = document.getElementById("extensions-container");
const extensionTemplate = document.getElementById("extension-template");
const filterButtons = document.querySelectorAll(".filter-btn");

function renderExtensions(extensionsToRender = extensions) {
  // Add exit animation to existing cards before clearing
  const existingCards = extensionsContainer.querySelectorAll(".extension-card");
  existingCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.05}s`;
    card.style.animation = "slideOut 0.3s ease-in-out forwards";
  });

  // Wait for exit animation to complete, then render new cards
  setTimeout(() => {
    extensionsContainer.innerHTML = "";

    let filteredExtensions = extensionsToRender;
    if (currentFilter !== "all") {
      filteredExtensions = extensionsToRender.filter((ext) => ext.status === currentFilter);
    }

    filteredExtensions.forEach((extension, index) => {
      createExtensionCard(extension, index);
    });
  }, 200);
}

function createExtensionCard(extension, index = 0) {
  const template = extensionTemplate.content.cloneNode(true);
  const card = template.querySelector(".extension-card");

  card.dataset.id = extension.id;

  // Add staggered animation delay
  card.style.animationDelay = `${index * 0.1}s`;
  card.classList.add("card-animate-in");

  const icon = template.querySelector(".extension-icon");
  icon.src = extension.icon;
  icon.alt = `${extension.name} icon`;

  template.querySelector(".extension-name").textContent = extension.name;
  template.querySelector(".extension-description").textContent = extension.description;

  const toggleSwitch = template.querySelector(".status-toggle");

  if (extension.status === "active") {
    toggleSwitch.checked = true;
  } else {
    toggleSwitch.checked = false;
  }

  extensionsContainer.appendChild(template);
}

function filterExtensions(filterType) {
  currentFilter = filterType;

  filterButtons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.filter === filterType) {
      btn.classList.add("active");
    }
  });

  renderExtensions();
}

function removeExtension(extensionId) {
  const cardToRemove = document.querySelector(`[data-id="${extensionId}"]`);

  if (cardToRemove) {
    // Add removal animation
    cardToRemove.style.animation = "slideOut 0.4s ease-in-out forwards";
    cardToRemove.style.transformOrigin = "center";

    // Wait for animation to complete before removing from data
    setTimeout(() => {
      extensions = extensions.filter((ext) => ext.id !== parseInt(extensionId));
      renderExtensions();
    }, 400);
  } else {
    // Fallback if card not found
    extensions = extensions.filter((ext) => ext.id !== parseInt(extensionId));
    renderExtensions();
  }
}

function updateExtensionStatus(extensionId, newStatus) {
  const extension = extensions.find((ext) => ext.id === parseInt(extensionId));
  if (extension) {
    extension.status = newStatus;
  }
}

function setupEventListeners() {
  filterButtons.forEach((button, index) => {
    // Add staggered animation to filter buttons
    button.style.animationDelay = `${index * 0.1}s`;

    button.addEventListener("click", (e) => {
      const filter = e.target.dataset.filter;

      // Add click animation
      e.target.style.transform = "scale(0.95)";
      setTimeout(() => {
        e.target.style.transform = "";
      }, 150);

      filterExtensions(filter);
    });
  });

  extensionsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-button")) {
      const card = e.target.closest(".extension-card");
      const extensionId = card.dataset.id;

      // Add shake animation before removal
      card.style.animation = "shake 0.5s ease-in-out";
      setTimeout(() => {
        removeExtension(extensionId);
      }, 500);
    }
  });

  extensionsContainer.addEventListener("change", (e) => {
    if (e.target.classList.contains("status-toggle")) {
      const card = e.target.closest(".extension-card");
      const extensionId = card.dataset.id;
      const toggleSwitch = e.target;

      const newStatus = e.target.checked ? "active" : "inactive";

      // Add bounce animation to the toggle
      const slider = toggleSwitch.nextElementSibling;
      slider.style.animation = "toggleBounce 0.4s ease-out";
      setTimeout(() => {
        slider.style.animation = "";
      }, 400);

      updateExtensionStatus(extensionId, newStatus);
    }
  });
}
class ThemeManager {
  constructor() {
    this.currentTheme = this.getStoredTheme() || this.getSystemPreference();
    this.darkModeIcon = document.querySelector(".dark-mode-icon");
    this.logo = document.querySelector('img[alt="Extensions logo"]');
    this.init();
  }

  init() {
    this.setTheme(this.currentTheme);
    this.setupEventListeners();
    this.updateIcon();
  }

  getStoredTheme() {
    return localStorage.getItem("theme");
  }

  getSystemPreference() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  setTheme(theme) {
    this.currentTheme = theme;
    document.body.setAttribute("data-theme", theme);
    this.saveTheme(theme);
    this.updateIcon();
    this.updateLogo();
  }

  saveTheme(theme) {
    localStorage.setItem("theme", theme);
  }

  toggleTheme() {
    const newTheme = this.currentTheme === "light" ? "dark" : "light";
    this.setTheme(newTheme);
  }

  updateIcon() {
    const iconImg = this.darkModeIcon.querySelector("img") || this.darkModeIcon;

    if (this.currentTheme === "dark") {
      iconImg.src = "assets/images/icon-sun.svg";
      iconImg.alt = "Switch to light mode";
      this.darkModeIcon.title = "Switch to light mode";
    } else {
      iconImg.src = "assets/images/icon-moon.svg";
      iconImg.alt = "Switch to dark mode";
      this.darkModeIcon.title = "Switch to dark mode";
    }
  }

  updateLogo() {
    if (this.logo) {
      if (this.currentTheme === "dark") {
        this.logo.src = "assets/images/logo-white.svg";
      } else {
        this.logo.src = "assets/images/logo.svg";
      }
    }
  }

  setupEventListeners() {
    // Dark mode toggle click
    this.darkModeIcon.addEventListener("click", () => {
      this.toggleTheme();
    });

    // Listen for system theme changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!this.getStoredTheme()) {
        this.setTheme(e.matches ? "dark" : "light");
      }
    });

    // Keyboard accessibility
    this.darkModeIcon.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }
}

// Animation utility functions
function addPageLoadAnimations() {
  // Animate header elements
  const header = document.querySelector("#header-container");
  if (header) {
    header.style.opacity = "0";
    header.style.transform = "translateY(-20px)";
    setTimeout(() => {
      header.style.transition = "all 0.6s ease-out";
      header.style.opacity = "1";
      header.style.transform = "translateY(0)";
    }, 100);
  }

  // Animate extension list title and filters
  const extensionList = document.querySelector(".extension-list");
  if (extensionList) {
    const title = extensionList.querySelector("h2");
    const filters = extensionList.querySelector(".filter-extensions");

    if (title) {
      title.style.opacity = "0";
      title.style.transform = "translateX(-30px)";
      setTimeout(() => {
        title.style.transition = "all 0.6s ease-out";
        title.style.opacity = "1";
        title.style.transform = "translateX(0)";
      }, 300);
    }

    if (filters) {
      filters.style.opacity = "0";
      filters.style.transform = "translateX(30px)";
      setTimeout(() => {
        filters.style.transition = "all 0.6s ease-out";
        filters.style.opacity = "1";
        filters.style.transform = "translateX(0)";
      }, 500);
    }
  }
}

function init() {
  setupEventListeners();
  renderExtensions();
  addPageLoadAnimations();

  // Initialize theme manager
  new ThemeManager();
}

document.addEventListener("DOMContentLoaded", init);
