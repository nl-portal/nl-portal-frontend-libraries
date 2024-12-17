import { ReactNode } from "react";
import { DescriptionList } from "@gemeente-denhaag/descriptionlist";
import TableList from "./TableList";
import SectionHeader from "./SectionHeader";
import { useDateFormatter } from "@nl-portal/nl-portal-localization";

interface Props {
  data: Details[];
}

export interface ExtraZaakDetails {
  data: Details[];
  zaak: string;
}

export interface Table {
  headers: Content[];
  rows: Content[][];
}

export enum ContentTypes {
  BOLD = "bold",
  ITALIC = "italic",
  DATE = "date",
}

export enum DetailType {
  TABLE = "table",
  DESCRIPTION_LIST = "keywaardelijst",
}

export interface Details {
  key?: string;
  type: DetailType.TABLE | DetailType.DESCRIPTION_LIST;
  heading: string;
  description?: string;
  items: Content[] | Table;
  children?: Details[];
}

export interface Content {
  key: string;
  content: string;
  type?: ContentTypes.BOLD | ContentTypes.ITALIC | ContentTypes.DATE;
  description?: string;
}

export const ExtraCaseDetails = ({ data }: Props) => {
  const { formatDate } = useDateFormatter();
  if (!data) return null;

  const convertRichText = (
    value: string,
    type?: ContentTypes,
  ): string | ReactNode | ReactNode[] | null => {
    switch (type) {
      case ContentTypes.BOLD:
        return <b>{value}</b>;
      case ContentTypes.ITALIC:
        return <i>{value}</i>;
      case ContentTypes.DATE:
        return formatDate({ date: value });
      default:
        return value;
    }
  };

  const renderTableSection = (heading: string, table: Table) => (
    <section key={`section-${heading}`}>
      <TableList
        titleTranslationId={heading}
        headers={table.headers.map((head) => head.content)}
        rows={table.rows.map((row) =>
          row.map((cell) => ({
            children: convertRichText(cell.content, cell.type),
          })),
        )}
      />
    </section>
  );

  const renderDescriptionList = (
    heading: string,
    items: Content[],
    isChild: boolean,
  ) => (
    <section key={`section-${heading}`}>
      <SectionHeader title={heading} small={isChild} />
      <DescriptionList
        items={items.map((item) => ({
          title: item.key,
          detail: convertRichText(item.content, item.type),
        }))}
      />
    </section>
  );

  const renderDetails = (details: Details[], isChild = false): ReactNode[] =>
    details.map((detail) => {
      const { type, heading, items, children } = detail;

      switch (type) {
        case DetailType.TABLE:
          return (
            <>
              {renderTableSection(heading, items as Table)}
              {children && children.length > 0 && renderDetails(children, true)}
            </>
          );

        case DetailType.DESCRIPTION_LIST:
          return (
            <>
              {renderDescriptionList(heading, items as Content[], isChild)}
              {children && children.length > 0 && renderDetails(children, true)}
            </>
          );

        default:
          return null;
      }
    });

  return renderDetails(data);
};

export default ExtraCaseDetails;
