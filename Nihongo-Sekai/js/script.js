/* ==========================================
   COMMON — NAVIGASI, FOOTER, DAN TEMA
   Dipakai bersama oleh seluruh halaman.
========================================== */

(() => {
  "use strict";

  /* ==========================================
     NAVIGASI MENU TABLET DAN HP
  ========================================== */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    const closeMenu = () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Buka menu");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Tutup menu" : "Buka menu"
      );
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", event => {
      if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });
  }

  /* ==========================================
     TAHUN OTOMATIS PADA FOOTER
  ========================================== */
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* ==========================================
     DARK MODE — SIMPAN DAN TERAPKAN TEMA
  ========================================== */
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const themeStorageKey = "nihongo-theme";

  // localStorage dipakai bila browser mengizinkan penyimpanan.
  const getSavedTheme = () => {
    try {
      return localStorage.getItem(themeStorageKey);
    } catch (error) {
      return null;
    }
  };

  const saveTheme = theme => {
    try {
      localStorage.setItem(themeStorageKey, theme);
    } catch (error) {
      // Tema tetap dapat digunakan untuk sesi halaman ini.
    }
  };

  function applyTheme(theme) {
    const isDark = theme === "dark";

    document.body.classList.toggle("dark-mode", isDark);

    if (themeIcon) {
      themeIcon.textContent = isDark ? "☀️" : "🌙";
    }

    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"
      );
      themeToggle.setAttribute("aria-pressed", String(isDark));
    }

    saveTheme(isDark ? "dark" : "light");
  }

  applyTheme(getSavedTheme() || "light");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark-mode");
      applyTheme(isDark ? "light" : "dark");
    });
  }
})();
