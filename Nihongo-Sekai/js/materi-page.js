/* ==========================================
   MATERI BARU — INTERAKSI PILIHAN LEVEL
   Script khusus materi.html
   Tidak mengubah js/materi.js milik beranda.
========================================== */

(() => {
  "use strict";

  /* MATERI BARU — DESKRIPSI LEVEL JLPT */
  const levelDescriptions = {
    N5: {
      label: "Pemula",
      description: "Level awal untuk membangun fondasi bahasa Jepang. Kamu akan mulai mengenal kosakata, kanji dasar, pola kalimat sederhana, serta latihan membaca dan mendengarkan."
    },

    N4: {
      label: "Dasar",
      description: "Melanjutkan fondasi dasar dan memperluas pemahaman kalimat, kosakata, serta percakapan sederhana dalam situasi sehari-hari."
    },

    N3: {
      label: "Menengah",
      description: "Tahap penghubung menuju kemampuan menengah dengan materi dan pemahaman bahasa Jepang dalam situasi sehari-hari yang lebih luas."
    },

    N2: {
      label: "Menengah atas",
      description: "Mengembangkan kemampuan memahami bahasa Jepang dalam berbagai situasi, termasuk bacaan dan percakapan dengan konteks yang lebih kompleks."
    },

    N1: {
      label: "Mahir",
      description: "Tahap lanjutan untuk mengembangkan pemahaman bahasa Jepang yang lebih luas, abstrak, dan kompleks."
    }
  };


  /* MATERI BARU — ELEMEN HALAMAN */
  const levelButtons = document.querySelectorAll(
    ".materi-level-grid .level-card"
  );

  const levelInfoMark = document.querySelector(
    ".materi-level-info .level-info-mark"
  );

  const levelInfoTitle = document.getElementById("levelInfoTitle");

  const levelInfoDescription = document.getElementById(
    "levelInfoDescription"
  );

  const levelCategories = document.getElementById("levelCategories");

  const categoryTitle = document.getElementById("categoryTitle");


  /* MATERI BARU — PILIH LEVEL DAN TAMPILKAN KATEGORI */
  levelButtons.forEach(button => {

    button.addEventListener("click", () => {

      const level = button.dataset.level;
      const selectedLevel = levelDescriptions[level];

      if (!selectedLevel) return;


      /* TANDA LEVEL YANG DIPILIH */
      levelButtons.forEach(item => {

        const isSelected = item === button;

        item.classList.toggle("selected", isSelected);

        item.setAttribute(
          "aria-pressed",
          String(isSelected)
        );

      });


      /* PERBARUI INFORMASI LEVEL */
      if (levelInfoMark) {
        levelInfoMark.textContent = level;
      }

      if (levelInfoTitle) {
        levelInfoTitle.textContent =
          `Level ${level} · ${selectedLevel.label}`;
      }

      if (levelInfoDescription) {
        levelInfoDescription.textContent =
          selectedLevel.description;
      }


      /* TAMPILKAN KATEGORI LEVEL */
      if (categoryTitle) {
        categoryTitle.textContent =
          `Kategori Level ${level}`;
      }

      if (levelCategories) {
        levelCategories.hidden = false;
      }

    });

  });

})();