import React, { useEffect } from "react";
import { useAuth } from "react-oidc-context";

const SilentRedirect = () => {
  const auth = useAuth();
  console.log("SilentRedirect");


  

  return <div>Renewing token…</div>;
};

export default SilentRedirect;
