import { filterEmptyParams } from "../../utils/filter-empty-params.ts";
import generateRedirectUri from "../../utils/generate-redirect-uri.ts";

describe("additional parameters in Keycloak redirect URL", () => {
  it("appends non-empty hint parameters correctly", () => {
    const baseUri = "https://example.com/callback";

    const additionalParams = {
      login_hint: "digid", // hint for b.v.t Keycloak to redirect to DigiD login
      prompt: "", // should be filtered out
      theme: "dark-mode", // optional param
    };

    const params = filterEmptyParams(additionalParams);

    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString
      ? `${generateRedirectUri(baseUri, true)}?${queryString}`
      : generateRedirectUri(baseUri, true);

    console.log("Generated redirect URL:", fullUrl);

    expect(fullUrl).toContain("login_hint=digid");
    expect(fullUrl).toContain("theme=dark-mode");
    expect(fullUrl).not.toContain("prompt=");

    expect(fullUrl).toBe(
      "https://example.com/callback?login_hint=digid&theme=dark-mode",
    );
  });
});
