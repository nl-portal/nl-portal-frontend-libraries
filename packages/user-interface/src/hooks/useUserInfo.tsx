import { useState, useEffect, useContext } from "react";
import {
  useGetPersoonLazyQuery,
  useGetBedrijfLazyQuery,
  useGetGemachtigdeLazyQuery,
} from "@nl-portal/nl-portal-api";
import { KeycloakContext } from "@nl-portal/nl-portal-authentication";
import { getFullName } from "../utils/person-data";

export const useUserInfo = () => {
  const [isPerson, setIsPerson] = useState(true);
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
      const authenticationMethod = decodedToken.middel || "";
      if (authenticationMethods.person?.includes(authenticationMethod)) {
        setIsPerson(true);
        loadPersoon();
      } else if (
        authenticationMethods.company?.includes(authenticationMethod)
      ) {
        setIsPerson(false);
        loadBedrijf();
      }
      if (authenticationMethods.proxy?.includes(authenticationMethod)) {
        setisVolmachtLogin(true);
        loadGemachtigde();
      }
    }
  }, [decodedToken]);

  useEffect(() => {
    const name = getFullName(persoonData?.getPersoon?.naam);
    const authenticationMethod = decodedToken?.middel || "";
    if (authenticationMethods?.proxy?.includes(authenticationMethod)) {
      setVolmachtgever(name);
    } else {
      setUserName(name);
    }
  }, [persoonData, decodedToken?.middel, authenticationMethods?.proxy]);

  useEffect(() => {
    const name = bedrijfData?.getBedrijf?.naam || "";
    const authenticationMethod = decodedToken?.middel || "";
    if (authenticationMethods?.proxy?.includes(authenticationMethod)) {
      setVolmachtgever(name);
    } else {
      setUserName(name);
    }
  }, [bedrijfData, decodedToken?.middel, authenticationMethods?.proxy]);

  useEffect(() => {
    if (gemachtigdeData?.getGemachtigde?.persoon) {
      setUserName(
        getFullName(gemachtigdeData?.getGemachtigde?.persoon.naam) || "",
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
