import { OidcContext } from "@nl-portal/nl-portal-authentication";
import { createContext, useContext, useEffect, useState } from "react";
import { getFullName } from "../utils/person-data";
import {
  BrpPersoon,
  GetBedrijfQuery,
  GetGemachtigdeV2Query,
  GetPersoonV2Query,
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
  const [loadGemachtigde, { loading: gemachtigdeLoading }] =
    useLazyQuery(GetGemachtigdeV2Document);
  const { data: contactData, loading: contactLoading } = useQuery(
    GetUserDigitaleAdressenDocument,
  );

  const isLoading =
    persoonLoading || bedrijfLoading || gemachtigdeLoading || contactLoading;

  useEffect(() => {
    const authenticationMethod = decodedToken?.middel || "";

    if (authenticationMethods?.company?.includes(authenticationMethod)) {
      setIsPersoon(false);
      loadBedrijf({
        variables: {},
        onCompleted: (data: GetBedrijfQuery) => {
          const name = data?.getBedrijf?.naam || "";
          if (authenticationMethods?.proxy?.includes(authenticationMethod))
            return setUsernameVolmacht(name);
          setUserName(name);
        },
      });
    } else {
      setIsPersoon(true);
      loadPersoon({
        variables: {},
        onCompleted: (data: GetPersoonV2Query) => {
          const name = getFullName(data?.getPersoonV2?.naam);
          if (authenticationMethods?.proxy?.includes(authenticationMethod))
            return setUsernameVolmacht(name);
          setUserName(name);
        },
      });
    }

    if (authenticationMethods?.proxy?.includes(authenticationMethod)) {
      setisVolmacht(true);
      loadGemachtigde({
        variables: {},
        onCompleted: (data: GetGemachtigdeV2Query) => {
          const name =
            (data?.getGemachtigdeV2?.persoon
              ? getFullName(data?.getGemachtigdeV2?.persoon.naam)
              : data?.getGemachtigdeV2?.bedrijf?.naam) || "";

          if (data?.getGemachtigdeV2?.persoon) return setUserName(name);
          setUserName(name);
        },
      });
    }
  }, [decodedToken]);

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
