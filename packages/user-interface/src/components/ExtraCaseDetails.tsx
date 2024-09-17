import { ReactNode } from "react";
import { DescriptionList } from "@gemeente-denhaag/descriptionlist";
import TableList from "./TableList";
import UnorderedList, {
  UnorderedListItem,
} from "@gemeente-denhaag/unorderedlist";
import { formatDate } from "@gemeente-denhaag/utils";
import SectionHeader from "./SectionHeader";
import { FormattedMessage } from "react-intl";

interface Props {
  data: Details[];
}

export interface Extrazaakdetails {
  data: Details[];
  zaak?: string;
}

export interface Table {
  headers: Details[];
  rows: Details[][];
}

export type Waarde = string | boolean | string[] | Details[] | Table;

export type Types = "bold" | "italic" | "date" | "table";

export interface Details {
  key?: string;
  type?: Types;
  waarde: Waarde;
  heading?: string;
  omschrijving?: string;
}

const hasDetailsWaardes = (waarde: Waarde) =>
  Array.isArray(waarde) && waarde.every((item) => typeof item === "object");
const hasStringWaardes = (waarde: Waarde) =>
  Array.isArray(waarde) && waarde.every((item) => typeof item === "string");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isTable = (obj: any): obj is Table => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.headers === "object" &&
    typeof obj.rows === "object"
  );
};

const convertBoolean = (waarde: boolean) => {
  return waarde
    ? "extraCaseDetails.boolean.true"
    : "extraCaseDetails.boolean.false";
};

const convertRichtText = (
  waarde: Waarde,
  type?: Types,
): string | JSX.Element | JSX.Element[] | null => {
  if (hasStringWaardes(waarde)) {
    return waarde.map((item) => {
      return (
        <>
          {convertRichtText(item, type)}
          <br />
        </>
      );
    });
  }

  if (typeof waarde !== "string" && typeof waarde !== "boolean") {
    return null;
  }

  const value = typeof waarde === "boolean" ? convertBoolean(waarde) : waarde;

  switch (type) {
    case "bold":
      return <b>{value}</b>;
    case "italic":
      return <i>{value}</i>;
    case "date":
      return formatDate({ dateTime: value })[0];
    default:
      return value;
  }
};

const getTableSection = (details: Details, table: Table) => {
  return (
    <section>
      <TableList
        key={details.heading}
        titleTranslationId={details.heading}
        headers={table.headers?.map((head) => head.waarde.toString())}
        rows={table.rows.map((row) =>
          row.map((cell) => {
            return {
              children: convertRichtText(cell.waarde, cell.type),
            };
          }),
        )}
      />
    </section>
  );
};

export const ExtraCaseDetails = ({ data }: Props) => {
  if (!data) return null;
  const zaakDetailsContent: ReactNode[] = [];
  data.forEach((detail) => {
    const headingElement = detail.heading ? (
      <SectionHeader title={detail.heading} />
    ) : undefined;
    const waarde = detail.waarde;

    // Waarde type string[]
    if (hasStringWaardes(waarde)) {
      zaakDetailsContent.push(
        <section>
          {headingElement}
          <UnorderedList>
            {waarde.map((item, index) => (
              <UnorderedListItem key={index}>
                {convertRichtText(item, detail.type)}
              </UnorderedListItem>
            ))}
          </UnorderedList>
        </section>,
      );
    }

    // Waarde type Details
    if (hasDetailsWaardes(waarde)) {
      const descriptionListItems = waarde.filter(
        (item) => item.type !== "table",
      );
      const tableItems = waarde.filter((item) => item.type === "table");

      const dlItems = descriptionListItems
        .filter(
          (item) =>
            typeof item.waarde === "string" || typeof item.waarde === "boolean",
        )
        .map((item) => {
          return {
            title: item.key,
            detail: convertRichtText(item.waarde, item.type),
          };
        });

      zaakDetailsContent.push(
        <section>
          {headingElement}
          <DescriptionList items={dlItems} />
        </section>,
      );

      tableItems
        .filter((item) => isTable(item.waarde))
        .forEach((tableDetail) => {
          const table = tableDetail.waarde as Table;
          zaakDetailsContent.push(getTableSection(tableDetail, table));
        });
    }

    // Waarde type Table
    if (isTable(waarde)) {
      zaakDetailsContent.push(getTableSection(detail, waarde));
    }

    // Waarde types string | boolean
    if (typeof waarde === "string" || typeof waarde === "boolean") {
      zaakDetailsContent.push(
        <section>
          {headingElement}
          <DescriptionList
            items={[
              {
                title: detail.key,
                detail:
                  typeof waarde === "string" ? (
                    convertRichtText(waarde, detail.type)
                  ) : (
                    <FormattedMessage id={convertBoolean(waarde)} />
                  ),
              },
            ]}
          />
        </section>,
      );
    }
  });

  return zaakDetailsContent;
};

export default ExtraCaseDetails;
