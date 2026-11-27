/* ==========================================
   MATERI — PILIHAN LEVEL JLPT
   Script khusus halaman terkait (scope lokal)
========================================== */

(() => {
  "use strict";


  /* ==========================================
     MATERI BARU — PILIHAN LEVEL JLPT
  ========================================== */

  // MATERI — DESKRIPSI SETIAP LEVEL
  const materiLevelDescriptions = {
    N5: [
      "Pemula",
      "Level awal untuk membangun fondasi bahasa Jepang. Cocok untuk mulai mengenal huruf, kosakata, dan ungkapan sederhana."
    ],
    N4: [
      "Dasar",
      "Melanjutkan fondasi dasar dan memahami percakapan serta kalimat sederhana dalam situasi sehari-hari."
    ],
    N3: [
      "Menengah",
      "Tahap penghubung menuju kemampuan menengah, dengan pemahaman bahasa dalam situasi sehari-hari yang lebih luas."
    ],
    N2: [
      "Menengah atas",
      "Mengembangkan pemahaman bahasa Jepang untuk berbagai situasi, termasuk konteks yang lebih kompleks."
    ],
    N1: [
      "Mahir",
      "Tahap lanjutan untuk memahami bahasa Jepang yang lebih luas, abstrak, dan kompleks."
    ]
  };


  // MATERI — ELEMEN HTML
  const materiLevelButtons = document.querySelectorAll(".level-card");
  const materiLevelInfo = document.getElementById("levelInfo");


  // MATERI — NAVIGASI PILIHAN LEVEL
  materiLevelButtons.forEach(button => {
    button.addEventListener("click", () => {
      const level = button.dataset.level;
      const levelData = materiLevelDescriptions[level];

      if (!levelData) return;

      const [label, description] = levelData;

      materiLevelButtons.forEach(item => {
        const selected = item === button;

        item.classList.toggle("selected", selected);
        item.setAttribute("aria-pressed", String(selected));
      });

      if (materiLevelInfo) {
        const mark = materiLevelInfo.querySelector(".level-info-mark");
        const title = materiLevelInfo.querySelector("strong");
        const text = materiLevelInfo.querySelector("p");

        if (mark) mark.textContent = level;
        if (title) title.textContent = `Level ${level} · ${label}`;
        if (text) text.textContent = description;
      }
    });
  });

  // ==========================================
  // MATERI — PILIHAN LEVEL JLPT — AKHIR SCOPE JAVASCRIPT
  // ==========================================
})();
