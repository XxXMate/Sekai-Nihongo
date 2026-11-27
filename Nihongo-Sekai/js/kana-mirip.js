/* ==========================================
   KANA MIRIP — PEMBELAJARAN DAN KUIS
   Script khusus halaman terkait (scope lokal)
========================================== */

(() => {
  "use strict";


  /* ==========================================
     KANA MIRIP BARU — DATA PASANGAN HURUF
  ========================================== */

  const similarKanaData = {
    hiragana: [
      {
        first: "ぬ",
        firstRomaji: "NU",
        second: "め",
        secondRomaji: "ME",
        title: "ぬ (NU) dan め (ME)",
        intro: "Kedua huruf memiliki bentuk lengkung yang sekilas terlihat mirip.",
        difference: "ぬ memiliki bagian akhir yang membentuk lingkaran kecil dengan ekor. め memiliki lengkungan yang menyilang tanpa membentuk lingkaran seperti ぬ.",
        tip: "Ingat ぬ memiliki putaran kecil seperti simpul di bagian akhir. め tidak memiliki putaran tersebut.",
        questions: [
          { kana: "ぬ", answer: "nu", other: "me" },
          { kana: "め", answer: "me", other: "nu" }
        ]
      },
      {
        first: "れ",
        firstRomaji: "RE",
        second: "わ",
        secondRomaji: "WA",
        title: "れ (RE) dan わ (WA)",
        intro: "Keduanya memiliki bentuk lengkungan di bagian bawah.",
        difference: "れ memiliki goresan akhir yang memanjang ke kanan. わ memiliki bentuk lengkung yang lebih tertutup dan ujungnya mengarah ke dalam.",
        tip: "Perhatikan bagian bawah huruf. れ memiliki ekor yang lebih jelas memanjang ke kanan, sedangkan わ membentuk lengkungan.",
        questions: [
          { kana: "れ", answer: "re", other: "wa" },
          { kana: "わ", answer: "wa", other: "re" }
        ]
      },
      {
        first: "る",
        firstRomaji: "RU",
        second: "ろ",
        secondRomaji: "RO",
        title: "る (RU) dan ろ (RO)",
        intro: "Kedua huruf mempunyai bentuk melengkung yang hampir serupa.",
        difference: "る memiliki putaran kecil pada bagian bawah yang membentuk lengkungan seperti kait. ろ tidak memiliki putaran tersebut dan berakhir dengan goresan yang lebih sederhana.",
        tip: "Ingat bahwa る memiliki putaran kecil di bagian bawah, sedangkan ろ lebih sederhana.",
        questions: [
          { kana: "る", answer: "ru", other: "ro" },
          { kana: "ろ", answer: "ro", other: "ru" }
        ]
      }
    ],

    katakana: [
      {
        first: "シ",
        firstRomaji: "SHI",
        second: "ツ",
        secondRomaji: "TSU",
        title: "シ (SHI) dan ツ (TSU)",
        intro: "Keduanya memiliki tiga goresan dan sering tertukar karena bentuknya mirip.",
        difference: "シ memiliki dua goresan pendek yang cenderung mengarah ke kiri, sedangkan ツ memiliki dua goresan pendek yang cenderung mengarah ke atas.",
        tip: "Perhatikan arah dua goresan pendeknya. シ lebih mendatar, sedangkan ツ lebih tegak.",
        questions: [
          { kana: "シ", answer: "shi", other: "tsu" },
          { kana: "ツ", answer: "tsu", other: "shi" }
        ]
      },
      {
        first: "ソ",
        firstRomaji: "SO",
        second: "ン",
        secondRomaji: "N",
        title: "ソ (SO) dan ン (N)",
        intro: "Kedua huruf ini memiliki dua goresan yang sekilas terlihat serupa.",
        difference: "ソ memiliki goresan pendek di bagian atas yang lebih tegak, sedangkan ン memiliki goresan pendek yang lebih mendatar. Arah goresan panjangnya juga berbeda.",
        tip: "Perhatikan arah goresan pendek dan panjang. Jangan hanya melihat bentuk keseluruhannya.",
        questions: [
          { kana: "ソ", answer: "so", other: "n" },
          { kana: "ン", answer: "n", other: "so" }
        ]
      },

      /* KATAKANA BARU — NO DAN SO */
      {
        first: "ノ",
        firstRomaji: "NO",
        second: "ソ",
        secondRomaji: "SO",
        title: "ノ (NO) dan ソ (SO)",
        intro: "Kedua huruf memiliki goresan miring yang sekilas bisa membingungkan.",
        difference: "ノ terdiri dari satu goresan miring. ソ terdiri dari dua goresan, yaitu satu goresan pendek di bagian atas dan satu goresan panjang yang miring.",
        tip: "Perhatikan goresan pendek di bagian atas. ソ memilikinya, sedangkan ノ hanya memiliki satu goresan panjang.",
        questions: [
          { kana: "ノ", answer: "no", other: "so" },
          { kana: "ソ", answer: "so", other: "no" }
        ]
      }
    ]
  };


  /* ==========================================
     KANA MIRIP BARU — ELEMEN HTML
  ========================================== */

  const kanaTypeButtons = document.querySelectorAll(".kana-type-button");
  const similarKanaGrid = document.getElementById("similarKanaGrid");
  const pairListTitle = document.getElementById("pairListTitle");

  const similarKanaDetail = document.getElementById("similarKanaDetail");
  const similarDetailTitle = document.getElementById("similarDetailTitle");
  const similarDetailIntro = document.getElementById("similarDetailIntro");

  const similarKanaFirst = document.getElementById("similarKanaFirst");
  const similarKanaFirstRomaji = document.getElementById("similarKanaFirstRomaji");
  const similarKanaSecond = document.getElementById("similarKanaSecond");
  const similarKanaSecondRomaji = document.getElementById("similarKanaSecondRomaji");

  const similarDifference = document.getElementById("similarDifference");
  const similarMemoryTip = document.getElementById("similarMemoryTip");

  const startSimilarQuiz = document.getElementById("startSimilarQuiz");
  const similarKanaQuiz = document.getElementById("similarKanaQuiz");

  const similarQuestionNumber = document.getElementById("similarQuestionNumber");
  const similarQuizScore = document.getElementById("similarQuizScore");
  const similarQuizKana = document.getElementById("similarQuizKana");
  const similarQuizOptions = document.getElementById("similarQuizOptions");

  const similarQuizFeedback = document.getElementById("similarQuizFeedback");
  const similarFeedbackTitle = document.getElementById("similarFeedbackTitle");
  const similarFeedbackMessage = document.getElementById("similarFeedbackMessage");
  const similarFeedbackExplanation = document.getElementById("similarFeedbackExplanation");
  const nextSimilarQuestion = document.getElementById("nextSimilarQuestion");

  const similarQuizResult = document.getElementById("similarQuizResult");
  const similarResultMessage = document.getElementById("similarResultMessage");
  const similarFinalScore = document.getElementById("similarFinalScore");
  const similarCorrectCount = document.getElementById("similarCorrectCount");
  const similarWrongCount = document.getElementById("similarWrongCount");
  const retrySimilarQuiz = document.getElementById("retrySimilarQuiz");
  const similarQuizQuestion = document.getElementById("similarQuizQuestion");

  const similarPairHeading = document.getElementById("similarPairHeading");


  /* ==========================================
     KANA MIRIP BARU — VARIABEL LATIHAN
  ========================================== */

  // Kategori belum dipilih saat halaman pertama dibuka.
  let currentKanaType = null;
  let currentSimilarPair = null;

  let similarQuestions = [];
  let similarQuestionIndex = 0;

  let similarScore = 0;
  let similarCorrect = 0;
  let similarWrong = 0;

  let similarAnswered = false;

  const similarPraiseMessages = [
    "Hebat! Jawabanmu tepat! 🎉",
    "すごい！ Kamu berhasil! 🌸",
    "Mantap! Kamu semakin teliti!",
    "Luar biasa! Terus pertahankan!"
  ];

  const similarMotivationMessages = [
    "Tidak apa-apa, belajar memang butuh latihan. Semangat! 🌱",
    "Jangan menyerah! Sekarang kamu sudah tahu perbedaannya.",
    "Tetap semangat! Kesalahan adalah bagian dari belajar.",
    "Pelan-pelan saja, kamu pasti semakin terbiasa!"
  ];


  /* ==========================================
     KANA MIRIP BARU — MENAMPILKAN DAFTAR
  ========================================== */

  function renderSimilarPairs() {
    if (!similarKanaGrid || !currentKanaType) return;

    const pairs = similarKanaData[currentKanaType];

    similarKanaGrid.innerHTML = "";

    if (pairListTitle) {
      pairListTitle.textContent =
        currentKanaType === "hiragana"
          ? "Pasangan Hiragana"
          : "Pasangan Katakana";
    }

    pairs.forEach((pair, index) => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "similar-kana-card";
      button.dataset.index = index;

      button.innerHTML = `
        <span class="similar-card-characters">
          <span>${pair.first}</span>
          <small>VS</small>
          <span>${pair.second}</span>
        </span>
        <strong>${pair.firstRomaji} – ${pair.secondRomaji}</strong>
        <span class="similar-card-hint">Pelajari perbedaan →</span>
      `;

      button.addEventListener("click", () => {
        selectSimilarPair(index);
      });

      similarKanaGrid.appendChild(button);
    });

    similarKanaGrid.hidden = false;

    // KANA MIRIP BARU — TAMPILKAN JUDUL SETELAH KATEGORI DIPILIH
    if (similarPairHeading) {
      similarPairHeading.hidden = false;
    }
  }


  /* ==========================================
     KANA MIRIP BARU — TOMBOL BUKA/TUTUP KATEGORI
  ========================================== */

  kanaTypeButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selectedType = button.dataset.type;

      // KANA MIRIP BARU — TUTUP KATEGORI JIKA DIKLIK KEMBALI
      if (
        currentKanaType === selectedType &&
        similarKanaGrid &&
        !similarKanaGrid.hidden
      ) {
        similarKanaGrid.hidden = true;

        // PERBAIKAN — SEMBUNYIKAN JUDUL SAAT KATEGORI DITUTUP
        if (similarPairHeading) {
          similarPairHeading.hidden = true;
        }

        button.classList.remove("active");
        button.setAttribute("aria-pressed", "false");

        currentKanaType = null;
        currentSimilarPair = null;

        if (similarKanaDetail) {
          similarKanaDetail.hidden = true;
        }

        if (similarKanaQuiz) {
          similarKanaQuiz.hidden = true;
        }

        return;
      }

      // Membuka kategori yang dipilih.
      currentKanaType = selectedType;
      currentSimilarPair = null;

      kanaTypeButtons.forEach(btn => {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      if (similarKanaDetail) {
        similarKanaDetail.hidden = true;
      }

      if (similarKanaQuiz) {
        similarKanaQuiz.hidden = true;
      }

      renderSimilarPairs();
    });
  });


  /* ==========================================
     KANA MIRIP BARU — DETAIL PASANGAN
  ========================================== */

  function selectSimilarPair(index) {
    if (!currentKanaType) return;

    const pairs = similarKanaData[currentKanaType];

    currentSimilarPair = pairs[index];

    document.querySelectorAll(".similar-kana-card").forEach(card => {
      card.classList.toggle(
        "selected",
        Number(card.dataset.index) === index
      );
    });

    similarDetailTitle.textContent = currentSimilarPair.title;
    similarDetailIntro.textContent = currentSimilarPair.intro;

    similarKanaFirst.textContent = currentSimilarPair.first;
    similarKanaFirstRomaji.textContent = currentSimilarPair.firstRomaji;

    similarKanaSecond.textContent = currentSimilarPair.second;
    similarKanaSecondRomaji.textContent = currentSimilarPair.secondRomaji;

    similarDifference.textContent = currentSimilarPair.difference;
    similarMemoryTip.textContent = currentSimilarPair.tip;

    similarKanaDetail.hidden = false;
    similarKanaQuiz.hidden = true;

    similarKanaDetail.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }


  /* ==========================================
     KANA MIRIP BARU — PESAN ACAK
  ========================================== */

  function getRandomMessage(messages) {
    return messages[Math.floor(Math.random() * messages.length)];
  }


  /* ==========================================
     KANA MIRIP BARU — MEMULAI KUIS
  ========================================== */

  function startSimilarQuizGame() {
    if (!currentSimilarPair) return;

    // Kuis terdiri dari 10 soal dengan urutan huruf acak.
    const questionPool = currentSimilarPair.questions;

    similarQuestions = Array.from({ length: 10 }, () => {
      return {
        ...questionPool[
          Math.floor(Math.random() * questionPool.length)
        ]
      };
    });

    similarQuestionIndex = 0;
    similarScore = 0;
    similarCorrect = 0;
    similarWrong = 0;
    similarAnswered = false;

    similarQuizResult.hidden = true;
    similarQuizFeedback.hidden = true;
    similarQuizQuestion.hidden = false;

    similarKanaQuiz.hidden = false;

    showSimilarQuestion();

    similarKanaQuiz.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  if (startSimilarQuiz) {
    startSimilarQuiz.addEventListener("click", startSimilarQuizGame);
  }


  /* ==========================================
     KANA MIRIP BARU — MENAMPILKAN SOAL
  ========================================== */

  function showSimilarQuestion() {
    const question = similarQuestions[similarQuestionIndex];

    similarAnswered = false;

    similarQuizFeedback.hidden = true;
    similarQuizQuestion.hidden = false;
    similarQuizOptions.innerHTML = "";

    similarQuestionNumber.textContent =
      `Soal ${similarQuestionIndex + 1} / ${similarQuestions.length}`;

    similarQuizScore.textContent = `Poin: ${similarScore}`;

    similarQuizKana.textContent = question.kana;

    // Acak posisi pilihan jawaban.
    const options = [question.answer, question.other]
      .sort(() => Math.random() - 0.5);

    options.forEach(answer => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "similar-answer-button";
      button.textContent = answer.toUpperCase();

      button.addEventListener("click", () => {
        checkSimilarAnswer(answer, button);
      });

      similarQuizOptions.appendChild(button);
    });
  }


  /* ==========================================
     KANA MIRIP BARU — PERIKSA JAWABAN
  ========================================== */

  function checkSimilarAnswer(answer, selectedButton) {
    if (similarAnswered) return;

    similarAnswered = true;

    const question = similarQuestions[similarQuestionIndex];
    const isCorrect = answer === question.answer;

    const answerButtons = similarQuizOptions.querySelectorAll("button");

    answerButtons.forEach(button => {
      button.disabled = true;

      if (button.textContent.toLowerCase() === question.answer) {
        button.classList.add("correct");
      }
    });

    if (isCorrect) {
      similarScore += 10;
      similarCorrect++;

      selectedButton.classList.add("correct");

      similarFeedbackTitle.textContent =
        getRandomMessage(similarPraiseMessages);

      similarFeedbackMessage.textContent =
        `Benar! ${question.kana} dibaca ${question.answer.toUpperCase()}.`;

      similarFeedbackExplanation.textContent =
        `Bagus! ${question.kana} dibaca ${question.answer.toUpperCase()}. Terus ingat bentuk hurufnya!`;

    } else {
      similarWrong++;

      selectedButton.classList.add("wrong");

      similarFeedbackTitle.textContent =
        getRandomMessage(similarMotivationMessages);

      similarFeedbackMessage.textContent =
        "Belum tepat, tetapi tidak apa-apa. Tetap semangat!";

      similarFeedbackExplanation.textContent =
        `Jawaban yang benar adalah ${question.answer.toUpperCase()}. Perhatikan kembali bentuk hurufnya agar semakin mudah diingat.`;
    }

    similarQuizScore.textContent = `Poin: ${similarScore}`;

    similarQuizQuestion.hidden = true;
    similarQuizFeedback.hidden = false;

    nextSimilarQuestion.textContent =
      similarQuestionIndex === similarQuestions.length - 1
        ? "Lihat Hasil →"
        : "Berikutnya →";
  }


  /* ==========================================
     KANA MIRIP BARU — TOMBOL BERIKUTNYA
  ========================================== */

  if (nextSimilarQuestion) {
    nextSimilarQuestion.addEventListener("click", () => {
      if (!similarAnswered) return;

      similarQuestionIndex++;

      if (similarQuestionIndex < similarQuestions.length) {
        showSimilarQuestion();
      } else {
        showSimilarResult();
      }
    });
  }


  /* ==========================================
     KANA MIRIP BARU — HASIL AKHIR
  ========================================== */

  function showSimilarResult() {
    similarQuizQuestion.hidden = true;
    similarQuizFeedback.hidden = true;
    similarQuizResult.hidden = false;

    similarFinalScore.textContent = similarScore;
    similarCorrectCount.textContent = similarCorrect;

    // PERBAIKAN — PENULISAN TEXTCONTENT
    similarWrongCount.textContent = similarWrong;

    similarResultMessage.textContent =
      `Kamu berhasil menyelesaikan ${similarQuestions.length} soal. Terus berlatih agar semakin mahir membedakan huruf Kana!`;

    similarQuizResult.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }


  /* ==========================================
     KANA MIRIP BARU — ULANGI KUIS
  ========================================== */

  if (retrySimilarQuiz) {
    retrySimilarQuiz.addEventListener("click", startSimilarQuizGame);
  }

  // ==========================================
  // KANA MIRIP — PEMBELAJARAN DAN KUIS — AKHIR SCOPE JAVASCRIPT
  // ==========================================
})();
