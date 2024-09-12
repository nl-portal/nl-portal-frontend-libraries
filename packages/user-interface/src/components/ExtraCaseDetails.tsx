import { ReactNode } from "react";
import { DescriptionList } from "@gemeente-denhaag/descriptionlist";
import TableList from "./TableList";
import UnorderedList, {
  UnorderedListItem,
} from "@gemeente-denhaag/unorderedlist";
import SectionHeader from "./SectionHeader";
import { FormattedMessage } from "react-intl";
import { CellObject } from "./Table";

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

export interface Details {
  key?: string;
  type?: "bold" | "italic" | "date" | "table";
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

const parseDetails = (details: Details[]) => {
  const zaakDetailsContent: ReactNode[] = [];

  details.forEach((detail) => {
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
              <UnorderedListItem key={index}>{item}</UnorderedListItem>
            ))}
          </UnorderedList>
        </section>,
      );
    }

    // Waarde type Details (and Table)
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
          return { title: item.key, detail: item.waarde as string };
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
          zaakDetailsContent.push(
            <section>
              <TableList
                key={tableDetail.heading}
                titleTranslationId={tableDetail.heading}
                headers={table.headers?.map((head) => head.waarde.toString())}
                rows={table.rows.map((row) =>
                  row.map((cell) => cell.waarde as CellObject),
                )}
              />
            </section>,
          );
        });
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
                    waarde
                  ) : (
                    <FormattedMessage
                      id={
                        waarde
                          ? "extraCaseDetails.boolean.true"
                          : "extraCaseDetails.boolean.false"
                      }
                    />
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

export const ExtraCaseDetails = ({ data }: Props) => {
  return parseDetails(data);
};

export default ExtraCaseDetails;
