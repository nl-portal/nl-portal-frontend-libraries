export const REGEX_PATTERNS: { [key: string]: RegExp } = {
  emailadres:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  telefoonnummer: /^(0[1-9][0-9]{8}|\+[0-9]{9,15}|00[0-9]{7,13})$/,
  telefoonnummerInvalidChars: /^[0-9+]+$/,
};
