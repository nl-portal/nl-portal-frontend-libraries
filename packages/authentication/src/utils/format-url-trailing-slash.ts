export const formatUrlTrailingSlash = (url: string, returnWithTrailingSlash: boolean): string => {
  const urlLastCharacter = url[url.length - 1];
  const urlLastCharacterIsSlash = urlLastCharacter === '/';

  if (!returnWithTrailingSlash && urlLastCharacterIsSlash) {
    return url.slice(0, -1);
  }
  if (returnWithTrailingSlash && !urlLastCharacterIsSlash) {
    return `${url}/`;
  }

  return url;
};
