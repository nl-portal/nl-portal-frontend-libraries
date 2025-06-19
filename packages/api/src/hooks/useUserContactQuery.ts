import {
  useGetBurgerProfielQuery,
  useGetUserDigitaleAdressenQuery,
  DigitaleAdresType,
  DigitaleAdresResponse,
} from "../generated/Graphql";
import { createVersionedHook } from "../utils/createVersionedHook";

type Response = {
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

  const matchReferentie = (digitaleAdres: DigitaleAdresResponse) =>
    typeof window !== "undefined" &&
    window.OPEN_KLANT_REFERENTIE === digitaleAdres.referentie;

  return createVersionedHook({
    selected: getSelected(),
    v1: {
      hook: useGetBurgerProfielQuery,
      map: (d) =>
        ({
          emailadres: d?.getBurgerProfiel?.emailadres,
          telefoonnummer: d?.getBurgerProfiel?.telefoonnummer,
          aanmaakkanaal: d?.getBurgerProfiel?.aanmaakkanaal,
        }) as Response,
    },
    v2: {
      hook: useGetUserDigitaleAdressenQuery,
      map: (d) => {
        const email = d?.getUserDigitaleAdresen?.find(
          (a) => a.type === DigitaleAdresType.Email && matchReferentie(a),
        );
        const phone = d?.getUserDigitaleAdresen?.find(
          (a) =>
            a.type === DigitaleAdresType.Telefoonnummer && matchReferentie(a),
        );
        return {
          emailadresId: email?.uuid,
          emailadres: email?.waarde,
          telefoonnummerId: phone?.uuid,
          telefoonnummer: phone?.waarde,
        } as Response;
      },
    },
  });
})();
