import { describe, it, expect } from "vitest";
import { formatInstalledDate } from "./utils";

describe("formatInstalledDate", () => {
  it("returns empty string for null", () => {
    expect(formatInstalledDate(null)).toBe("");
  });

  it("returns empty string for empty string", () => {
    expect(formatInstalledDate("")).toBe("");
  });

  it("returns empty string for unparseable input", () => {
    expect(formatInstalledDate("not-a-date")).toBe("");
  });

  it("formats a normal date correctly", () => {
    expect(formatInstalledDate("2024-11-01")).toBe("11.24");
  });

  it("pads single-digit months", () => {
    expect(formatInstalledDate("2024-03-15")).toBe("03.24");
  });

  it("handles December boundary", () => {
    expect(formatInstalledDate("2025-12-31")).toBe("12.25");
  });

  it("handles January boundary", () => {
    expect(formatInstalledDate("2025-01-01")).toBe("01.25");
  });

  it("uses UTC month to avoid timezone offset bugs", () => {
    // "2024-11-01" in any timezone should always read as November
    expect(formatInstalledDate("2024-11-01")).toMatch(/^11\./);
  });
});
