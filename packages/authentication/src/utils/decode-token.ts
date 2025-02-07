import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../interfaces/decoded-token";

export const decodeToken = (jwtToken: string) => jwtDecode<DecodedToken>(jwtToken);
