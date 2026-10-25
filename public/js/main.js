(() => {
  // ns-hugo-params:<stdin>
  var dynamicNote = true;
  var fancyCode = true;
  var search = true;
  var toc = true;

  // ns-hugo-imp:D:\Blogging\my-blog-new\themes\apollo\assets\js\codeblock.js
  var successIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-check-lg" viewBox="0 0 16 16">
            <path d="M13.485 1.85a.5.5 0 0 1 1.065.02.75.75 0 0 1-.02 1.065L5.82 12.78a.75.75 0 0 1-1.106.02L1.476 9.346a.75.75 0 1 1 1.05-1.07l2.74 2.742L12.44 2.92a.75.75 0 0 1 1.045-.07z"/>
        </svg>`;
  var errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.293 2.293a1 1 0 0 1 1.414 0L8 6.586l4.293-4.293a1 1 0 0 1 1.414 1.414L9.414 8l4.293 4.293a1 1 0 0 1-1.414 1.414L8 9.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L6.586 8 2.293 3.707a1 1 0 0 1 0-1.414z"/>
        </svg>`;
  var copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-clipboard" viewBox="0 0 16 16">
                <path d="M10 1.5a.5.5 0 0 1 .5-.5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h2a.5.5 0 0 1 .5.5V3h3V1.5zM6.5 3V2h3v1h-3zm4 0v1h2a1 1 0 0 0-1-1h-2V3zm-5 0H3a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H5.5V3z"/>
            </svg>`;
  var changeIcon = (button, isSuccess) => {
    button.innerHTML = isSuccess ? successIcon : errorIcon;
    setTimeout(() => {
      button.innerHTML = copyIcon;
    }, 2e3);
  };
  var getCodeText = (codeBlock) => {
    const clone = codeBlock.cloneNode(true);
    clone.querySelectorAll(".ln, .lnt").forEach((el) => el.remove());
    return clone.textContent.trim();
  };
  function initCodeBlocks() {
    document.querySelectorAll("pre code").forEach((codeBlock) => {
      const pre = codeBlock.parentNode;
      pre.style.position = "relative";
      const copyBtn = document.createElement("button");
      copyBtn.className = "clipboard-button";
      copyBtn.innerHTML = copyIcon;
      copyBtn.setAttribute("aria-label", "Copy code to clipboard");
      pre.appendChild(copyBtn);
      copyBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(getCodeText(codeBlock));
          changeIcon(copyBtn, true);
        } catch (error) {
          console.error("Failed to copy text: ", error);
          changeIcon(copyBtn, false);
        }
      });
      const lang = codeBlock.getAttribute("data-lang") || "default";
      const label = document.createElement("span");
      label.className = "code-label label-" + lang;
      label.textContent = lang.toUpperCase();
      pre.appendChild(label);
      let ticking = false;
      pre.addEventListener("scroll", () => {
        if (ticking) return;
        window.requestAnimationFrame(() => {
          copyBtn.style.right = `-${pre.scrollLeft}px`;
          label.style.right = `-${pre.scrollLeft}px`;
          ticking = false;
        });
        ticking = true;
      });
    });
  }

  // ns-hugo-imp:D:\Blogging\my-blog-new\themes\apollo\assets\js\note.js
  function initNotes() {
    document.querySelectorAll(".note-toggle").forEach((toggleButton) => {
      const content = toggleButton.nextElementSibling;
      const isHidden = content.style.display === "none";
      toggleButton.setAttribute("aria-expanded", String(!isHidden));
      toggleButton.addEventListener("click", () => {
        const expanded = toggleButton.getAttribute("aria-expanded") === "true";
        toggleButton.setAttribute("aria-expanded", String(!expanded));
        content.style.display = expanded ? "none" : "block";
      });
    });
  }

  // ns-hugo-imp:D:\Blogging\my-blog-new\themes\apollo\assets\js\search.js
  var MAX_RESULTS = 30;
  var SNIPPET_LENGTH = 150;
  var escapeHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  var escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
  function snippetFor(doc, terms) {
    const text = doc.content || "";
    if (!text) return escapeHtml(doc.description || "");
    const pattern = new RegExp(terms.map(escapeRegExp).join("|"), "i");
    const match = pattern.exec(text);
    if (!match) {
      const head = text.slice(0, SNIPPET_LENGTH);
      return escapeHtml(head) + (text.length > SNIPPET_LENGTH ? "\u2026" : "");
    }
    let start = Math.max(0, match.index - 40);
    if (start > 0) {
      const space = text.indexOf(" ", start);
      if (space !== -1 && space < match.index) start = space + 1;
    }
    const end = Math.min(text.length, start + SNIPPET_LENGTH);
    const slice = text.slice(start, end);
    const highlight = new RegExp(terms.map((t) => escapeRegExp(escapeHtml(t))).join("|"), "gi");
    return (start > 0 ? "\u2026" : "") + escapeHtml(slice).replace(highlight, (m) => `<b>${m}</b>`) + (end < text.length ? "\u2026" : "");
  }
  function initSearch() {
    const modal = document.getElementById("searchModal");
    const button = document.getElementById("search-button");
    if (!modal || !button) return;
    const input = document.getElementById("searchInput");
    const clearButton = document.getElementById("clear-search");
    const resultsContainer = document.getElementById("results-container");
    const results = document.getElementById("results");
    const info = document.getElementById("results-info");
    const indexUrl = modal.dataset.index;
    const shortcut = navigator.userAgent.toLowerCase().includes("mac") ? "Cmd + K" : "Ctrl + K";
    for (const attr of ["title", "aria-label"]) {
      const value = button.getAttribute(attr);
      if (value) button.setAttribute(attr, value.replace("$SHORTCUT", shortcut));
    }
    let indexPromise = null;
    function loadIndex() {
      if (!indexPromise) {
        indexPromise = fetch(indexUrl).then((response) => response.json()).then(
          (docs) => docs.map((doc) => ({
            ...doc,
            _title: (doc.title || "").toLowerCase(),
            _description: (doc.description || "").toLowerCase(),
            _url: (doc.url || "").toLowerCase(),
            _content: (doc.content || "").toLowerCase()
          }))
        ).catch((error) => {
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
      if (input.value.trim() !== query) return;
      const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
      const hits = docs.map((doc) => ({ doc, score: scoreDoc(doc, terms) })).filter((hit) => hit.score > 0).sort((a, b) => b.score - a.score).slice(0, MAX_RESULTS);
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
        PageDown: Math.min(active + 3, last)
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
        closeModal();
      }
    });
  }

  // ns-hugo-imp:D:\Blogging\my-blog-new\themes\apollo\assets\js\toc.js
  function initToc() {
    const submenu = [...document.querySelectorAll(".toc a")];
    if (submenu.length === 0) return;
    const paragraphs = [...document.querySelectorAll("section > *")];
    const observer = new IntersectionObserver(handler, { threshold: [0] });
    function previousHeaderId(e) {
      for (; e && !e.matches("h1, h2, h3, h4"); ) e = e.previousElementSibling;
      return e?.id;
    }
    const paragraphMenuMap = paragraphs.reduce((map, paragraph) => {
      const id = previousHeaderId(paragraph);
      paragraph.previousHeader = id;
      if (id) {
        map[id] = submenu.find((a) => decodeURIComponent(a.hash) === "#" + id);
      }
      return map;
    }, {});
    paragraphs.forEach((p) => observer.observe(p));
    let selection;
    function handler(entries) {
      selection = (selection || entries).map(
        (t) => entries.find((e) => e.target === t.target) || t
      );
      for (const s of selection) {
        if (!s.isIntersecting) {
          paragraphMenuMap[s.target.previousHeader]?.parentElement.classList.remove(
            "selected",
            "parent"
          );
        }
      }
      for (const s of selection) {
        if (!s.isIntersecting) continue;
        let li = paragraphMenuMap[s.target.previousHeader]?.closest("li");
        if (!li) continue;
        li.classList.add("selected");
        li.querySelector("a")?.scrollIntoView({ block: "nearest", inline: "nearest" });
        for (; li; ) {
          li.classList.add("parent");
          li = li.parentElement.closest("li");
        }
      }
    }
  }

  // <stdin>
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }
  ready(() => {
    if (fancyCode) initCodeBlocks();
    if (dynamicNote) initNotes();
    if (search) initSearch();
    if (toc) initToc();
  });
})();
//# sourceMappingURL=main.js.map
