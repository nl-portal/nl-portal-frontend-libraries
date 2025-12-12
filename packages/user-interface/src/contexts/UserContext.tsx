import { OidcContext } from "@nl-portal/nl-portal-authentication";
import { createContext, useContext, useEffect, useState } from "react";
import { getFullName } from "../utils/person-data";
import {
  BrpPersoon,
  GetUserDigitaleAdressenQuery,
  MaatschappelijkeActiviteit,
  GetBedrijfDocument,
  GetGemachtigdeV2Document,
  GetPersoonV2Document,
  GetUserDigitaleAdressenDocument,
  useLazyQuery,
  useQuery,
} from "@nl-portal/nl-portal-api";

export interface UserContextInterface {
  isLoading: boolean;
  isPersoon: boolean;
  isVolmacht: boolean;
  username: string;
  usernameVolmacht: string;
  persoon?: BrpPersoon;
  bedrijf?: MaatschappelijkeActiviteit;
  contact?: GetUserDigitaleAdressenQuery;
}

const UserContext = createContext<UserContextInterface>(
  {} as UserContextInterface,
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { decodedToken, authenticationMethods } = useContext(OidcContext);
  const [isPersoon, setIsPersoon] = useState(true);
  const [isVolmacht, setisVolmacht] = useState(false);
  const [username, setUserName] = useState("");
  const [usernameVolmacht, setUsernameVolmacht] = useState("");

  const [loadPersoon, { loading: persoonLoading, data: persoonData }] =
    useLazyQuery(GetPersoonV2Document);
  const [loadBedrijf, { loading: bedrijfLoading, data: bedrijfData }] =
    useLazyQuery(GetBedrijfDocument);
  const [
    loadGemachtigde,
    { loading: gemachtigdeLoading, data: gemachtigdeData },
  ] = useLazyQuery(GetGemachtigdeV2Document);
  const { data: contactData, loading: contactLoading } = useQuery(
    GetUserDigitaleAdressenDocument,
  );

  const isLoading =
    persoonLoading || bedrijfLoading || gemachtigdeLoading || contactLoading;

  useEffect(() => {
    const authenticationMethod = decodedToken?.middel || "";

    if (!authenticationMethod) return;

    const isCompany =
      authenticationMethods?.company?.includes(authenticationMethod);
    const isProxy =
      authenticationMethods?.proxy?.includes(authenticationMethod);

    if (isCompany) {
      setIsPersoon(false);
      loadBedrijf({ variables: {} });
    } else {
      setIsPersoon(true);
      loadPersoon({ variables: {} });
    }

    if (isProxy) {
      setisVolmacht(true);
      loadGemachtigde({ variables: {} });
    } else {
      setisVolmacht(false);
    }
  }, [
    decodedToken,
    authenticationMethods,
    loadPersoon,
    loadBedrijf,
    loadGemachtigde,
  ]);

  useEffect(() => {
    if (!bedrijfData?.getBedrijf) return;

    const authenticationMethod = decodedToken?.middel || "";
    const isProxy =
      authenticationMethods?.proxy?.includes(authenticationMethod);

    const name = bedrijfData.getBedrijf.naam || "";

    if (isProxy) {
      setUsernameVolmacht(name);
    } else {
      setUserName(name);
    }
  }, [bedrijfData, decodedToken, authenticationMethods]);

  useEffect(() => {
    if (!persoonData?.getPersoonV2) return;

    const authenticationMethod = decodedToken?.middel || "";
    const isProxy =
      authenticationMethods?.proxy?.includes(authenticationMethod);

    const name = getFullName(persoonData.getPersoonV2.naam);

    if (isProxy) {
      setUsernameVolmacht(name);
    } else {
      setUserName(name);
    }
  }, [persoonData, decodedToken, authenticationMethods]);

  useEffect(() => {
    if (!gemachtigdeData?.getGemachtigdeV2) return;
    const gemachtigde = gemachtigdeData.getGemachtigdeV2;
    const name =
      (gemachtigde.persoon
        ? getFullName(gemachtigde.persoon.naam)
        : gemachtigde.bedrijf?.naam) || "";
    setUserName(name);
  }, [gemachtigdeData]);

  return (
    <UserContext.Provider
      value={{
        isLoading,
        isPersoon,
        isVolmacht,
        username,
        usernameVolmacht,
        persoon: persoonData?.getPersoonV2 as BrpPersoon | undefined,
        bedrijf: bedrijfData?.getBedrijf as
          | MaatschappelijkeActiviteit
          | undefined,
        contact: contactData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
