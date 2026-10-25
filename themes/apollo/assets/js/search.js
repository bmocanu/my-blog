// Search modal (Ctrl/Cmd+K). Reads the JSON index Hugo generates at /index.json
// (layouts/home.json): [{ title, description, url, content }].
const MAX_RESULTS = 30;
const SNIPPET_LENGTH = 150;

const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function countOccurrences(haystack, needle, max) {
  let count = 0;
  let from = 0;
  while (count < max) {
    const at = haystack.indexOf(needle, from);
    if (at === -1) break;
    count++;
    from = at + needle.length;
  }
  return count;
}

function scoreDoc(doc, terms) {
  let score = 0;
  for (const term of terms) {
    if (doc._title.includes(term)) {
      score += 6;
      if (doc._title.startsWith(term) || doc._title.includes(" " + term)) score += 3;
    }
    if (doc._description.includes(term)) score += 2;
    if (doc._url.includes(term)) score += 1;
    score += 2 * countOccurrences(doc._content, term, 5);
  }
  return score;
}

// A window of the content around the first match, with the matches wrapped in <b>.
function snippetFor(doc, terms) {
  const text = doc.content || "";
  if (!text) return escapeHtml(doc.description || "");

  const pattern = new RegExp(terms.map(escapeRegExp).join("|"), "i");
  const match = pattern.exec(text);
  if (!match) {
    const head = text.slice(0, SNIPPET_LENGTH);
    return escapeHtml(head) + (text.length > SNIPPET_LENGTH ? "…" : "");
  }

  let start = Math.max(0, match.index - 40);
  if (start > 0) {
    const space = text.indexOf(" ", start);
    if (space !== -1 && space < match.index) start = space + 1;
  }
  const end = Math.min(text.length, start + SNIPPET_LENGTH);
  const slice = text.slice(start, end);

  const highlight = new RegExp(terms.map((t) => escapeRegExp(escapeHtml(t))).join("|"), "gi");
  return (
    (start > 0 ? "…" : "") +
    escapeHtml(slice).replace(highlight, (m) => `<b>${m}</b>`) +
    (end < text.length ? "…" : "")
  );
}

export function initSearch() {
  const modal = document.getElementById("searchModal");
  const button = document.getElementById("search-button");
  if (!modal || !button) return;

  const input = document.getElementById("searchInput");
  const clearButton = document.getElementById("clear-search");
  const resultsContainer = document.getElementById("results-container");
  const results = document.getElementById("results");
  const info = document.getElementById("results-info");
  const indexUrl = modal.dataset.index;

  // Replace $SHORTCUT in the button title with the OS-specific shortcut.
  const shortcut = navigator.userAgent.toLowerCase().includes("mac") ? "Cmd + K" : "Ctrl + K";
  for (const attr of ["title", "aria-label"]) {
    const value = button.getAttribute(attr);
    if (value) button.setAttribute(attr, value.replace("$SHORTCUT", shortcut));
  }

  let indexPromise = null;
  function loadIndex() {
    if (!indexPromise) {
      indexPromise = fetch(indexUrl)
        .then((response) => response.json())
        .then((docs) =>
          docs.map((doc) => ({
            ...doc,
            _title: (doc.title || "").toLowerCase(),
            _description: (doc.description || "").toLowerCase(),
            _url: (doc.url || "").toLowerCase(),
            _content: (doc.content || "").toLowerCase(),
          })),
        )
        .catch((error) => {
          console.error("Failed to load the search index: ", error);
          indexPromise = null;
          return [];
        });
    }
    return indexPromise;
  }

  let lastFocused = null;
  const isOpen = () => modal.style.display === "block";

  function openModal() {
    lastFocused = document.activeElement;
    loadIndex();
    modal.style.display = "block";
    input.focus();
  }

  function closeModal() {
    if (!isOpen()) return;
    modal.style.display = "none";
    clearSearch();
    if (lastFocused && document.body.contains(lastFocused)) lastFocused.focus();
  }

  function clearSearch() {
    input.value = "";
    results.innerHTML = "";
    resultsContainer.style.display = "none";
    input.removeAttribute("aria-activedescendant");
    input.setAttribute("aria-expanded", "false");
    clearButton.style.display = "none";
  }

  const options = () => Array.from(results.querySelectorAll("#results > div"));

  function select(div) {
    options().forEach((o) => o.setAttribute("aria-selected", String(o === div)));
    input.setAttribute("aria-activedescendant", div.id);
  }

  function updateInfo(count) {
    info.textContent = count === 0 ? "No results" : count === 1 ? "1 result" : `${count} results`;
  }

  async function runSearch() {
    const query = input.value.trim();
    clearButton.style.display = input.value.length > 0 ? "block" : "none";
    resultsContainer.style.display = query.length > 0 ? "block" : "none";
    results.innerHTML = "";
    if (!query) return;

    const docs = await loadIndex();
    if (input.value.trim() !== query) return; // a newer search superseded this one

    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const hits = docs
      .map((doc) => ({ doc, score: scoreDoc(doc, terms) }))
      .filter((hit) => hit.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_RESULTS);

    updateInfo(hits.length);
    input.setAttribute("aria-expanded", hits.length > 0 ? "true" : "false");

    hits.forEach(({ doc }, i) => {
      const row = document.createElement("div");
      row.setAttribute("role", "option");
      row.id = "result-" + i;
      row.innerHTML = "<a><span></span><span></span></a>";
      const [titleEl, snippetEl] = row.querySelectorAll("span");
      titleEl.textContent = doc.title || doc.url;
      snippetEl.innerHTML = snippetFor(doc, terms);
      // Jump to (and highlight) the match in the page, browsers that support text fragments.
      row.querySelector("a").href = doc.url + (doc.content ? "#:~:text=" + encodeURIComponent(query) : "");
      results.appendChild(row);
    });

    if (results.firstChild) select(results.firstChild);
  }

  button.addEventListener("mouseover", loadIndex);
  button.addEventListener("click", openModal);

  input.addEventListener("input", runSearch);

  clearButton.addEventListener("click", () => {
    clearSearch();
    input.focus();
  });

  // Close when clicking outside of the dialog.
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
    event.stopPropagation();
  });

  results.addEventListener("mouseover", (event) => {
    const row = event.target.closest('div[role="option"]');
    if (row) select(row);
  });

  results.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link || event.ctrlKey || event.metaKey) return;
    // Linking to the page we are already on: the page does not reload, so close the modal.
    const normalize = (url) => url.split("#")[0].replace(/\/$/, "");
    if (normalize(link.href) === normalize(window.location.href)) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    const isMac = navigator.userAgent.toLowerCase().includes("mac");
    if (event.key.toLowerCase() === "k" && (isMac ? event.metaKey : event.ctrlKey)) {
      event.preventDefault();
      isOpen() ? closeModal() : openModal();
      return;
    }
    if (!isOpen()) return;

    if (event.key === "Escape") {
      closeModal();
      return;
    }

    // Keep the focus inside the dialog.
    if (event.key === "Tab" && (document.activeElement === input || document.activeElement === clearButton)) {
      event.preventDefault();
      (document.activeElement === input ? clearButton : input).focus();
      return;
    }

    const rows = options();
    if (rows.length === 0) return;
    const active = rows.findIndex((row) => row.getAttribute("aria-selected") === "true");
    const last = rows.length - 1;
    const targets = {
      ArrowUp: Math.max(active - 1, 0),
      ArrowDown: Math.min(active + 1, last),
      Home: 0,
      End: last,
      PageUp: Math.max(active - 3, 0),
      PageDown: Math.min(active + 3, last),
    };

    if (event.key in targets) {
      event.preventDefault();
      if (targets[event.key] !== active) {
        select(rows[targets[event.key]]);
        rows[targets[event.key]].scrollIntoView({ block: "nearest", inline: "start" });
      }
    } else if (event.key === "Enter" && active !== -1) {
      event.preventDefault();
      event.stopImmediatePropagation();
      window.location.href = rows[active].querySelector("a").href;
      closeModal(); // Necessary when linking to the current page.
    }
  });
}
