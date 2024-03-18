import { useContext } from "react";
import prettyBytes from "pretty-bytes";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { PortalDocument } from "../interfaces/portal-document";
import { ApiContext } from "@nl-portal/nl-portal-api";
import { KeycloakContext } from "@nl-portal/nl-portal-authentication";
import { File } from "@gemeente-denhaag/file";

interface Props extends PortalDocument {}

const Document = ({ uuid, name, extension, size, documentapi }: Props) => {
  const { keycloakToken } = useContext(KeycloakContext);
  const { restUri } = useContext(ApiContext);
  const { hrefLang } = useContext(LocaleContext);
  const downloadLink = `${restUri}/documentapi/${documentapi}/document/${uuid}/content`;

  const onClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    const result = await fetch(downloadLink, {
      headers: { Authorization: `Bearer ${keycloakToken}` },
    });
    const blob = await result.blob();
    const href = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = href;
    link.download = `${name}`;
    document.body.appendChild(link);
    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      }),
    );
    link.remove();
    window.URL.revokeObjectURL(link.href);
  };

  return (
    <File
      name={name}
      href={`${name}.${extension}`}
      size={prettyBytes(size || 0, { locale: hrefLang })}
      onClick={onClick}
    />
  );
};

export default Document;
