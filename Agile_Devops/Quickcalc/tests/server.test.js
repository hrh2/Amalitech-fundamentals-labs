import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../server.js";

describe("US-7: health endpoint", () => {
  it("GET /health returns 200 with status ok and an uptime figure", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(typeof res.body.uptimeSeconds).toBe("number");
  });
});

describe("static hosting", () => {
  it("serves the calculator UI at /", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toContain("QuickCalc");
  });
});
