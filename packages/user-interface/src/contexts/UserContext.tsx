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
  isPerson: boolean;
  isVolmacht: boolean;
  username: string;
  usernameVolmacht: string;
}

const UserContext = createContext<UserContextInterface>(
  {} as UserContextInterface,
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { decodedToken, authenticationMethods } = useContext(OidcContext);
  const [isPerson, setIsPerson] = useState(true);
  const [isVolmacht, setisVolmacht] = useState(false);
  const [username, setUserName] = useState("");
  const [usernameVolmacht, setUsernameVolmacht] = useState("");

  const [loadPersoon, { loading: persoonLoading }] = useGetPersoonV2LazyQuery();
  const [loadBedrijf, { loading: bedrijfLoading }] = useGetBedrijfLazyQuery();
  const [loadGemachtigde, { loading: gemachtigdeLoading }] =
    useGetGemachtigdeV2LazyQuery();

  const isLoading = persoonLoading || bedrijfLoading || gemachtigdeLoading;

  useEffect(() => {
    if (!decodedToken?.middel || !authenticationMethods) return;
    const authenticationMethod = decodedToken.middel;

    if (authenticationMethods.person?.includes(authenticationMethod)) {
      setIsPerson(true);
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
      setIsPerson(false);
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
        isPerson,
        isVolmacht,
        username,
        usernameVolmacht,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
