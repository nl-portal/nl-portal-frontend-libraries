import {
  useUpdateBurgerProfielMutation,
  useUpdateUserDigitaleAdresMutation,
  DigitaleAdresType,
  UpdateBurgerProfielMutation,
} from "../generated/Graphql";
import { createVersionedMutationHook } from "../utils/createVersionedMutationHook";

type Contact = {
  emailadresId?: string | null;
  emailadres?: string | null;
  telefoonnummerId?: string | null;
  telefoonnummer?: string | null;
};

// TODO: Mapping wordt ingewikkeld doordat in v1 1 request is voor alle contact items, en in v2 per contact item een update gedaan moet worden.
// Situatie zonder digitale adres moet nog gemaakt worden.
export const useUserContactMutation = (() => {
  const getSelected = (): "v1" | "v2" =>
    typeof window !== "undefined" && window.OPEN_KLANT_VERSION === "v1"
      ? "v1"
      : "v2";

  return createVersionedMutationHook({
    selected: getSelected(),
    v1: {
      hook: useUpdateBurgerProfielMutation,
      mapVariables: (v: Contact) => ({
        variables: { klant: v },
      }),
      mapResult: (d: UpdateBurgerProfielMutation | undefined): Contact => ({
        emailadres: d?.updateBurgerProfiel?.emailadres ?? null,
        telefoonnummer: d?.updateBurgerProfiel?.telefoonnummer ?? null,
      }),
    },
    v2: {
      hook: useUpdateUserDigitaleAdresMutation,
      mapResult: (d): Contact => ({
        emailadres:
          d?.updateUserDigitaleAdres?.type === DigitaleAdresType.Email
            ? d.updateUserDigitaleAdres.waarde
            : undefined,
        telefoonnummer:
          d?.updateUserDigitaleAdres?.type === DigitaleAdresType.Telefoonnummer
            ? d.updateUserDigitaleAdres.waarde
            : undefined,
      }),
      async execute(mutate, v: Contact) {
        const calls = [];

        if (v.emailadres) {
          calls.push(
            mutate({
              variables: {
                digitaleAdresRequest: {
                  uuid: v.emailadresId,
                  waarde: v.emailadres,
                  type: DigitaleAdresType.Email,
                  omschrijving: "email",
                },
              },
            }),
          );
        }

        if (v.telefoonnummer) {
          calls.push(
            mutate({
              variables: {
                digitaleAdresRequest: {
                  uuid: v.telefoonnummerId,
                  waarde: v.telefoonnummer,
                  type: DigitaleAdresType.Telefoonnummer,
                  omschrijving: "tel",
                },
              },
            }),
          );
        }

        const [emailRes, phoneRes] = await Promise.all(calls);

        return {
          result: { emailRes, phoneRes },
          data: {
            emailadres:
              emailRes?.data?.updateUserDigitaleAdres?.waarde ?? undefined,
            telefoonnummer:
              phoneRes?.data?.updateUserDigitaleAdres?.waarde ?? undefined,
          } as Contact,
        };
      },
    },
  });
})();
