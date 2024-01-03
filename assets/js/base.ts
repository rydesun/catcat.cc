import { ThemeManager } from "./core/themeManager";
import { addRemarkStyle } from "./core/remarkStyle";
// 执行iconfont
import "./vendor/iconfont.js";

declare global {
  let themeManager: ThemeManager;
}

themeManager = new ThemeManager(
  ["light"],
  ["dark", "night"],
  "data-user-color-scheme",
  "data-user-color-scheme-variant",
  localStorage,
  "theme",
  "themeVariant",
);

document.addEventListener("DOMContentLoaded", addRemarkStyle);
