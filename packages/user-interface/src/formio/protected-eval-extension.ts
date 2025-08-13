/* eslint-disable @typescript-eslint/no-explicit-any */
import FormioUtils from "@formio/js/utils";
import BaseProtectedEval from "@formio/protected-eval";

FormioUtils.Evaluator.noeval = true;
FormioUtils.Evaluator.protectedEval = true;

const baseEvalObj: any = FormioUtils.Evaluator || {};
const baseInterpolate = baseEvalObj.interpolate?.bind(baseEvalObj);
const baseTemplate = baseEvalObj.template?.bind(baseEvalObj);

export interface IEvaluator {
  noeval?: boolean;
  protectedEval?: boolean;
  evaluator: (func: string | any, ...params: any[]) => (...a: any[]) => any;
  evaluate: (func: string | any, args: any, ...rest: any[]) => any;
  interpolate: (tpl: any, data: any, ctx?: any) => string;
  interpolateString?: (tpl: any, data: any, ctx?: any) => string;
  template?: (tpl: any, data: any, ctx?: any) => string;
}

// Minimal, CSP-safe interpolation: replaces {{ a.b }} and ${a.b} via dot-path lookup with value from the passed data object (no eval).
function safeInterpolate(tpl: any, data: any = {}): string {
  const prototypeKeys = new Set(["__proto__", "constructor", "prototype"]);
  const s = String(tpl ?? "");
  return s.replace(/\{\{\s*([^}]+?)\s*\}\}|\$\{([^}]+?)\}/g, (_m, a, b) => {
    const path = (a ?? b)?.trim();
    if (!path) return "";
    const value = path
      .split(".")
      .reduce(
        (o: any, k: string) => (prototypeKeys.has(k) ? undefined : o?.[k]),
        data,
      );
    return String(value ?? "");
  });
}

const Evaluator: IEvaluator = {
  noeval: BaseProtectedEval.evaluator.noeval,
  protectedEval: BaseProtectedEval.evaluator.protectedEval,

  evaluator: BaseProtectedEval.evaluator.evaluator,
  evaluate: BaseProtectedEval.evaluator.evaluate,
  interpolate: (tpl: any, data: any): string => {
    if (!Evaluator.protectedEval && typeof baseInterpolate === "function") {
      return String(baseInterpolate(tpl, data));
    }
    return safeInterpolate(tpl, data);
  },

  interpolateString: (tpl: any, data: any, ctx?: any): string => {
    return Evaluator.interpolate(tpl, data, ctx);
  },

  // Replace lodash.template/new Function with CSP-safe template().
  template: (tpl: any, data: any, ctx?: any): string => {
    if (!Evaluator.protectedEval && typeof baseTemplate === "function") {
      return String(baseTemplate(tpl, data));
    }
    const out =
      Evaluator.interpolateString?.(tpl, data, ctx) ??
      Evaluator.interpolate(tpl, data, ctx);
    return out == null ? "" : String(out);
  },
};

export default {
  evaluator: Evaluator,
};
/* eslint-enable @typescript-eslint/no-explicit-any */
