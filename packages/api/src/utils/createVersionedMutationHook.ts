/* eslint-disable @typescript-eslint/no-explicit-any */
export type VersionConfig<
  Hook extends (...a: any[]) => readonly [any, any],
  UnifiedVars,
  UnifiedData,
> =
  | {
      hook: Hook;
      mapVariables: (v: UnifiedVars) => Parameters<Hook>[0];
      mapResult: (d: any) => UnifiedData;
      execute?: never;
    }
  | {
      hook: Hook;
      execute: (
        mutate: ReturnType<Hook>[0],
        vars: UnifiedVars,
      ) => Promise<{ result: any; data: UnifiedData }>;
      mapVariables?: never;
      mapResult?: (d: any) => UnifiedData;
    };

export function createVersionedMutationHook<
  V1Hook extends (...a: any[]) => readonly [any, any],
  V2Hook extends (...a: any[]) => readonly [any, any],
  UnifiedVars,
  UnifiedData,
>(params: {
  selected: "v1" | "v2";
  v1: VersionConfig<V1Hook, UnifiedVars, UnifiedData>;
  v2: VersionConfig<V2Hook, UnifiedVars, UnifiedData>;
}) {
  function wrap<
    Hook extends (...a: any[]) => readonly [any, any],
    Opts = Parameters<Hook>[0],
  >(config: VersionConfig<Hook, UnifiedVars, UnifiedData>, baseOpts?: Opts) {
    const [mutateFn, result] = config.hook(baseOpts as Opts);

    const mutate: (
      vars: UnifiedVars,
    ) => Promise<{ result: any; data: UnifiedData }> = config.execute
      ? (vars) => config.execute(mutateFn, vars)
      : async (vars) => {
          const result = await mutateFn(config.mapVariables(vars));
          return { result, data: config.mapResult(result.data) };
        };

    const resultWithUnifiedData = {
      ...result,
      data: config.mapResult ? config.mapResult(result.data) : result.data,
    } as typeof result & { data: UnifiedData };

    return [mutate, resultWithUnifiedData];
  }
  type BaseOptions = Parameters<V1Hook>[0] | Parameters<V2Hook>[0] | undefined;

  return function useVersionedMutation(baseOptions?: BaseOptions) {
    return params.selected === "v1"
      ? wrap(params.v1, baseOptions)
      : wrap(params.v2, baseOptions);
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */
