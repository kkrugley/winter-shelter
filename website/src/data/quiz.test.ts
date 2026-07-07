import { describe, it, expect } from "vitest";
import { STEP1, BRANCHES, type QuizAction } from "./quiz";

const VALID_ACTION_TYPES: QuizAction["type"][] = ["link", "external", "copy"];

describe("STEP1 structure", () => {
  it("has a non-empty question and at least 2 options", () => {
    expect(STEP1.q.trim()).not.toBe("");
    expect(STEP1.opts.length).toBeGreaterThanOrEqual(2);
  });

  it("each option has a non-empty label and path", () => {
    for (const opt of STEP1.opts) {
      expect(opt.label.trim()).not.toBe("");
      expect(opt.path.trim()).not.toBe("");
    }
  });

  it("every option's path resolves to a branch", () => {
    for (const opt of STEP1.opts) {
      expect(BRANCHES, `Missing branch for STEP1 path: "${opt.path}"`).toHaveProperty(opt.path);
    }
  });
});

describe("BRANCHES structure", () => {
  for (const [branchKey, branch] of Object.entries(BRANCHES)) {
    describe(`branch "${branchKey}"`, () => {
      it("has a non-empty question and at least 1 option", () => {
        expect(branch.q.trim()).not.toBe("");
        expect(branch.opts.length).toBeGreaterThanOrEqual(1);
      });

      it("each option has a non-empty label and path", () => {
        for (const opt of branch.opts) {
          expect(opt.label.trim()).not.toBe("");
          expect(opt.path.trim()).not.toBe("");
        }
      });

      it("every option's path resolves to a result", () => {
        for (const opt of branch.opts) {
          expect(branch.results, `Missing result for "${branchKey}.${opt.path}"`).toHaveProperty(opt.path);
        }
      });

      for (const [resultKey, result] of Object.entries(branch.results)) {
        it(`result "${resultKey}" has a non-empty title and body`, () => {
          expect(result.title.trim()).not.toBe("");
          expect(result.body.trim()).not.toBe("");
        });

        it(`result "${resultKey}" has 1-3 CTAs with valid action types`, () => {
          expect(result.cta.length).toBeGreaterThanOrEqual(1);
          expect(result.cta.length).toBeLessThanOrEqual(3);
          for (const cta of result.cta) {
            expect(cta.label.trim()).not.toBe("");
            expect(VALID_ACTION_TYPES).toContain(cta.action.type);
            // "copy" may have an empty href — it means "copy the current page's URL"
            if (cta.action.type !== "copy") {
              expect(cta.action.href.trim()).not.toBe("");
            }
          }
        });
      }
    });
  }
});
