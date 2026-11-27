// ==========================================
// HINA — ISOLASI SCRIPT
// ==========================================

(function () {
  

// ==========================================
// HINA — DATA HURUF DASAR (46)
// ==========================================
const hinaBasic = [
  ["あ","a","Bunyinya seperti 'a' pada kata anak.","あさ · asa","pagi"],
  ["い","i","Bunyinya seperti 'i' pada kata ikan.","いぬ · inu","anjing"],
  ["う","u","Bunyinya seperti 'u' pada kata ular.","うみ · umi","laut"],
  ["え","e","Bunyinya seperti 'e' pada kata enak.","えき · eki","stasiun"],
  ["お","o","Bunyinya seperti 'o' pada kata obat.","おに · oni","raksasa/oni"],
  ["か","ka","Gabungan bunyi k dan a.","かさ · kasa","payung"],
  ["き","ki","Gabungan bunyi k dan i.","き · ki","pohon"],
  ["く","ku","Gabungan bunyi k dan u.","くつ · kutsu","sepatu"],
  ["け","ke","Gabungan bunyi k dan e.","けさ · kesa","pagi ini"],
  ["こ","ko","Gabungan bunyi k dan o.","こえ · koe","suara"],
  ["さ","sa","Gabungan bunyi s dan a.","さかな · sakana","ikan"],
  ["し","shi","Dibaca 'shi', bukan 'si'.","しま · shima","pulau"],
  ["す","su","Gabungan bunyi s dan u.","すし · sushi","sushi"],
  ["せ","se","Gabungan bunyi s dan e.","せかい · sekai","dunia"],
  ["そ","so","Gabungan bunyi s dan o.","そら · sora","langit"],
  ["た","ta","Gabungan bunyi t dan a.","たこ · tako","gurita"],
  ["ち","chi","Dibaca 'chi', bukan 'ti'.","ちず · chizu","peta"],
  ["つ","tsu","Bunyinya 'tsu', seperti akhir kata 'cats' dalam bahasa Inggris.","つき · tsuki","bulan"],
  ["て","te","Gabungan bunyi t dan e.","て · te","tangan"],
  ["と","to","Gabungan bunyi t dan o.","とり · tori","burung"],
  ["な","na","Gabungan bunyi n dan a.","なつ · natsu","musim panas"],
  ["に","ni","Gabungan bunyi n dan i.","にく · niku","daging"],
  ["ぬ","nu","Gabungan bunyi n dan u.","いぬ · inu","anjing"],
  ["ね","ne","Gabungan bunyi n dan e.","ねこ · neko","kucing"],
  ["の","no","Gabungan bunyi n dan o.","のみもの · nomimono","minuman"],
  ["は","ha","Gabungan bunyi h dan a. Sebagai partikel, は dibaca 'wa'.","はな · hana","bunga"],
  ["ひ","hi","Gabungan bunyi h dan i.","ひ · hi","api/matahari"],
  ["ふ","fu","Bunyinya di antara 'fu' dan 'hu'.","ふね · fune","kapal"],
  ["へ","he","Gabungan bunyi h dan e. Sebagai partikel, へ dibaca 'e'.","へや · heya","kamar"],
  ["ほ","ho","Gabungan bunyi h dan o.","ほし · hoshi","bintang"],
  ["ま","ma","Gabungan bunyi m dan a.","まち · machi","kota"],
  ["み","mi","Gabungan bunyi m dan i.","みず · mizu","air"],
  ["む","mu","Gabungan bunyi m dan u.","むし · mushi","serangga"],
  ["め","me","Gabungan bunyi m dan e.","め · me","mata"],
  ["も","mo","Gabungan bunyi m dan o.","もも · momo","buah persik"],
  ["や","ya","Gabungan bunyi y dan a.","やま · yama","gunung"],
  ["ゆ","yu","Gabungan bunyi y dan u.","ゆき · yuki","salju"],
  ["よ","yo","Gabungan bunyi y dan o.","よる · yoru","malam"],
  ["ら","ra","Bunyi r Jepang ringan, dengan sentuhan lidah singkat.","さくら · sakura","bunga sakura"],
  ["り","ri","Bunyi r Jepang ringan, dengan sentuhan lidah singkat.","とり · tori","burung"],
  ["る","ru","Bunyi r Jepang ringan, dengan sentuhan lidah singkat.","はる · haru","musim semi"],
  ["れ","re","Bunyi r Jepang ringan, dengan sentuhan lidah singkat.","れい · rei","contoh bunyi/nama Rei"],
  ["ろ","ro","Bunyi r Jepang ringan, dengan sentuhan lidah singkat.","くろ · kuro","hitam"],
  ["わ","wa","Gabungan bunyi w dan a.","わたし · watashi","saya"],
  ["を","wo","Umumnya dibaca 'o' saat menjadi partikel objek.","みずを · mizu o","air (sebagai objek)"],
  ["ん","n","Bunyi nasal 'n'. Dapat terdengar sedikit berbeda sesuai bunyi setelahnya.","ほん · hon","buku"]
];


// ==========================================
// HINA — DATA DAKUTEN (20)
// ==========================================
const hinaDakuten = [
  ["が","ga","Bunyi g dan a.","がっこう · gakkou","sekolah"],
  ["ぎ","gi","Bunyi g dan i.","ぎんこう · ginkou","bank"],
  ["ぐ","gu","Bunyi g dan u.","ぐんて · gunte","sarung tangan"],
  ["げ","ge","Bunyi g dan e.","げんき · genki","sehat/semangat"],
  ["ご","go","Bunyi g dan o.","ごはん · gohan","nasi/makanan"],
  ["ざ","za","Bunyi z dan a.","ざっし · zasshi","majalah"],
  ["じ","ji","Bunyi ji.","じかん · jikan","waktu"],
  ["ず","zu","Bunyi z dan u.","みず · mizu","air"],
  ["ぜ","ze","Bunyi z dan e.","ぜんぶ · zenbu","semua"],
  ["ぞ","zo","Bunyi z dan o.","ぞう · zou","gajah"],
  ["だ","da","Bunyi d dan a.","だいがく · daigaku","universitas"],
  ["ぢ","ji","Bunyi ji, jarang digunakan.","はなぢ · hanaji","mimisan"],
  ["づ","zu","Bunyi zu, jarang digunakan.","つづく · tsuzuku","berlanjut"],
  ["で","de","Bunyi d dan e.","でんわ · denwa","telepon"],
  ["ど","do","Bunyi d dan o.","どあ · doa","pintu"],
  ["ば","ba","Bunyi b dan a.","ばら · bara","mawar"],
  ["び","bi","Bunyi b dan i.","びょういん · byouin","rumah sakit"],
  ["ぶ","bu","Bunyi b dan u.","ぶた · buta","babi"],
  ["べ","be","Bunyi b dan e.","べんきょう · benkyou","belajar"],
  ["ぼ","bo","Bunyi b dan o.","ぼうし · boushi","topi"]
];


// ==========================================
// HINA — DATA HANDAKUTEN (5)
// ==========================================
const hinaHandakuten = [
  ["ぱ","pa","Bunyi p dan a.","ぱん · pan","roti"],
  ["ぴ","pi","Bunyi p dan i.","ぴざ · piza","pizza"],
  ["ぷ","pu","Bunyi p dan u.","ぷりん · purin","puding"],
  ["ぺ","pe","Bunyi p dan e.","ぺん · pen","pulpen"],
  ["ぽ","po","Bunyi p dan o.","ぽすと · posuto","kotak pos"]
];


// ==========================================
// HINA — DATA YOUON (33)
// ==========================================
const hinaYouon = [
  ["きゃ","kya","Gabungan き dan ゃ kecil.","きゃく · kyaku","tamu/pelanggan"],
  ["きゅ","kyu","Gabungan き dan ゅ kecil.","きゅうり · kyuuri","mentimun"],
  ["きょ","kyo","Gabungan き dan ょ kecil.","きょう · kyou","hari ini"],
  ["しゃ","sha","Gabungan し dan ゃ kecil.","しゃしん · shashin","foto"],
  ["しゅ","shu","Gabungan し dan ゅ kecil.","しゅみ · shumi","hobi"],
  ["しょ","sho","Gabungan し dan ょ kecil.","しょくどう · shokudou","kantin"],
  ["ちゃ","cha","Gabungan ち dan ゃ kecil.","ちゃ · cha","teh"],
  ["ちゅ","chu","Gabungan ち dan ゅ kecil.","ちゅうい · chuui","perhatian"],
  ["ちょ","cho","Gabungan ち dan ょ kecil.","ちょっと · chotto","sebentar"],
  ["にゃ","nya","Gabungan に dan ゃ kecil.","にゃんこ · nyanko","kucing"],
  ["にゅ","nyu","Gabungan に dan ゅ kecil.","にゅうがく · nyuugaku","masuk sekolah"],
  ["にょ","nyo","Gabungan に dan ょ kecil.","—","bunyi gabungan"],
  ["ひゃ","hya","Gabungan ひ dan ゃ kecil.","ひゃく · hyaku","seratus"],
  ["ひゅ","hyu","Gabungan ひ dan ゅ kecil.","—","bunyi gabungan"],
  ["ひょ","hyo","Gabungan ひ dan ょ kecil.","ひょう · hyou","tabel"],
  ["みゃ","mya","Gabungan み dan ゃ kecil.","みゃく · myaku","denyut nadi"],
  ["みゅ","myu","Gabungan み dan ゅ kecil.","—","bunyi gabungan"],
  ["みょ","myo","Gabungan み dan ょ kecil.","みょうじ · myouji","nama keluarga"],
  ["りゃ","rya","Gabungan り dan ゃ kecil.","りゃく · ryaku","singkatan"],
  ["りゅ","ryu","Gabungan り dan ゅ kecil.","りゅう · ryuu","naga"],
  ["りょ","ryo","Gabungan り dan ょ kecil.","りょうり · ryouri","masakan"],
  ["ぎゃ","gya","Gabungan ぎ dan ゃ kecil.","ぎゃく · gyaku","kebalikan"],
  ["ぎゅ","gyu","Gabungan ぎ dan ゅ kecil.","ぎゅうにゅう · gyuunyuu","susu"],
  ["ぎょ","gyo","Gabungan ぎ dan ょ kecil.","ぎょらい · gyorai","torpedo"],
  ["じゃ","ja","Gabungan じ dan ゃ kecil.","じゃがいも · jagaimo","kentang"],
  ["じゅ","ju","Gabungan じ dan ゅ kecil.","じゅぎょう · jugyou","pelajaran"],
  ["じょ","jo","Gabungan じ dan ょ kecil.","じょうず · jouzu","mahir"],
  ["びゃ","bya","Gabungan び dan ゃ kecil.","びゃくや · byakuya","malam putih"],
  ["びゅ","byu","Gabungan び dan ゅ kecil.","びゅうびゅう · byuubyuu","suara angin kencang"],
  ["びょ","byo","Gabungan び dan ょ kecil.","びょういん · byouin","rumah sakit"],
  ["ぴゃ","pya","Gabungan ぴ dan ゃ kecil.","—","bunyi gabungan"],
  ["ぴゅ","pyu","Gabungan ぴ dan ゅ kecil.","—","bunyi gabungan"],
  ["ぴょ","pyo","Gabungan ぴ dan ょ kecil.","ぴょん · pyon","lompatan/bunyi melompat"]
];


// ==========================================
// HINA — PENGATURAN KATEGORI
// ==========================================
const hinaCategories = {
  basic: hinaBasic,
  dakuten: hinaDakuten,
  handakuten: hinaHandakuten,
  youon: hinaYouon
};

let hinaActiveCategory = null;
let hinaActiveData = hinaBasic;


// ==========================================
// HINA — ELEMEN HTML
// ==========================================
const hinaGrid = document.getElementById("kanaGrid");
const hinaDetail = document.getElementById("kanaDetail");

const hinaDetailKana = document.getElementById("detailKana");
const hinaDetailRomaji = document.getElementById("detailRomaji");
const hinaDetailDescription = document.getElementById("detailDescription");
const hinaDetailWord = document.getElementById("detailWord");
const hinaDetailMeaning = document.getElementById("detailMeaning");

const hinaCount = document.getElementById("kanaCount");
const hinaTabs = document.querySelectorAll(".kana-tab");


// ==========================================
// HIRAGANA BARU — MEMUAT DATA STROKE ORDER
// ==========================================

let hinaStrokeData = null;

// Ambil data dari file JSON lokal
fetch("assets/data/kana-strokes.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Data stroke order gagal dimuat.");
    }

    return response.json();
  })
  .then(data => {
    hinaStrokeData = data.kana;

    console.log(
      "Data stroke order berhasil dimuat:",
      Object.keys(hinaStrokeData).length,
      "karakter"
    );
  })
  .catch(error => {
    console.error("Hiragana Stroke Order:", error);
  });


// ==========================================
// HIRAGANA BARU — FUNGSI ANIMASI CORETAN
// ==========================================

const hinaStrokeAnimation = document.getElementById("strokeAnimation");
const hinaStrokeInfo = document.getElementById("strokeInfo");
const hinaReplayStroke = document.getElementById("replayStroke");

function playHinaStroke(character) {
  if (!hinaStrokeAnimation || !hinaStrokeInfo) return;

  const kanaData = hinaStrokeData?.[character];

  // Periksa apakah data huruf tersedia
  if (!kanaData) {
    hinaStrokeAnimation.textContent = "Data coretan belum tersedia.";
    hinaStrokeInfo.textContent = "Coba pilih huruf lagi setelah data dimuat.";
    return;
  }

  const svgNS = "http://www.w3.org/2000/svg";

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "0 0 109 109");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "150");

  hinaStrokeAnimation.replaceChildren(svg);

  // Gambar setiap coretan sesuai urutan aslinya
  kanaData.strokes.forEach((stroke, index) => {
    const path = document.createElementNS(svgNS, "path");

    path.setAttribute("d", stroke.path);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "#355c45");
    path.setAttribute("stroke-width", "4.5");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");

    svg.appendChild(path);

    const length = path.getTotalLength();

    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    // Animasi berjalan satu per satu
    path.animate(
      [
        { strokeDashoffset: length },
        { strokeDashoffset: 0 }
      ],
      {
        duration: 1500,
        delay: index * 1700,
        fill: "forwards",
        easing: "ease-in-out"
      }
    );
  });

  hinaStrokeInfo.textContent =
    "Jumlah coretan: " + kanaData.strokes.length;
}

// HIRAGANA BARU — TOMBOL ULANGI ANIMASI
if (hinaReplayStroke) {
  hinaReplayStroke.addEventListener("click", () => {
    const character = hinaDetailKana.textContent;
    playHinaStroke(character);
  });
}

// ==========================================
// HINA BARU — AUDIO PENGUCAPAN KANA (TTS)
// ==========================================

function playHinaAudio(character) {
  // Hentikan suara sebelumnya agar tidak bertumpuk
  if (!("speechSynthesis" in window)) {
    console.warn("Browser tidak mendukung fitur suara.");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(character);

  // Gunakan pengucapan bahasa Jepang
  utterance.lang = "ja-JP";
  utterance.rate = 0.85;
  utterance.pitch = 1;

  window.speechSynthesis.speak(utterance);
}


// ==========================================
// HINA — TAMPILKAN DETAIL HURUF
// ==========================================

function showHinaDetail(item) {
  // HINA — PENGAMAN ELEMEN DETAIL
  if (
    !hinaGrid ||
    !hinaDetail ||
    !hinaDetailKana ||
    !hinaDetailRomaji ||
    !hinaDetailDescription ||
    !hinaDetailWord ||
    !hinaDetailMeaning
  ) return;

  hinaDetail.hidden = false;
  hinaDetail.classList.add("active");

  const [character, romaji, description, word, meaning] = item;

  hinaDetailKana.textContent = character;
  hinaDetailRomaji.textContent = romaji;
  hinaDetailDescription.textContent = description;
  hinaDetailWord.textContent = word;
  hinaDetailMeaning.textContent = meaning;
  
  
  // HIRAGANA BARU — JALANKAN ANIMASI CORETAN
  playHinaStroke(character);


  hinaGrid.querySelectorAll(".kana-card").forEach(card => {
    const selected = card.dataset.kana === character;

    card.classList.toggle("selected", selected);
    card.setAttribute("aria-pressed", String(selected));
  });
}


// ==========================================
// HINA — TAMPILKAN GRID HURUF
// ==========================================

function renderHina(category) {
  if (!hinaGrid) return;

  hinaActiveData = hinaCategories[category];

  if (!hinaActiveData) return;

  hinaGrid.classList.toggle(
    "youon-layout",
    category === "youon"
  );

  hinaGrid.innerHTML = "";

  if (hinaCount) {
    hinaCount.textContent = ` · ${hinaActiveData.length} karakter`;
  }

  hinaActiveData.forEach(item => {
    const [character, romaji] = item;

    const card = document.createElement("button");

    card.type = "button";
    card.className = "kana-card";
    card.dataset.kana = character;

    card.setAttribute(
      "aria-label",
      `${character}, dibaca ${romaji}`
    );

    card.setAttribute("aria-pressed", "false");

    card.innerHTML = `
      <span class="kana-character">${character}</span>
      <span class="kana-romaji">${romaji}</span>
    `;

    
      // HINA BARU — PUTAR AUDIO SAAT KOTAK DITEKAN
    card.addEventListener("click", () => {
      playHinaAudio(character);
      showHinaDetail(item);
  });


    hinaGrid.appendChild(card);
  });
}

// ==========================================
// HINA — NAVIGASI TAB KATEGORI
// ==========================================

hinaTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const category = tab.dataset.category;
    
    // HINA — VALIDASI KATEGORI
    if (!hinaCategories[category]) return;

    // HINA — TUTUP KATEGORI AKTIF
    if (hinaActiveCategory === category) {
      hinaActiveCategory = null;

      if (hinaGrid) {
        hinaGrid.innerHTML = "";
        hinaGrid.classList.remove("youon-layout");
      }

      // HINA — TUTUP KARTU DETAIL
      if (hinaDetail) {
        hinaDetail.classList.remove("active");
        hinaDetail.hidden = true;
      }

      if (hinaCount) {
        hinaCount.textContent = "";
      }

      tab.classList.remove("active");
      tab.setAttribute("aria-selected", "false");

      return;
    }

    // HINA — NONAKTIFKAN TAB LAIN
    hinaTabs.forEach(item => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });

    // HINA — TUTUP DETAIL SEBELUM GANTI KATEGORI
    if (hinaDetail) {
      hinaDetail.classList.remove("active");
      hinaDetail.hidden = true;
    }

    // HINA — AKTIFKAN KATEGORI PILIHAN
    hinaActiveCategory = category;

    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    // HINA — TAMPILKAN GRID KATEGORI
    renderHina(category);
  });
});


// ==========================================
// HINA — TAMPILAN AWAL
// ==========================================

if (hinaGrid) {
  hinaGrid.innerHTML = "";
}

if (hinaDetail) {
  hinaDetail.classList.remove("active");
  hinaDetail.hidden = true;
}

// ==========================================
// HINA — NAVIGASI MODE KUIS
// ==========================================

const hinaStartRelaxedQuiz =
  document.getElementById("startRelaxedQuiz");

const hinaStartChallengeQuiz =
  document.getElementById("startChallengeQuiz");

// HINA — MODE SANTAI
if (hinaStartRelaxedQuiz) {
  hinaStartRelaxedQuiz.addEventListener("click", () => {
    window.location.href = "quiz-hiragana.html?mode=relaxed";
  });
}

// HINA — MODE TANTANGAN
if (hinaStartChallengeQuiz) {
  hinaStartChallengeQuiz.addEventListener("click", () => {
    window.location.href = "quiz-hiragana.html?mode=challenge";
  });
}

// ==========================================
// HINA — AKHIR ISOLASI SCRIPT
// ==========================================

})();