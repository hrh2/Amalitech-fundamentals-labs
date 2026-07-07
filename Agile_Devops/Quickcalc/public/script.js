import * as engine from "./calc-engine.js";

const mainLine = document.getElementById("mainLine");
const historyLine = document.getElementById("historyLine");
const statusLine = document.getElementById("statusLine");
const keys = document.getElementById("keys");

let state = engine.initialState();

function render() {
  mainLine.textContent = state.display;
  mainLine.classList.toggle("is-error", state.error);
  historyLine.textContent = state.operator && state.previous !== null
    ? `${state.previous} ${state.operator}`
    : "\u00A0";
}

function setStatus(msg) {
  statusLine.textContent = msg || "\u00A0";
  if (msg) setTimeout(() => { statusLine.textContent = "\u00A0"; }, 1500);
}

function handle(action, payload) {
  switch (action) {
    case "digit": state = engine.inputDigit(state, payload); break;
    case "decimal": state = engine.inputDecimal(state); break;
    case "clear": state = engine.clear(); setStatus("Cleared"); break;
    case "negate": state = engine.negate(state); break;
    case "percent": state = engine.percent(state); break;
    case "operator": state = engine.chooseOperator(state, payload); break;
    case "equals": {
      const before = state;
      state = engine.equals(state);
      if (state.error && !before.error) setStatus("Can't divide by zero");
      break;
    }
  }
  render();
}

keys.addEventListener("click", (e) => {
  const btn = e.target.closest(".key");
  if (!btn) return;
  if (btn.dataset.num !== undefined) return handle("digit", btn.dataset.num);
  if (btn.dataset.op !== undefined) return handle("operator", btn.dataset.op);
  if (btn.dataset.action) return handle(btn.dataset.action);
});

render();

// US-5: keyboard support, so the calculator is fully usable without a mouse.
const OP_KEYS = { "+": "+", "-": "\u2212", "*": "\u00d7", "/": "\u00f7" };

window.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") return handle("digit", e.key);
  if (e.key === ".") return handle("decimal");
  if (e.key in OP_KEYS) return handle("operator", OP_KEYS[e.key]);
  if (e.key === "Enter" || e.key === "=") { e.preventDefault(); return handle("equals"); }
  if (e.key === "Escape") return handle("clear");
  if (e.key === "%") return handle("percent");
});
