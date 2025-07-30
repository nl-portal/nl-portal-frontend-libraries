import { OidcContext } from "@nl-portal/nl-portal-authentication";
import { createContext, useContext, useEffect, useState } from "react";
import { getFullName } from "../utils/person-data";
import {
  GetBedrijfQuery,
  GetGemachtigdeV2Query,
  GetPersoonV2Query,
  useGetBedrijfLazyQuery,
  useGetGemachtigdeV2LazyQuery,
  useGetPersoonV2LazyQuery,
} from "@nl-portal/nl-portal-api";

export interface UserContextInterface {
  isLoading: boolean;
  isPersoon: boolean;
  isVolmacht: boolean;
  username: string;
  usernameVolmacht: string;
  persoon: GetPersoonV2Query["getPersoonV2"];
  bedrijf: GetBedrijfQuery["getBedrijf"];
  volmacht?: GetGemachtigdeV2Query["getGemachtigdeV2"];
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
    useGetPersoonV2LazyQuery();
  const [loadBedrijf, { loading: bedrijfLoading, data: bedrijfData }] =
    useGetBedrijfLazyQuery();
  const [loadGemachtigde, { loading: gemachtigdeLoading, data: volmachtData }] =
    useGetGemachtigdeV2LazyQuery();

  const isLoading = persoonLoading || bedrijfLoading || gemachtigdeLoading;

  useEffect(() => {
    if (!decodedToken?.middel || !authenticationMethods) return;
    const authenticationMethod = decodedToken.middel;

    if (authenticationMethods.person?.includes(authenticationMethod)) {
      setIsPersoon(true);
      loadPersoon({
        onCompleted: (data: GetPersoonV2Query) => {
          const name = getFullName(data?.getPersoonV2?.naam);
          if (authenticationMethods?.proxy?.includes(authenticationMethod))
            return setUsernameVolmacht(name);
          setUserName(name);
        },
      });
    }

    if (authenticationMethods.company?.includes(authenticationMethod)) {
      setIsPersoon(false);
      loadBedrijf({
        onCompleted: (data: GetBedrijfQuery) => {
          const name = data?.getBedrijf?.naam || "";
          if (authenticationMethods?.proxy?.includes(authenticationMethod))
            return setUsernameVolmacht(name);
          setUserName(name);
        },
      });
    }

    if (authenticationMethods.proxy?.includes(authenticationMethod)) {
      setisVolmacht(true);
      loadGemachtigde({
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
        persoon: persoonData?.getPersoonV2,
        bedrijf: bedrijfData?.getBedrijf,
        volmacht: volmachtData?.getGemachtigdeV2,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
