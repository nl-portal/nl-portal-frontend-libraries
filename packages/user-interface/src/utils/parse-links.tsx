import Link from "@gemeente-denhaag/link";
import PortalLink from "../components/PortalLink";

const urlRegex = /(https?:\/\/[^\s]+)/g;

// Remove possible trailing . or , from the url
const cleanupUrl = (url: string) => {
  let punctuation = "";

  if (url.endsWith(".") || url.endsWith(",")) {
    punctuation = url.slice(-1);
    url = url.slice(0, -1);
  }

  return { url, punctuation };
};

export const parseLinks = (text: string) => {
  return text.split(urlRegex).map((part, index) => {
    if (urlRegex.test(part)) {
      const { url, punctuation } = cleanupUrl(part);
      return (
        <>
          <Link Link={PortalLink} href={url} key={index} target="_blank">
            {url}
          </Link>
          {punctuation}
        </>
      );
    }

    return part;
  });
};
