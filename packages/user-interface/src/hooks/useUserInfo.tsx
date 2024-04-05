import { useState, useEffect, useContext } from "react";
import {
  useGetPersoonLazyQuery,
  useGetBedrijfLazyQuery,
  useGetGemachtigdeLazyQuery,
} from "@nl-portal/nl-portal-api";
import { KeycloakContext } from "@nl-portal/nl-portal-authentication";
import { getNameString } from "../utils/person-data";

export const useUserInfo = () => {
  const [isPerson, setIsPerson] = useState(false);
  const [isVolmachtLogin, setisVolmachtLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [volmachtgever, setVolmachtgever] = useState("");
  const [loadPersoon, { loading: persoonLoading, data: persoonData }] =
    useGetPersoonLazyQuery();
  const [loadBedrijf, { loading: bedrijfLoading, data: bedrijfData }] =
    useGetBedrijfLazyQuery();
  const [
    loadGemachtigde,
    { loading: gemachtigdeLoading, data: gemachtigdeData },
  ] = useGetGemachtigdeLazyQuery();
  const { decodedToken, authenticationMethods } = useContext(KeycloakContext);
  const isLoading = persoonLoading || bedrijfLoading || gemachtigdeLoading;

  useEffect(() => {
    if (decodedToken && authenticationMethods) {
      if (authenticationMethods.person?.includes(decodedToken.middel)) {
        setIsPerson(true);
        loadPersoon();
      } else if (authenticationMethods.company?.includes(decodedToken.middel)) {
        setIsPerson(false);
        loadBedrijf();
      }
      if (authenticationMethods.proxy?.includes(decodedToken.middel)) {
        setisVolmachtLogin(true);
        loadGemachtigde();
      }
    }
  }, [decodedToken]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const name = getNameString(persoonData?.getPersoon?.naam);
    if (authenticationMethods?.proxy?.includes(decodedToken?.middel)) {
      setVolmachtgever(name);
    } else {
      setUserName(name);
    }
  }, [persoonData, decodedToken?.middel, authenticationMethods?.proxy]);

  useEffect(() => {
    const name = bedrijfData?.getBedrijf?.naam || "";
    if (authenticationMethods?.proxy?.includes(decodedToken?.middel)) {
      setVolmachtgever(name);
    } else {
      setUserName(name);
    }
  }, [bedrijfData, decodedToken?.middel, authenticationMethods?.proxy]);

  useEffect(() => {
    if (gemachtigdeData?.getGemachtigde?.persoon) {
      setUserName(
        getNameString(gemachtigdeData?.getGemachtigde?.persoon) || "",
      );
    } else {
      setUserName(gemachtigdeData?.getGemachtigde?.bedrijf?.naam || "");
    }
  }, [gemachtigdeData]);

  return {
    isPerson,
    isVolmachtLogin,
    userName,
    volmachtgever,
    isLoading,
  };
};

export default useUserInfo;
