import { useCallback } from "react";
import {
  GetObjectContactMomentenQueryVariables,
  GetUserKlantContactenQueryVariables,
  OnderwerpObjectIndentificatorType,
  useGetObjectContactMomentenLazyQuery,
  useGetUserKlantContactenLazyQuery,
} from "../generated/Graphql";
import { createVersionedLazyHook } from "../utils/createVersionedLazyHook";

type Request =
  | GetObjectContactMomentenQueryVariables
  | GetUserKlantContactenQueryVariables;

type Response = {
  tekst: string;
  kanaal: string;
  registratiedatum: string;
};

// Wrapper around useGetObjectContactMomentenLazyQuery, so you can give the parameters for V1 and V2 to the exported useContactMomentsLazyQuery.
const useContactMomentsLazyV1 = () => {
  const [execRaw, res] = useGetObjectContactMomentenLazyQuery();

  const exec = useCallback(
    (options?: { variables: Request } & Parameters<typeof execRaw>[0]) =>
      execRaw({
        ...options,
        variables: { objectUrl: options?.variables.objectUrl ?? "" },
      }),
    [execRaw],
  );

  return [exec, res] as [typeof exec, typeof res];
};

// Wrapper around useGetUserKlantContactenLazyQuery, so you can give the parameters for V1 and V2 to the exported useContactMomentsLazyQuery.
const useContactMomentsLazyV2 = () => {
  const [execRaw, res] = useGetUserKlantContactenLazyQuery();

  const exec = useCallback(
    (options?: { variables: Request } & Parameters<typeof execRaw>[0]) =>
      execRaw({
        ...options,
        variables: {
          identificatorType:
            options?.variables.identificatorType ??
            OnderwerpObjectIndentificatorType.Zaak,
          identificatorId: options?.variables.identificatorId,
        },
      }),
    [execRaw],
  );

  return [exec, res] as [typeof exec, typeof res];
};

export const useContactMomentsLazyQuery = (() => {
  const getSelected = (): "v1" | "v2" =>
    typeof window !== "undefined" && window.OPEN_KLANT_VERSION === "v1"
      ? "v1"
      : "v2";

  return createVersionedLazyHook({
    selected: getSelected(),
    v1: {
      hook: useContactMomentsLazyV1,
      map: (d) =>
        d?.getObjectContactMomenten?.content.map(
          ({ tekst, kanaal, registratiedatum }) => ({
            tekst,
            kanaal,
            registratiedatum,
          }),
        ) as Response[],
    },
    v2: {
      hook: useContactMomentsLazyV2,
      map: (d) =>
        d?.getUserKlantContacten?.map(
          ({ inhoud, kanaal, plaatsgevondenOp }) => ({
            tekst: inhoud,
            kanaal,
            registratiedatum: plaatsgevondenOp,
          }),
        ) as Response[],
    },
  });
})();
