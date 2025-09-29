import {
  useGetBurgerProfielQuery,
  useGetUserDigitaleAdressenQuery,
  DigitaleAdresType,
} from "../generated/Graphql";
import { createVersionedHook } from "../utils/createVersionedHook";

export type UseUserContactQueryResponse = {
  emailadresId?: string;
  emailadres?: string;
  telefoonnummerId?: string;
  telefoonnummer?: string;
  referentie?: string;
  aanmaakkanaal?: string;
};

export const useUserContactQuery = (() => {
  const getSelected = (): "v1" | "v2" =>
    typeof window !== "undefined" && window.OPEN_KLANT_VERSION === "v1"
      ? "v1"
      : "v2";

  return createVersionedHook({
    selected: getSelected(),
    v1: {
      hook: useGetBurgerProfielQuery,
      map: (d) =>
        ({
          emailadres: d?.getBurgerProfiel?.emailadres,
          telefoonnummer: d?.getBurgerProfiel?.telefoonnummer,
          aanmaakkanaal: d?.getBurgerProfiel?.aanmaakkanaal,
        }) as UseUserContactQueryResponse,
    },
    v2: {
      hook: useGetUserDigitaleAdressenQuery,
      map: (d) => {
        const email = d?.getUserDigitaleAdressen?.find(
          (a) => a.type === DigitaleAdresType.Email,
        );
        const phone = d?.getUserDigitaleAdressen?.find(
          (a) => a.type === DigitaleAdresType.Telefoonnummer,
        );
        return {
          emailadresId: email?.uuid,
          emailadres: email?.waarde,
          telefoonnummerId: phone?.uuid,
          telefoonnummer: phone?.waarde,
        } as UseUserContactQueryResponse;
      },
    },
  });
})();
