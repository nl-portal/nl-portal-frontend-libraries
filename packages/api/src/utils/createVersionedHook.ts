/* eslint-disable @typescript-eslint/no-explicit-any */
export function createVersionedHook<
  V1QueryHook extends (...args: any[]) => any,
  V2QueryHook extends (...args: any[]) => any,
  Unified,
>(params: {
  v1: {
    hook: V1QueryHook;
    map: (d: ReturnType<V1QueryHook>["data"]) => Unified;
  };
  v2: {
    hook: V2QueryHook;
    map: (d: ReturnType<V2QueryHook>["data"]) => Unified;
  };
  selected: "v1" | "v2";
}) {
  type Result<V extends (...args: any[]) => any> = Omit<
    ReturnType<V>,
    "data"
  > & { data?: Unified };

  return function useVersioned(
    baseOptions: Parameters<V1QueryHook>[0],
  ): Result<V1QueryHook | V2QueryHook> {
    const res = params[params.selected].hook(baseOptions as any);
    return { ...res, data: res.data && params[params.selected].map(res.data) };
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */
