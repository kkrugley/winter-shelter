import { describe, it, expect } from "vitest";
import { reduceServiceState, normalizePhone, normalizeCity, type ServiceVoteState } from "./workshops";

const fresh: ServiceVoteState = {
  status: "pending",
  relevant_votes: 0,
  irrelevant_votes: 0,
  irrelevant_streak: 0,
};

describe("reduceServiceState", () => {
  it("confirms on any relevant vote and resets the streak", () => {
    const after = reduceServiceState({ ...fresh, irrelevant_streak: 2 }, "relevant");
    expect(after.status).toBe("confirmed");
    expect(after.relevant_votes).toBe(1);
    expect(after.irrelevant_streak).toBe(0);
  });

  it("hides after 3 irrelevant votes in a row with no relevant", () => {
    let s = fresh;
    s = reduceServiceState(s, "irrelevant");
    expect(s.status).toBe("pending");
    s = reduceServiceState(s, "irrelevant");
    expect(s.status).toBe("pending");
    s = reduceServiceState(s, "irrelevant");
    expect(s.status).toBe("hidden");
    expect(s.irrelevant_votes).toBe(3);
  });

  it("keeps confirmed sticky even under later irrelevant votes", () => {
    let s = reduceServiceState(fresh, "relevant"); // confirmed, relevant_votes=1
    s = reduceServiceState(s, "irrelevant");
    s = reduceServiceState(s, "irrelevant");
    s = reduceServiceState(s, "irrelevant");
    expect(s.status).toBe("confirmed"); // never hides once a relevant vote exists
  });

  it("does not hide when a relevant vote broke the streak earlier", () => {
    let s = reduceServiceState(fresh, "irrelevant"); // streak 1
    s = reduceServiceState(s, "relevant"); // confirmed, streak 0
    s = reduceServiceState(s, "irrelevant"); // streak 1, still confirmed
    expect(s.status).toBe("confirmed");
  });
});

describe("normalizeCity", () => {
  it("lowercases and trims", () => {
    expect(normalizeCity("  Минск ")).toBe("минск");
  });
});

describe("normalizePhone", () => {
  it("keeps digits with a leading +", () => {
    expect(normalizePhone("+375 (29) 123-45-67")).toBe("+375291234567");
  });
  it("returns null for empty or too-short input", () => {
    expect(normalizePhone(null)).toBeNull();
    expect(normalizePhone("12")).toBeNull();
  });
});
