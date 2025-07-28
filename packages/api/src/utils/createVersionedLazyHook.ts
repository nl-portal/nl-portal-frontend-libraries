/* eslint-disable @typescript-eslint/no-explicit-any */
export function createVersionedLazyHook<
  V1LazyHook extends (...args: any[]) => [any, any],
  V2LazyHook extends (...args: any[]) => [any, any],
  Unified,
>(params: {
  v1: {
    hook: V1LazyHook;
    map: (d: ReturnType<V1LazyHook>[1]["data"]) => Unified;
  };
  v2: {
    hook: V2LazyHook;
    map: (d: ReturnType<V2LazyHook>[1]["data"]) => Unified;
  };
  selected: "v1" | "v2";
}) {
  type Result<R> = Omit<R, "data"> & { data?: Unified };

  return function useVersionedLazy(
    baseOptions?: Parameters<V1LazyHook>[0],
  ): [ReturnType<V1LazyHook>[0], Result<ReturnType<V1LazyHook>[1]>] {
    const [exec, res] = params[params.selected].hook(baseOptions as any);

    const mappedResult = {
      ...res,
      data: res.data && params[params.selected].map(res.data),
    } as Result<typeof res>;

    return [exec, mappedResult];
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */
