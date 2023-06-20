import {useState, useEffect, useContext} from 'react';
import {
  useGetPersoonLazyQuery,
  useGetBedrijfLazyQuery,
  useGetGemachtigdeLazyQuery,
} from '@nl-portal/nl-portal-api';
import {getNameString} from './person-data';
import {KeycloakContext} from '@nl-portal/nl-portal-authentication';

export const useUserInfo = () => {
  const [isPerson, setIsPerson] = useState(false);
  const [isVolmachtLogin, setisVolmachtLogin] = useState(false);
  const [userName, setUserName] = useState('');
  const [volmachtgever, setVolmachtgever] = useState('');
  const [loadPersoon, {loading: persoonLoading, data: persoonData}] = useGetPersoonLazyQuery();
  const [loadBedrijf, {loading: bedrijfLoading, data: bedrijfData}] = useGetBedrijfLazyQuery();
  const [loadGemachtigde, {loading: gemachtigdeLoading, data: gemachtigdeData}] =
    useGetGemachtigdeLazyQuery();
  const {decodedToken} = useContext(KeycloakContext);
  const isLoading = persoonLoading || bedrijfLoading || gemachtigdeLoading;

  useEffect(() => {
    if (decodedToken) {
      if (decodedToken.aanvrager?.bsn) {
        setIsPerson(true);
        loadPersoon();
      } else if (decodedToken.aanvrager?.kvk) {
        setIsPerson(false);
        loadBedrijf();
      }
      if (decodedToken.gemachtigde) {
        setisVolmachtLogin(true);
        loadGemachtigde();
      }
    }
  }, [decodedToken]);

  useEffect(() => {
    const name = getNameString(persoonData?.getPersoon?.naam);
    if (decodedToken?.gemachtigde) {
      setVolmachtgever(name);
    } else {
      setUserName(name);
    }
  }, [persoonData]);

  useEffect(() => {
    const name = bedrijfData?.getBedrijf?.naam || '';
    if (decodedToken?.gemachtigde) {
      setVolmachtgever(name);
    } else {
      setUserName(name);
    }
  }, [bedrijfData]);

  useEffect(() => {
    if (gemachtigdeData?.getGemachtigde?.persoon) {
      setUserName(getNameString(gemachtigdeData?.getGemachtigde?.persoon) || '');
    } else {
      setUserName(gemachtigdeData?.getGemachtigde?.bedrijf?.naam || '');
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
