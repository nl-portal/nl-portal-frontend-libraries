import PortalLink from "../components/PortalLink";

const urlRegex = /(https?:\/\/[^\s]+)/g;

export const parseLinks = (text: string) => {
  return text.split(urlRegex).map((part, index) => {
    if (urlRegex.test(part)) {
      return (
        <PortalLink href={part} key={index} target="_blank">
          {part}
        </PortalLink>
      );
    }

    return part;
  });
};
