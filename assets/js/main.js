// Samuel Adiprabowo — site scripts
// 1) Highlights the active nav link based on pathname.
// 2) Injects a light/dark theme toggle into the masthead and persists the choice.

(function () {
  // --- Active nav link highlight ---
  const navLinks = document.querySelectorAll(".site-nav a");
  const path = window.location.pathname.split("/").filter(Boolean);
  const section = path[0] || "about";

  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const target = href.split("/").filter(Boolean)[0] || "";

    const isActive =
      (target === "" && section === "about") ||
      (target === "index.html" && section === "about") ||
      target === section;

    if (isActive) {
      link.classList.add("active");
    }
  });

  // --- Theme toggle ---
  function updateToggleLabel(theme) {
    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      const icon = theme === "dark" ? "\u2600" : "\u263E"; // ☀ (switch to light) / ☾ (switch to dark)
      btn.innerHTML = '<span class="theme-toggle__icon">' + icon + "</span>";
    });
  }

  function injectToggle() {
    const nav = document.querySelector(".site-nav");
    if (!nav) return;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-toggle";
    btn.setAttribute("aria-label", "Toggle light/dark mode");
    btn.title = "Toggle light/dark mode";
    btn.addEventListener("click", () => {
      const current =
        document.documentElement.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* storage unavailable */
      }
      updateToggleLabel(next);
    });

    nav.appendChild(btn);
  }

  injectToggle();

  // Show the correct label icon for the currently active theme (default dark).
  function currentTheme() {
    const stored = document.documentElement.getAttribute("data-theme");
    return stored || "dark";
  }

  updateToggleLabel(currentTheme());
})();