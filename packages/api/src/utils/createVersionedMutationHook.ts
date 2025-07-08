/* eslint-disable @typescript-eslint/no-explicit-any */

// Om normale GraphQL queries die 1 op 1 te vervangen zijn backwards compatible te maken, is de variant met hook, variables en result voldoende.
//
// Om ingewikkeldere queries die niet 1 op 1 te vervangen te zijn backwards compatible te houden, is de variant met de hook, execute en result.
// In de execute kun je bijvoorbeeld meerdere calls in v1 vervangen door 1 call in de v2, of andersom.

export type VersionConfig<
  Hook extends (...a: any[]) => readonly [any, any],
  UnifiedVars,
  UnifiedData,
> =
  | {
      hook: Hook;
      mapVariables: (v: UnifiedVars) => Parameters<Hook>[0];
      mapResult: (d: any) => UnifiedData;
      mutationOptions?: (v: UnifiedVars) => Parameters<Hook>[0];
      execute?: never;
    }
  | {
      hook: Hook;
      execute: (
        mutate: ReturnType<Hook>[0],
        vars: UnifiedVars,
      ) => Promise<{ result: any; data: UnifiedData }>;
      mapResult?: (d: any) => UnifiedData;
      mutationOptions?: never;
      mapVariables?: never;
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

    const mutate = async (
      vars: UnifiedVars,
    ): Promise<{ result: any; data: UnifiedData }> => {
      if (config.execute) return config.execute(mutateFn, vars);
      const base = config.mapVariables(vars);
      const extra = config.mutationOptions ? config.mutationOptions(vars) : {};
      const result = await mutateFn({ ...base, ...extra } as any);

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
