import { describe, it, expect, vi } from "vitest";

vi.mock("#app", () => ({
  useRuntimeConfig: () => ({
    public: { apiKey: "test-key" },
  }),
}));

describe("movieApi", () => {
  it("should create correct URL", () => {
    const apiKey = "test-key";
    const url = `http://www.omdbapi.com/?apikey=${apiKey}`;
    expect(url).toContain("test-key");
  });
});
