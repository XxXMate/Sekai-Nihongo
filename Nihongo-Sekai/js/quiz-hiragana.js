// ==========================================
// KUIS HIRAGANA BARU — ISOLASI SCRIPT
// ==========================================

(() => {

// ===================================
// KUIS HIRAGANA - NIHONGO SEKAI
// ===================================

const quizSetup = document.getElementById("quizSetup");
const quizContent = document.getElementById("quizContent");
const questionCountOptions = document.getElementById("questionCountOptions");
const quizTitle = document.getElementById("quizTitle");
const quizModeDescription = document.getElementById("quizModeDescription");


// ==========================================
// KUIS HIRAGANA BARU — PENGAMAN ELEMEN HTML
// ==========================================

if (
  !quizSetup ||
  !quizContent ||
  !questionCountOptions ||
  !quizTitle ||
  !quizModeDescription
) {
  return;
}


// ==========================================
// KUIS HIRAGANA BARU — DATA 104 HURUF
// ==========================================

const allKana = [

  // HURUF DASAR (46)
  ["あ", "a"], ["い", "i"], ["う", "u"], ["え", "e"], ["お", "o"],
  ["か", "ka"], ["き", "ki"], ["く", "ku"], ["け", "ke"], ["こ", "ko"],
  ["さ", "sa"], ["し", "shi"], ["す", "su"], ["せ", "se"], ["そ", "so"],
  ["た", "ta"], ["ち", "chi"], ["つ", "tsu"], ["て", "te"], ["と", "to"],
  ["な", "na"], ["に", "ni"], ["ぬ", "nu"], ["ね", "ne"], ["の", "no"],
  ["は", "ha"], ["ひ", "hi"], ["ふ", "fu"], ["へ", "he"], ["ほ", "ho"],
  ["ま", "ma"], ["み", "mi"], ["む", "mu"], ["め", "me"], ["も", "mo"],
  ["や", "ya"], ["ゆ", "yu"], ["よ", "yo"],
  ["ら", "ra"], ["り", "ri"], ["る", "ru"], ["れ", "re"], ["ろ", "ro"],
  ["わ", "wa"], ["を", "wo"], ["ん", "n"],

  // DAKUTEN (20)
  ["が", "ga"], ["ぎ", "gi"], ["ぐ", "gu"], ["げ", "ge"], ["ご", "go"],
  ["ざ", "za"], ["じ", "ji"], ["ず", "zu"], ["ぜ", "ze"], ["ぞ", "zo"],
  ["だ", "da"], ["ぢ", "ji"], ["づ", "zu"], ["で", "de"], ["ど", "do"],
  ["ば", "ba"], ["び", "bi"], ["ぶ", "bu"], ["べ", "be"], ["ぼ", "bo"],

  // HANDAKUTEN (5)
  ["ぱ", "pa"], ["ぴ", "pi"], ["ぷ", "pu"], ["ぺ", "pe"], ["ぽ", "po"],

  // YOUON (33)
  ["きゃ", "kya"], ["きゅ", "kyu"], ["きょ", "kyo"],
  ["しゃ", "sha"], ["しゅ", "shu"], ["しょ", "sho"],
  ["ちゃ", "cha"], ["ちゅ", "chu"], ["ちょ", "cho"],
  ["にゃ", "nya"], ["にゅ", "nyu"], ["にょ", "nyo"],
  ["ひゃ", "hya"], ["ひゅ", "hyu"], ["ひょ", "hyo"],
  ["みゃ", "mya"], ["みゅ", "myu"], ["みょ", "myo"],
  ["りゃ", "rya"], ["りゅ", "ryu"], ["りょ", "ryo"],
  ["ぎゃ", "gya"], ["ぎゅ", "gyu"], ["ぎょ", "gyo"],
  ["じゃ", "ja"], ["じゅ", "ju"], ["じょ", "jo"],
  ["びゃ", "bya"], ["びゅ", "byu"], ["びょ", "byo"],
  ["ぴゃ", "pya"], ["ぴゅ", "pyu"], ["ぴょ", "pyo"]

];


// Membaca mode dari URL
const urlParams = new URLSearchParams(window.location.search);
const quizMode = urlParams.get("mode") === "challenge"
  ? "challenge"
  : "relaxed";

const modeName = quizMode === "challenge"
  ? "Mode Tantangan"
  : "Mode Santai";

quizTitle.textContent = modeName;

quizModeDescription.textContent = quizMode === "challenge"
  ? "Jawab setiap pertanyaan dalam waktu 5 detik!"
  : "Kerjakan latihan dengan santai tanpa batas waktu.";

// Variabel kuis
let quizQuestions = [];
let quizIndex = 0;
let quizScore = 0;
let selectedQuizCount = 10;
let answered = false;
let timerInterval = null;
let timeLeft = 5;

// Mengacak urutan soal dan jawaban
function shuffle(items) {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

// Menghentikan timer
function stopQuizTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// Memulai kuis
function beginQuiz(count) {
  stopQuizTimer();

  selectedQuizCount = count;
  quizQuestions = shuffle(allKana).slice(0, count);

  quizIndex = 0;
  quizScore = 0;

  quizSetup.hidden = true;
  quizContent.hidden = false;

  renderQuestion();
}

// Menampilkan pertanyaan
function renderQuestion() {
  answered = false;
  stopQuizTimer();

  const [kana, correct] = quizQuestions[quizIndex];

  const wrongChoices = [
    ...new Set(allKana.map(item => item[1]))
  ].filter(romaji => romaji !== correct);

  const choices = shuffle([
    correct,
    ...shuffle(wrongChoices).slice(0, 3)
  ]);

  quizContent.innerHTML = `
    <div class="quiz-question">

      <div class="quiz-progress">
        Soal ${quizIndex + 1} dari ${quizQuestions.length}
        · Skor ${quizScore}
      </div>

      ${quizMode === "challenge" ? `
        <div class="quiz-timer">
          Waktu: <strong id="quizTimer">5</strong> detik
        </div>
      ` : ""}

      <div class="quiz-kana">${kana}</div>

      <p class="quiz-prompt">
        Apa romaji dari huruf ini?
      </p>

      <div class="quiz-options"></div>

      <p class="quiz-feedback" aria-live="polite"></p>

      <button class="quiz-next" type="button" hidden>
        Soal Berikutnya →
      </button>

    </div>
  `;

  // Membuat tombol pilihan jawaban
  const options = quizContent.querySelector(".quiz-options");

  choices.forEach(choice => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "quiz-option";
    button.textContent = choice;

    button.addEventListener("click", () => {
      answerQuestion(button, choice, correct);
    });

    options.appendChild(button);
  });

  // Tombol menuju soal berikutnya
  quizContent.querySelector(".quiz-next")
    .addEventListener("click", () => {
      quizIndex++;

      if (quizIndex < quizQuestions.length) {
        renderQuestion();
      } else {
        showQuizResult();
      }
    });

  // Timer hanya untuk Mode Tantangan
  if (quizMode === "challenge") {
    startQuizTimer(correct);
  }
}

// Timer 5 detik
function startQuizTimer(correct) {
  timeLeft = 5;

  const timerDisplay = document.getElementById("quizTimer");

  timerInterval = setInterval(() => {
    timeLeft--;

    if (timerDisplay) {
      timerDisplay.textContent = timeLeft;
    }

    if (timeLeft <= 0) {
      stopQuizTimer();

      const correctButton = [
        ...quizContent.querySelectorAll(".quiz-option")
      ].find(button => button.textContent === correct);

      answerQuestion(correctButton, null, correct, true);
    }
  }, 1000);
}

// Memeriksa jawaban
function answerQuestion(button, choice, correct, timedOut = false) {
  if (answered) return;

  answered = true;
  stopQuizTimer();

  const buttons = quizContent.querySelectorAll(".quiz-option");

  buttons.forEach(option => {
    option.disabled = true;

    if (option.textContent === correct) {
      option.classList.add("correct");
    }
  });

  const feedback = quizContent.querySelector(".quiz-feedback");

  if (timedOut) {
    feedback.textContent =
      `Waktu habis! Jawaban yang benar: ${correct}.`;
  } else if (choice === correct) {
    quizScore++;

    feedback.textContent =
      "Benar! Bagus, teruskan! 🌸";
  } else {
    
    if (button) {
      button.classList.add("wrong");
    }

    feedback.textContent =
      `Belum tepat. Jawaban yang benar: ${correct}.`;
  }

  const nextButton = quizContent.querySelector(".quiz-next");

  nextButton.hidden = false;

  nextButton.textContent =
    quizIndex === quizQuestions.length - 1
      ? "Lihat Hasil →"
      : "Soal Berikutnya →";
}

// Menampilkan hasil akhir
function showQuizResult() {
  stopQuizTimer();

  const total = quizQuestions.length;
  const percentage = Math.round((quizScore / total) * 100);

  let message;

  if (quizScore === total) {
    message = "すばらしい！ Sempurna!";
  } else if (percentage >= 75) {
    message = "よくできました！ Kerja bagus!";
  } else if (percentage >= 50) {
    message = "いいですね！ Terus tingkatkan!";
  } else {
    message = "Terus berlatih, kamu pasti bisa!";
  }

  quizContent.innerHTML = `
    <div class="quiz-result">

      <div class="quiz-result-score">
        ${quizScore} / ${total}
      </div>

      <strong>${message}</strong>

      <p>Nilai kamu: ${percentage}%</p>

      <p>
        Kamu sudah menyelesaikan ${total} soal Hiragana.
      </p>

      <button type="button" id="retryQuiz">
        Coba Lagi ↻
      </button>

      <button type="button" id="changeQuizCount">
        Pilih Jumlah Soal
      </button>

    </div>
  `;

  document.getElementById("retryQuiz")
    .addEventListener("click", () => {
      beginQuiz(selectedQuizCount);
    });

  document.getElementById("changeQuizCount")
    .addEventListener("click", () => {
      quizContent.hidden = true;
      quizSetup.hidden = false;
    });
}

// Memasang pilihan jumlah soal
questionCountOptions.querySelectorAll("[data-count]")
  .forEach(button => {
    button.addEventListener("click", () => {
      const count = Number(button.dataset.count);

      beginQuiz(count);
    });
  });


// ==========================================
// KUIS HIRAGANA BARU — PEMBERSIHAN TIMER
// ==========================================

window.addEventListener("pagehide", () => {
  stopQuizTimer();
});

// ==========================================
// KUIS HIRAGANA BARU — AKHIR ISOLASI SCRIPT
// ==========================================

})();