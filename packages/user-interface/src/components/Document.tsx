import { useContext } from "react";
import prettyBytes from "pretty-bytes";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { Document as PortalDocument } from "@nl-portal/nl-portal-api";
import { KeycloakContext } from "@nl-portal/nl-portal-authentication";
import { File } from "@gemeente-denhaag/file";

interface Props {
  document: PortalDocument;
  downloadLink: string;
}

const Document = ({ document: doc, downloadLink: downloadLink }: Props) => {
  const { keycloakToken } = useContext(KeycloakContext);
  const { hrefLang } = useContext(LocaleContext);

  const onClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    const result = await fetch(downloadLink, {
      headers: { Authorization: `Bearer ${keycloakToken}` },
    });
    const blob = await result.blob();
    const href = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = href;
    link.download = doc.bestandsnaam || "";
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
      name={
        doc.bestandsnaam && doc.bestandsnaam?.lastIndexOf(".") >= 0
          ? doc.bestandsnaam?.substring(0, doc.bestandsnaam.lastIndexOf("."))
          : doc.bestandsnaam || ""
      }
      href={doc.bestandsnaam || ""}
      size={prettyBytes(doc.bestandsomvang || 0, { locale: hrefLang })}
      onClick={onClick}
    />
  );
};

export default Document;
