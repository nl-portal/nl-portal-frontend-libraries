import { OidcContext } from "@nl-portal/nl-portal-authentication";
import { createContext, useContext, useEffect, useState } from "react";
import { getFullName } from "../utils/person-data";
import {
  BrpPersoon,
  GetBedrijfQuery,
  GetGemachtigdeV2Query,
  GetPersoonV2Query,
  MaatschappelijkeActiviteit,
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
  persoon?: BrpPersoon | null;
  bedrijf?: MaatschappelijkeActiviteit | null;
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
  const [loadGemachtigde, { loading: gemachtigdeLoading }] =
    useGetGemachtigdeV2LazyQuery();

  const isLoading = persoonLoading || bedrijfLoading || gemachtigdeLoading;

  useEffect(() => {
    const authenticationMethod = decodedToken?.middel || "";

    if (authenticationMethods?.company?.includes(authenticationMethod)) {
      setIsPersoon(false);
      loadBedrijf({
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
        persoon: persoonData?.getPersoonV2 as BrpPersoon | null,
        bedrijf: bedrijfData?.getBedrijf as MaatschappelijkeActiviteit | null,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
