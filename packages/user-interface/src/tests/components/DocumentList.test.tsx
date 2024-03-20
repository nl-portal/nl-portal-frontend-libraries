import { describe, it, expect } from "vitest";
<<<<<<<< HEAD:packages/user-interface/src/components/DocumentsList.test.tsx
import DocumentList from "./DocumentsList";
========
import DocumentList from "../../components/DocumentList";
>>>>>>>> master:packages/user-interface/src/tests/components/DocumentList.test.tsx

describe("DocumentList", () => {
  it("is truthy", () => {
    expect(DocumentList).toBeTruthy();
  });
});
