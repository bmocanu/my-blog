// Highlights the table-of-contents entry of the section currently being read.
export function initToc() {
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
      (t) => entries.find((e) => e.target === t.target) || t,
    );
    for (const s of selection) {
      if (!s.isIntersecting) {
        paragraphMenuMap[s.target.previousHeader]?.parentElement.classList.remove(
          "selected",
          "parent",
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
