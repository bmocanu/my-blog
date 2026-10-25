import * as params from "@params";
import { initCodeBlocks } from "./codeblock.js";
import { initNotes } from "./note.js";
import { initSearch } from "./search.js";
import { initToc } from "./toc.js";

function ready(fn) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fn);
  } else {
    fn();
  }
}

ready(() => {
  if (params.fancyCode) initCodeBlocks();
  if (params.dynamicNote) initNotes();
  if (params.search) initSearch();
  if (params.toc) initToc();
});
