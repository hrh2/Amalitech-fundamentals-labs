// Pure calculator engine — no DOM access, so it's easy to unit test.
// State shape:
// { display: string, previous: number|null, operator: string|null,
//   overwrite: boolean, error: boolean }

export function initialState() {
  return { display: "0", previous: null, operator: null, overwrite: true, error: false };
}

export function inputDigit(state, digit) {
  if (state.error) return { ...initialState(), display: digit };
  if (state.overwrite) return { ...state, display: digit, overwrite: false };
  if (state.display === "0") return { ...state, display: digit };
  if (state.display.replace("-", "").length >= 12) return state; // guard runaway input
  return { ...state, display: state.display + digit };
}

export function inputDecimal(state) {
  if (state.error) return { ...initialState(), display: "0." };
  if (state.overwrite) return { ...state, display: "0.", overwrite: false };
  if (state.display.includes(".")) return state;
  return { ...state, display: state.display + "." };
}

export function clear() {
  return initialState();
}

export function negate(state) {
  if (state.error || state.display === "0") return state;
  const value = state.display.startsWith("-") ? state.display.slice(1) : "-" + state.display;
  return { ...state, display: value };
}

export function percent(state) {
  if (state.error) return state;
  const value = parseFloat(state.display) / 100;
  return { ...state, display: String(value) };
}

function apply(a, op, b) {
  switch (op) {
    case "+": return a + b;
    case "−": return a - b;
    case "×": return a * b;
    case "÷":
      if (b === 0) throw new Error("DIV_BY_ZERO");
      return a / b;
    default: return b;
  }
}

export function chooseOperator(state, op) {
  if (state.error) return state;
  if (state.operator && !state.overwrite) {
    // chain: resolve pending operation first (left-to-right, calculator-style)
    try {
      const result = apply(state.previous, state.operator, parseFloat(state.display));
      return { display: String(result), previous: result, operator: op, overwrite: true, error: false };
    } catch {
      return { display: "Error", previous: null, operator: null, overwrite: true, error: true };
    }
  }
  return { ...state, previous: parseFloat(state.display), operator: op, overwrite: true };
}

export function equals(state) {
  if (state.error || state.operator === null || state.previous === null) return state;
  try {
    const result = apply(state.previous, state.operator, parseFloat(state.display));
    return { display: String(result), previous: null, operator: null, overwrite: true, error: false };
  } catch {
    return { display: "Error", previous: null, operator: null, overwrite: true, error: true };
  }
}
