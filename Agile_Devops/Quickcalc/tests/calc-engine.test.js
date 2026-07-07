import { describe, it, expect } from "vitest";
import * as engine from "../public/calc-engine.js";

function type(state, chars) {
  for (const ch of chars) {
    if (ch >= "0" && ch <= "9") state = engine.inputDigit(state, ch);
    else if (ch === ".") state = engine.inputDecimal(state);
    else state = engine.chooseOperator(state, ch);
  }
  return state;
}

describe("US-1: basic arithmetic", () => {
  it("adds two numbers", () => {
    let s = engine.initialState();
    s = type(s, "5+3");
    s = engine.equals(s);
    expect(s.display).toBe("8");
  });

  it("subtracts two numbers", () => {
    let s = engine.initialState();
    s = type(s, "9−4");
    s = engine.equals(s);
    expect(s.display).toBe("5");
  });

  it("multiplies two numbers", () => {
    let s = engine.initialState();
    s = type(s, "6×7");
    s = engine.equals(s);
    expect(s.display).toBe("42");
  });

  it("divides two numbers", () => {
    let s = engine.initialState();
    s = type(s, "20÷4");
    s = engine.equals(s);
    expect(s.display).toBe("5");
  });

  it("handles decimals", () => {
    let s = engine.initialState();
    s = type(s, "1.5+2.25");
    s = engine.equals(s);
    expect(s.display).toBe("3.75");
  });

  it("chains operations left-to-right (calculator style)", () => {
    let s = engine.initialState();
    s = type(s, "2+3×4"); // (2+3)=5, then ×4 = 20
    s = engine.equals(s);
    expect(s.display).toBe("20");
  });
});

describe("US-3: clear", () => {
  it("AC resets to initial state", () => {
    let s = engine.initialState();
    s = type(s, "5+3");
    s = engine.clear();
    expect(s).toEqual(engine.initialState());
  });
});

describe("US-4: error handling", () => {
  it("divide by zero produces an error state, not a crash", () => {
    let s = engine.initialState();
    s = type(s, "5÷0");
    s = engine.equals(s);
    expect(s.error).toBe(true);
    expect(s.display).toBe("Error");
  });

  it("typing a digit after an error starts a fresh entry", () => {
    let s = engine.initialState();
    s = type(s, "5÷0");
    s = engine.equals(s);
    s = engine.inputDigit(s, "7");
    expect(s.error).toBe(false);
    expect(s.display).toBe("7");
  });
});

describe("extra behaviors", () => {
  it("negate flips sign", () => {
    let s = engine.initialState();
    s = engine.inputDigit(s, "5");
    s = engine.negate(s);
    expect(s.display).toBe("-5");
  });

  it("percent converts to hundredths", () => {
    let s = engine.initialState();
    s = engine.inputDigit(s, "5");
    s = engine.inputDigit(s, "0");
    s = engine.percent(s);
    expect(s.display).toBe("0.5");
  });

  it("decimal point cannot be added twice", () => {
    let s = engine.initialState();
    s = engine.inputDecimal(s);
    s = engine.inputDigit(s, "1");
    s = engine.inputDecimal(s);
    expect(s.display).toBe("0.1");
  });
});
