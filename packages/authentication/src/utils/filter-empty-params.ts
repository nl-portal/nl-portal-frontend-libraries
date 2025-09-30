/**
 * Filters out undefined, null, and empty string values from a params object.
 * Safe to pass into oidc-client-ts extraQueryParams.
 */
export function filterEmptyParams(
  params?: Record<string, string>,
): Record<string, string> | undefined {
  if (!params) return undefined;
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null && v !== "",
  );
  return entries.length ? Object.fromEntries(entries) : undefined;
}
