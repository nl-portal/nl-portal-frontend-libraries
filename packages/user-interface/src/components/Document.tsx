import { useContext } from "react";
import prettyBytes from "pretty-bytes";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { Document as PortalDocument } from "@nl-portal/nl-portal-api";
import { File } from "@gemeente-denhaag/file";
import useDownload from "../hooks/useDownload";

interface Props {
  document: PortalDocument;
  downloadLink: string;
}

const Document = ({ document: doc, downloadLink: downloadLink }: Props) => {
  const { onClick } = useDownload(downloadLink, doc.bestandsnaam || undefined);
  const { hrefLang } = useContext(LocaleContext);

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
