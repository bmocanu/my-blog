// Color scheme handling. Inlined in <head> (see layouts/_partials/head/theme.html)
// so the right scheme is applied before the first paint.
//
// window.apolloTheme is set by the template to the `theme` param:
//   "light" | "dark"       fixed scheme
//   "auto"                 follow the OS preference
//   "toggle"               light <-> dark button, remembered in localStorage
//   "toggle-auto"          light -> dark -> auto button, remembered in localStorage
(function () {
  var mode = window.apolloTheme || "toggle";
  var KEY = "theme-storage";
  var root = document.documentElement;
  var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function systemPrefersDark() {
    return !!(media && media.matches);
  }

  function read() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }

  function save(value) {
    try {
      localStorage.setItem(KEY, value);
    } catch (e) {}
  }

  function current() {
    if (mode === "light" || mode === "dark" || mode === "auto") return mode;
    var saved = read();
    if (!saved) saved = systemPrefersDark() ? "dark" : "light";
    // The 2-state toggle has no "auto": resolve it to the system preference.
    if (mode === "toggle" && saved === "auto") {
      saved = systemPrefersDark() ? "dark" : "light";
      save(saved);
    }
    return saved;
  }

  function apply() {
    var value = current();
    var dark = value === "dark" || (value === "auto" && systemPrefersDark());
    root.classList.toggle("dark", dark);
    root.classList.toggle("light", !dark);
    root.setAttribute("data-theme-mode", value);
  }

  function toggle() {
    var value = current();
    if (mode === "toggle-auto") {
      // 3-state: light -> dark -> auto -> light
      save(value === "light" ? "dark" : value === "dark" ? "auto" : "light");
    } else {
      save(value === "light" ? "dark" : "light");
    }
    apply();
  }

  window.toggleTheme = toggle;
  apply();

  // Follow OS changes while in auto mode.
  if (media && media.addEventListener) {
    media.addEventListener("change", function () {
      if (current() === "auto") apply();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById("dark-mode-toggle");
    if (!button) return;
    button.addEventListener("click", function (event) {
      event.preventDefault();
      toggle();
    });
  });
})();
