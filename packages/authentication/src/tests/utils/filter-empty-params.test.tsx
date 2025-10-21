import { filterEmptyParams } from "../../utils/filter-empty-params.ts";

describe("filterEmptyParams", () => {
  it("returns undefined when input is undefined", () => {
    expect(filterEmptyParams(undefined)).toBeUndefined();
  });

  it("removes undefined, null and empty string values", () => {
    const input = {
      a: "1",
      b: "",
      c: undefined as unknown as string,
      d: null as unknown as string,
      e: "ok",
    };
    expect(filterEmptyParams(input)).toEqual({ a: "1", e: "ok" });
  });

  it("returns undefined when all values are filtered out", () => {
    const input = { a: "", b: "" };
    expect(filterEmptyParams(input)).toBeUndefined();
  });

  it("keeps all non-empty values intact", () => {
    const input = { prompt: "login", kc_idp_hint: "digid" };
    expect(filterEmptyParams(input)).toEqual(input);
  });
});
