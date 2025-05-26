import { useContext, useMemo } from "react";
import {
  useGetBedrijfQuery,
  useGetGemachtigdeV2Query,
  useGetPersoonV2Query,
} from "@nl-portal/nl-portal-api";
import { OidcContext } from "@nl-portal/nl-portal-authentication";
import { getFullName } from "../utils/person-data";

export const useUserInfo = () => {
  const { decodedToken, authenticationMethods } = useContext(OidcContext);

  const authenticationMethod = decodedToken?.middel ?? "";
  const isCompany =
    authenticationMethods?.company?.includes(authenticationMethod) ?? false;
  const isPerson = !isCompany; // This also acts like a default, if middel is not inside the token (like in the local dev environment), person is the default.
  const isVolmachtLogin =
    authenticationMethods?.proxy?.includes(authenticationMethod) ?? false;

  const { data: persoonData, loading: persoonLoading } = useGetPersoonV2Query({
    skip: !isPerson || !authenticationMethod,
  });

  const { data: bedrijfData, loading: bedrijfLoading } = useGetBedrijfQuery({
    skip: isPerson || !authenticationMethod,
  });

  const { data: gemachtigdeData, loading: gemachtigdeLoading } =
    useGetGemachtigdeV2Query({
      skip: !isVolmachtLogin || !authenticationMethod,
    });

  const isLoading = persoonLoading || bedrijfLoading || gemachtigdeLoading;

  return useMemo(() => {
    let userName = "";
    let volmachtgever: string | undefined = undefined;

    if (isVolmachtLogin && gemachtigdeData) {
      userName = gemachtigdeData.getGemachtigdeV2.persoon
        ? getFullName(gemachtigdeData.getGemachtigdeV2.persoon.naam)
        : (gemachtigdeData.getGemachtigdeV2.bedrijf?.naam ?? "");

      volmachtgever = isPerson
        ? getFullName(persoonData?.getPersoonV2?.naam)
        : (bedrijfData?.getBedrijf?.naam ?? "");
    } else if (isCompany) {
      userName = bedrijfData?.getBedrijf?.naam ?? "";
    } else {
      userName = getFullName(persoonData?.getPersoonV2?.naam);
    }

    return {
      isPerson,
      isVolmachtLogin,
      userName,
      volmachtgever,
      isLoading,
    } as const;
  }, [
    isPerson,
    isVolmachtLogin,
    persoonData,
    bedrijfData,
    gemachtigdeData,
    isLoading,
  ]);
};

export default useUserInfo;
