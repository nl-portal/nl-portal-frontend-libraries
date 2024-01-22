import React from "react";
import { useState } from "react";
import UserInformationContext from "../contexts/UserInformationContext";

interface Props {
  children: React.ReactNode;
}

const UserInformationProvider = ({ children }: Props) => {
  const [userInformation, modifyUserInformation] = useState({});

  const setUserInformation = (
    key: string,
    value: string | false | undefined | null
  ): void => {
    modifyUserInformation({ ...userInformation, [key]: value });
  };

  return (
    <UserInformationContext.Provider
      value={{
        userInformation,
        setUserInformation,
      }}
    >
      {children}
    </UserInformationContext.Provider>
  );
};

export default UserInformationProvider;
