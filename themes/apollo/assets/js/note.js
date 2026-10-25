// Collapsible notes (the `note` shortcode with clickable=true).
export function initNotes() {
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
