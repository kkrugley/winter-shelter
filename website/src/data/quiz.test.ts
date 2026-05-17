import { describe, it, expect } from "vitest";
import { STEPS, RESULTS, type QuizAction } from "./quiz";

const RESOURCE_PATHS = STEPS[0].opts.map((o) => o.path);
const COLONY_PATHS   = STEPS[1].opts.map((o) => o.path);
const VALID_ACTION_TYPES: QuizAction["type"][] = ["link", "external", "copy"];

describe("STEPS structure", () => {
  it("has exactly 3 steps", () => {
    expect(STEPS).toHaveLength(3);
  });

  it("each step has at least 2 options", () => {
    for (const step of STEPS) {
      expect(step.opts.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("each option has a non-empty label and path", () => {
    for (const step of STEPS) {
      for (const opt of step.opts) {
        expect(opt.label.trim()).not.toBe("");
        expect(opt.path.trim()).not.toBe("");
      }
    }
  });
});

describe("RESULTS completeness", () => {
  it("contains all resource × colony combinations", () => {
    for (const resource of RESOURCE_PATHS) {
      for (const colony of COLONY_PATHS) {
        const key = `${resource}_${colony}`;
        expect(RESULTS, `Missing RESULTS key: "${key}"`).toHaveProperty(key);
      }
    }
  });
});

describe("RESULTS validity", () => {
  for (const [key, result] of Object.entries(RESULTS)) {
    it(`"${key}" has a non-empty title and body`, () => {
      expect(result.title.trim()).not.toBe("");
      expect(result.body.trim()).not.toBe("");
    });

    it(`"${key}" has exactly 2 CTAs with valid action types`, () => {
      expect(result.cta).toHaveLength(2);
      for (const cta of result.cta) {
        expect(cta.label.trim()).not.toBe("");
        expect(VALID_ACTION_TYPES).toContain(cta.action.type);
        expect(cta.action.href.trim()).not.toBe("");
      }
    });
  }
});
