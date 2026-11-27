/* =====================================================
   KOSAKATA N5 — PEMUAT DATA PER KELOMPOK
   Data: assets/data/N5/n5-kosakata-kelompok-{nomor}.json
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const groupGrid = document.querySelector(".vocab-group-grid");
  if (!groupGrid) return;

  const groupCards = Array.from(
    groupGrid.querySelectorAll(".vocab-group-card")
  );
  if (!groupCards.length) return;

  let activePanel = null;
  let activeCard = null;

  /* AUDIT V7.0 — MEMUAT JSON KELOMPOK SECARA TERPISAH */
  async function loadGroupData(groupNumber) {
    const filePath =
      `assets/data/N5/n5-kosakata-kelompok-${groupNumber}.json`;

    const response = await fetch(filePath);

    if (!response.ok) {
      const error = new Error(
        `Gagal memuat ${filePath}: ${response.status}`
      );
      error.status = response.status;
      throw error;
    }

    const data = await response.json();
    let group = null;

    if (Array.isArray(data.groups)) {
      group = data.groups.find(
        item => Number(item.number) === Number(groupNumber)
      ) || data.groups[0];
    } else if (data.group) {
      group = data.group;
    } else {
      group = data;
    }

    if (!group || typeof group !== "object") {
      throw new Error(
        `Struktur JSON Kelompok ${groupNumber} tidak valid.`
      );
    }

    return group;
  }

  /* MENYIAPKAN AKSI KARTU DAN AKSES KEYBOARD */
  groupCards.forEach((card, index) => {
    const groupNumber = Number(card.dataset.groupNumber) || index + 1;

    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-expanded", "false");
    card.setAttribute(
      "aria-controls",
      `vocab-group-panel-${groupNumber}`
    );

    card.addEventListener("click", () => {
      toggleGroup(card, groupNumber, index);
    });

    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleGroup(card, groupNumber, index);
      }
    });
  });

  /* AUDIT V7.0 — STATUS LOADING, PANEL MATERI, DAN PENANGANAN ERROR */
  async function toggleGroup(card, groupNumber, groupIndex) {
    if (activeCard === card && activePanel) {
      closeActivePanel();
      return;
    }

    closeActivePanel();

    const title =
      card.querySelector("h3")?.textContent.trim() ||
      `Kelompok ${groupNumber}`;
    const description =
      card.querySelector("p")?.textContent.trim() || "";

    /* KELOMPOK 17–20 DITANDAI BELUM TERSEDIA DI HTML */
    if (card.dataset.comingSoon === "true") {
      const comingSoonPanel = createMessagePanel(
        groupNumber,
        title,
        description,
        `Materi Kelompok ${groupNumber} masih dalam penyusunan. Silakan pelajari kelompok 1–16 yang sudah tersedia terlebih dahulu.`
      );

      card.insertAdjacentElement("afterend", comingSoonPanel);
      comingSoonPanel.hidden = false;
      card.setAttribute("aria-expanded", "true");
      activePanel = comingSoonPanel;
      activeCard = card;
      comingSoonPanel.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      return;
    }

    const loadingPanel = createMessagePanel(
      groupNumber,
      title,
      description,
      "Memuat materi kosakata..."
    );

    loadingPanel.dataset.loading = "true";
    card.insertAdjacentElement("afterend", loadingPanel);
    loadingPanel.hidden = false;
    card.setAttribute("aria-expanded", "true");
    activePanel = loadingPanel;
    activeCard = card;

    loadingPanel.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    try {
      const group = await loadGroupData(groupNumber);

      /* Abaikan hasil fetch lama bila pengguna sudah membuka kelompok lain. */
      if (activeCard !== card || activePanel !== loadingPanel) return;

      group.number = group.number || groupNumber;
      group.title = title || group.title;
      group.description = description || group.description || "";

      const newPanel = createGroupPanel(group, groupIndex);
      newPanel.hidden = false;
      loadingPanel.replaceWith(newPanel);
      activePanel = newPanel;
    } catch (error) {
      console.error(
        `Kesalahan memuat Kelompok ${groupNumber}:`,
        error
      );

      if (activeCard !== card || activePanel !== loadingPanel) return;

      const message = loadingPanel.querySelector(
        ".vocab-empty-message"
      );

      if (message) {
        message.textContent = error.status === 404
          ? `File data Kelompok ${groupNumber} belum tersedia. Periksa folder assets/data/N5/.`
          : `Materi Kelompok ${groupNumber} belum dapat dimuat. Jalankan website melalui server lokal dan periksa file JSON.`;
      }

      delete loadingPanel.dataset.loading;
      loadingPanel.dataset.loadError = "true";
    }
  }

  function closeActivePanel() {
    if (activePanel) activePanel.remove();

    if (activeCard) {
      activeCard.setAttribute("aria-expanded", "false");
    }

    activePanel = null;
    activeCard = null;
  }

  /* MEMBUAT KERANGKA PANEL YANG DIPAKAI SAAT LOADING/INFO */
  function createMessagePanel(
    groupNumber,
    title,
    description,
    messageText
  ) {
    const panel = document.createElement("section");
    panel.className = "vocab-group-detail";
    panel.id = `vocab-group-panel-${groupNumber}`;
    panel.hidden = true;

    panel.innerHTML = `
      <div class="vocab-detail-heading">
        <div>
          <span class="vocab-detail-number">KELOMPOK ${groupNumber}</span>
          <h2></h2>
          <p></p>
        </div>
        <button type="button" class="vocab-close-button">
          Tutup ✕
        </button>
      </div>
      <div class="vocab-subgroup-list">
        <div class="vocab-empty-message"></div>
      </div>
    `;

    panel.querySelector("h2").textContent = title;
    panel.querySelector(".vocab-detail-heading p").textContent = description;
    panel.querySelector(".vocab-empty-message").textContent = messageText;
    panel.querySelector(".vocab-close-button").setAttribute(
      "aria-label",
      `Tutup kelompok ${groupNumber}`
    );
    panel.querySelector(".vocab-close-button").addEventListener(
      "click",
      closeActivePanel
    );

    return panel;
  }

  /* MEMBUAT PANEL LENGKAP DARI DATA JSON */
  function createGroupPanel(group, groupIndex) {
    const panel = document.createElement("section");
    panel.className = "vocab-group-detail";
    panel.id = `vocab-group-panel-${group.number}`;
    panel.hidden = true;

    panel.innerHTML = `
      <div class="vocab-detail-heading">
        <div>
          <span class="vocab-detail-number">KELOMPOK ${group.number}</span>
          <h2></h2>
          <p></p>
        </div>
        <button type="button" class="vocab-close-button">
          Tutup ✕
        </button>
      </div>
      <div class="vocab-subgroup-list"></div>
    `;

    panel.querySelector("h2").textContent = group.title || "";
    panel.querySelector(".vocab-detail-heading p").textContent =
      group.description || "";
    panel.querySelector(".vocab-close-button").setAttribute(
      "aria-label",
      `Tutup kelompok ${group.number}`
    );

    const subgroupList = panel.querySelector(".vocab-subgroup-list");

    /* CATATAN TINGKAT KELOMPOK (JIKA ADA) */
    if (group.note) {
      const groupNote = document.createElement("div");
      groupNote.className = "vocab-group-note";

      if (group.note.title) {
        const noteTitle = document.createElement("strong");
        noteTitle.textContent = group.note.title;
        groupNote.appendChild(noteTitle);
      }

      if (group.note.intro) {
        const noteIntro = document.createElement("p");
        noteIntro.textContent = group.note.intro;
        groupNote.appendChild(noteIntro);
      }

      if (group.note.footer) {
        const noteFooter = document.createElement("p");
        noteFooter.textContent = group.note.footer;
        groupNote.appendChild(noteFooter);
      }

      panel.querySelector(".vocab-detail-heading").insertAdjacentElement(
        "afterend",
        groupNote
      );
    }

    if (!Array.isArray(group.subgroups) || !group.subgroups.length) {
      const emptyMessage = document.createElement("div");
      emptyMessage.className = "vocab-empty-message";
      emptyMessage.textContent =
        "Materi kelompok ini sedang disiapkan.";
      subgroupList.appendChild(emptyMessage);
    }

    (group.subgroups || []).forEach((subgroup, subgroupIndex) => {
      const subgroupElement = document.createElement("article");
      subgroupElement.className = "vocab-subgroup";

      const subgroupToggle = document.createElement("button");
      subgroupToggle.type = "button";
      subgroupToggle.className = "vocab-subgroup-toggle";
      subgroupToggle.setAttribute("aria-expanded", "false");

      const subgroupName = document.createElement("span");
      subgroupName.className = "vocab-subgroup-name";

      const subgroupNumber = document.createElement("span");
      subgroupNumber.className = "vocab-subgroup-number";
      subgroupNumber.textContent = subgroup.number || "";

      const subgroupTitle = document.createElement("span");
      subgroupTitle.textContent = subgroup.title || "";

      subgroupName.append(subgroupNumber, subgroupTitle);

      const subgroupArrow = document.createElement("span");
      subgroupArrow.className = "vocab-subgroup-arrow";
      subgroupArrow.textContent = "⌄";

      subgroupToggle.append(subgroupName, subgroupArrow);

      const subgroupContent = document.createElement("div");
      subgroupContent.className = "vocab-subgroup-content";
      subgroupContent.hidden = true;

      const subgroupNote = document.createElement("div");
      subgroupNote.className = "vocab-subgroup-note";
      subgroupContent.appendChild(subgroupNote);

      const tabList = document.createElement("div");
      tabList.className = "vocab-inner-tab-list";
      tabList.hidden = true;

      const tabPanels = document.createElement("div");
      tabPanels.className = "vocab-inner-tab-panels";

      subgroupContent.append(tabList, tabPanels);
      subgroupElement.append(subgroupToggle, subgroupContent);

      /* AUDIT V7.0 — CATATAN SUBKELOMPOK MUNCUL SEBELUM TAB/DAFTAR KATA */
      if (subgroup.note) {
        renderPronunciationNote(subgroup.note, subgroupNote);
      }

      if (Array.isArray(subgroup.tabs) && subgroup.tabs.length) {
        tabList.hidden = false;

        subgroup.tabs.forEach((tab, tabIndex) => {
          const tabButton = document.createElement("button");
          tabButton.type = "button";
          tabButton.className = "vocab-inner-tab";
          tabButton.textContent = tab.title || `Bagian ${tabIndex + 1}`;
          tabButton.setAttribute("aria-selected", "false");

          const tabPanel = document.createElement("div");
          tabPanel.className = "vocab-inner-tab-panel";
          tabPanel.hidden = true;

          renderWordList(
            tab.words || [],
            tabPanel,
            groupIndex,
            subgroupIndex,
            tabIndex
          );

          /* TAB NOTE TETAP DIDUKUNG UNTUK DATA LAMA */
          if (tab.note && !subgroup.note) {
            renderPronunciationNote(tab.note, tabPanel);
          }

          tabButton.addEventListener("click", () => {
            tabList.querySelectorAll(".vocab-inner-tab").forEach(button => {
              button.classList.remove("active");
              button.setAttribute("aria-selected", "false");
            });

            tabPanels.querySelectorAll(".vocab-inner-tab-panel").forEach(content => {
              content.hidden = true;
            });

            tabButton.classList.add("active");
            tabButton.setAttribute("aria-selected", "true");
            tabPanel.hidden = false;
          });

          tabList.appendChild(tabButton);
          tabPanels.appendChild(tabPanel);

          if (tabIndex === 0) {
            tabButton.classList.add("active");
            tabButton.setAttribute("aria-selected", "true");
            tabPanel.hidden = false;
          }
        });
      } else {
        renderWordList(
          subgroup.words || [],
          tabPanels,
          groupIndex,
          subgroupIndex,
          0
        );
      }

      subgroupToggle.addEventListener("click", () => {
        const shouldOpen = subgroupContent.hidden;
        subgroupContent.hidden = !shouldOpen;
        subgroupToggle.setAttribute(
          "aria-expanded",
          String(shouldOpen)
        );
        subgroupArrow.textContent = shouldOpen ? "⌃" : "⌄";
      });

      subgroupList.appendChild(subgroupElement);
    });

    panel.querySelector(".vocab-close-button").addEventListener(
      "click",
      closeActivePanel
    );

    return panel;
  }

  /* DAFTAR KOSAKATA DAN DETAIL KATA */
  function renderWordList(
    words,
    target,
    groupIndex,
    subgroupIndex,
    tabIndex = 0
  ) {
    const wordList = document.createElement("div");
    wordList.className = "vocab-word-list";

    (words || []).forEach((word, wordIndex) => {
      const wordElement = document.createElement("div");
      wordElement.className = "vocab-word-item";

      const detailId =
        `vocab-detail-${groupIndex}-${subgroupIndex}-${tabIndex}-${wordIndex}`;
      const label = word.label || "";
      const wordToggle = document.createElement("button");
      wordToggle.type = "button";
      wordToggle.className = label
        ? "vocab-word-toggle"
        : "vocab-word-toggle no-label";
      wordToggle.setAttribute("aria-expanded", "false");
      wordToggle.setAttribute("aria-controls", detailId);

      const japanese = document.createElement("span");
      japanese.className = "vocab-word-japanese";
      japanese.textContent = word.jp || "";
      wordToggle.appendChild(japanese);

      /* LABEL HANYA DITAMPILKAN BILA ADA DI FILE JSON */
      if (label) {
        const labelElement = document.createElement("span");
        labelElement.className =
          `vocab-word-label label-${String(label).toLowerCase()}`;
        labelElement.textContent = label;
        wordToggle.appendChild(labelElement);
      }

      const wordArrow = document.createElement("span");
      wordArrow.className = "vocab-word-arrow";
      wordArrow.textContent = "＋";
      wordToggle.appendChild(wordArrow);

      const wordDetail = document.createElement("div");
      wordDetail.className = "vocab-word-detail";
      wordDetail.id = detailId;
      wordDetail.hidden = true;

      const romaji = document.createElement("p");
      romaji.className = "vocab-word-romaji";
      romaji.textContent = word.romaji || "";
      wordDetail.appendChild(romaji);

      const meaning = document.createElement("p");
      meaning.className = "vocab-word-meaning";
      const meaningLabel = document.createElement("strong");
      meaningLabel.textContent = "Arti: ";
      meaning.append(meaningLabel, document.createTextNode(word.meaning || ""));
      wordDetail.appendChild(meaning);

      if (word.note) {
        const wordNote = document.createElement("p");
        wordNote.className = "vocab-word-note";
        wordNote.textContent = word.note;
        wordDetail.appendChild(wordNote);
      }

      if (word.example) {
        const example = document.createElement("div");
        example.className = "vocab-example";

        const exampleHeading = document.createElement("p");
        const exampleHeadingStrong = document.createElement("strong");
        exampleHeadingStrong.textContent = "Contoh kalimat:";
        exampleHeading.appendChild(exampleHeadingStrong);
        example.appendChild(exampleHeading);

        const exampleJapanese = document.createElement("p");
        exampleJapanese.className = "vocab-example-jp";
        exampleJapanese.textContent = word.example;
        example.appendChild(exampleJapanese);

        if (word.exampleRomaji) {
          const exampleRomaji = document.createElement("p");
          exampleRomaji.className = "vocab-example-romaji";
          exampleRomaji.textContent = word.exampleRomaji;
          example.appendChild(exampleRomaji);
        }

        const exampleTranslation = document.createElement("p");
        exampleTranslation.className = "vocab-example-id";
        exampleTranslation.textContent = word.translation || "";
        example.appendChild(exampleTranslation);

        wordDetail.appendChild(example);
      }

      const audioButton = document.createElement("button");
      audioButton.type = "button";
      audioButton.className = "vocab-audio-button";
      audioButton.textContent = "🔊 Dengarkan Pelafalan";
      audioButton.addEventListener("click", () => {
        speakJapanese(word.audio || word.jp || "");
      });
      wordDetail.appendChild(audioButton);

      wordToggle.addEventListener("click", () => {
        const shouldOpen = wordDetail.hidden;
        wordDetail.hidden = !shouldOpen;
        wordToggle.setAttribute("aria-expanded", String(shouldOpen));
        wordArrow.textContent = shouldOpen ? "−" : "＋";
      });

      wordElement.append(wordToggle, wordDetail);
      wordList.appendChild(wordElement);
    });

    target.appendChild(wordList);
  }

  /* AUDIT V7.0 — RENDER CATATAN DARI JSON, TANPA MENGGANDAKAN CATATAN */
  function renderPronunciationNote(note, target) {
    if (!note || !target) return;

    const noteContainer = document.createElement("section");
    noteContainer.className = "vocab-pronunciation-note";

    if (note.title) {
      const noteTitle = document.createElement("h3");
      noteTitle.className = "vocab-pronunciation-title";
      noteTitle.textContent = note.title;
      noteContainer.appendChild(noteTitle);
    }

    if (note.intro) {
      const noteIntro = document.createElement("p");
      noteIntro.className = "vocab-pronunciation-intro";
      noteIntro.textContent = note.intro;
      noteContainer.appendChild(noteIntro);
    }

    if (Array.isArray(note.items) && note.items.length) {
      const tableWrapper = document.createElement("div");
      tableWrapper.className = "vocab-pronunciation-table-wrapper";

      const table = document.createElement("table");
      table.className = "vocab-pronunciation-table";

      const tableHead = document.createElement("thead");
      tableHead.innerHTML = `
        <tr>
          <th>Angka</th>
          <th>Bahasa Jepang</th>
          <th>Romaji</th>
        </tr>
      `;

      const tableBody = document.createElement("tbody");
      note.items.forEach(item => {
        const row = document.createElement("tr");
        [item.number, item.japanese, item.romaji].forEach(value => {
          const cell = document.createElement("td");
          cell.textContent = value || "";
          row.appendChild(cell);
        });
        tableBody.appendChild(row);
      });

      table.append(tableHead, tableBody);
      tableWrapper.appendChild(table);
      noteContainer.appendChild(tableWrapper);
    }

    if (note.footer) {
      const noteFooter = document.createElement("p");
      noteFooter.className = "vocab-pronunciation-footer";
      noteFooter.textContent = note.footer;
      noteContainer.appendChild(noteFooter);
    }

    target.appendChild(noteContainer);
  }

  /* AUDIO PELAFALAN BAHASA JEPANG */
  function speakJapanese(text) {
    if (!("speechSynthesis" in window)) {
      alert("Maaf, browser ini belum mendukung audio pelafalan.");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = 0.85;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }
});
