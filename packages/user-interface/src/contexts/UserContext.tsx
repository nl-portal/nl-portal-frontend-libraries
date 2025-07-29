import { OidcContext } from "@nl-portal/nl-portal-authentication";
import { createContext, useContext, useEffect, useState } from "react";
import { getFullName } from "../utils/person-data";
import {
  GetBedrijfQuery,
  GetGemachtigdeQuery,
  GetPersoonQuery,
  useGetBedrijfLazyQuery,
  useGetGemachtigdeLazyQuery,
  useGetPersoonLazyQuery,
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

  const [loadPersoon, { loading: persoonLoading }] = useGetPersoonLazyQuery();
  const [loadBedrijf, { loading: bedrijfLoading }] = useGetBedrijfLazyQuery();
  const [loadGemachtigde, { loading: gemachtigdeLoading }] =
    useGetGemachtigdeLazyQuery();

  const isLoading = persoonLoading || bedrijfLoading || gemachtigdeLoading;

  useEffect(() => {
    if (!decodedToken?.middel || !authenticationMethods) return;
    const authenticationMethod = decodedToken.middel;

    if (authenticationMethods.person?.includes(authenticationMethod)) {
      setIsPerson(true);
      loadPersoon({
        onCompleted: (data: GetPersoonQuery) => {
          const name = getFullName(data?.getPersoon?.naam);
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
        onCompleted: (data: GetGemachtigdeQuery) => {
          const name =
            (data?.getGemachtigde?.persoon
              ? getFullName(data?.getGemachtigde?.persoon.naam)
              : data?.getGemachtigde?.bedrijf?.naam) || "";

          if (data?.getGemachtigde?.persoon) return setUserName(name);
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
