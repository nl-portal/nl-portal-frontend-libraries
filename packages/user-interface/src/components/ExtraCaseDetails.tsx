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
  zaak: string; // URI format
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
  key?: string; // Optional key field, based on its appearance in "details"
  type: DetailType.TABLE | DetailType.DESCRIPTION_LIST;
  heading: string;
  description?: string;
  items: Content[] | Table;
  children?: Details[]; // Recursive type for nested details
}

export interface Content {
  key: string;
  content: string;
  type?: ContentTypes.BOLD | ContentTypes.ITALIC | ContentTypes.DATE;
  description?: string;
}

const exampleData = {
  zaak: "http://test.test",
  data: [
    {
      heading: "Kosten",
      type: "keywaardelijst",
      items: [
        {
          key: "Locatie",
          content: "Kamillestraat 27",
          description: "Locatie waar de zaak betrekking op heeft",
        },
        {
          key: "interne ref",
          content: "OVX-4295272/A00/201723693",
          description: "interne verwijzing naar Key2Vergunningen",
        },
      ],
      children: [
        {
          heading: "Kosten nested",
          type: "keywaardelijst",
          description: "Een voorbeeld van nesting",
          items: [
            {
              key: "Locatie",
              content: "Kamillestraat 27",
              description: "Locatie waar de zaak betrekking op heeft",
            },
            {
              key: "interne ref",
              content: "OVX-4295272/A00/201723693",
              description: "interne verwijzing naar Key2Vergunningen",
            },
          ],
        },
        {
          heading: "Betaalgeschiedenis",
          type: "table",
          items: {
            rows: [
              [
                {
                  key: "periode",
                  type: "date",
                  content: "2023-06-01",
                },
                {
                  key: "bedrag",
                  content: "€250",
                },
                {
                  key: "status",
                  content: "Openstaand",
                },
              ],
              [
                {
                  key: "periode",
                  type: "date",
                  content: "2023-05-01",
                },
                {
                  key: "bedrag",
                  content: "€250",
                },
                {
                  key: "status",
                  content: "Openstaand",
                },
              ],
              [
                {
                  key: "periode",
                  type: "date",
                  content: "2023-04-01",
                },
                {
                  key: "bedrag",
                  content: "€250",
                },
                {
                  key: "status",
                  content: "Openstaand",
                },
              ],
              [
                {
                  key: "periode",
                  type: "date",
                  content: "2023-03-01",
                },
                {
                  key: "bedrag",
                  content: "€250",
                },
                {
                  key: "status",
                  content: "Betaald",
                },
              ],
              [
                {
                  key: "periode",
                  content: "",
                  description:
                    "Een voorbeeld van een lege row. Deze omschrijving is niet nodig voor een lege row.",
                },
                {
                  key: "periode",
                  content: "",
                  description:
                    "Een voorbeeld van een lege row. Deze omschrijving is niet nodig voor een lege row.",
                },
                {
                  key: "periode",
                  content: "",
                  description:
                    "Een voorbeeld van een lege row. Deze omschrijving is niet nodig voor een lege row.",
                },
              ],
              [
                {
                  key: "periode",
                  type: "bold",
                  content: "Totaal",
                },
                {
                  key: "bedrag",
                  content: "€1000",
                },
                {
                  key: "status",
                  content: "Betaald",
                },
              ],
            ],
            headers: [
              {
                key: "periode",
                content: "Periode",
                description: "Periode waarover betaald is",
              },
              {
                key: "bedrag",
                content: "Bedrag",
              },
              {
                key: "status",
                content: "Status",
                description: "Is het betaald?",
              },
            ],
          },
        },
      ],
    },
    {
      heading: "Betaalgeschiedenis 2",
      type: "table",
      items: {
        rows: [
          [
            {
              key: "periode",
              type: "date",
              content: "2023-06-01",
            },
            {
              key: "bedrag",
              content: "€250",
            },
            {
              key: "status",
              content: "Openstaand",
            },
          ],
          [
            {
              key: "periode",
              type: "date",
              content: "2023-05-01",
            },
            {
              key: "bedrag",
              content: "€250",
            },
            {
              key: "status",
              content: "Openstaand",
            },
          ],
          [
            {
              key: "periode",
              type: "date",
              content: "2023-04-01",
            },
            {
              key: "bedrag",
              content: "€250",
            },
            {
              key: "status",
              content: "Openstaand",
            },
          ],
          [
            {
              key: "periode",
              type: "date",
              content: "2023-03-01",
            },
            {
              key: "bedrag",
              content: "€250",
            },
            {
              key: "status",
              content: "true",
            },
          ],
          [
            {
              key: "periode",
              content: "",
              description:
                "Een voorbeeld van een lege row. Deze omschrijving is niet nodig voor een lege row.",
            },
          ],
          [
            {
              key: "periode",
              type: "bold",
              content: "Totaal",
            },
            {
              key: "bedrag",
              content: "€1000",
            },
            {
              key: "status",
              content: "Betaald",
            },
          ],
        ],
        headers: [
          {
            key: "periode",
            content: "Periode",
            description: "Periode waarover betaald is",
          },
          {
            key: "bedrag",
            content: "Bedrag",
          },
          {
            key: "status",
            content: "Status",
            description: "Is het betaald?",
          },
        ],
      },
      children: [
        {
          heading: "Kosten nested 2",
          type: "keywaardelijst",
          items: [
            {
              key: "Locatie",
              content: "Kamillestraat 27",
              description: "Locatie waar de zaak betrekking op heeft",
            },
            {
              key: "interne ref",
              content: "OVX-4295272/A00/201723693",
              description: "interne verwijzing naar Key2Vergunningen",
            },
          ],
          children: [
            {
              heading: "Kosten nested 3",
              type: "keywaardelijst",
              items: [
                {
                  key: "Locatie",
                  content: "Kamillestraat 27",
                  description: "Locatie waar de zaak betrekking op heeft",
                },
                {
                  key: "interne ref",
                  content: "OVX-4295272/A00/201723693",
                  description: "interne verwijzing naar Key2Vergunningen",
                },
              ],
              children: [],
            },
          ],
        },
      ],
    },
    {
      heading: "Special waardes",
      type: "keywaardelijst",
      items: [
        {
          key: "Title",
          content: "This is a bold waarde",
          type: "bold",
          description: "A omschrijving for the bold title",
        },
        {
          key: "Title",
          content: "This is an italic waarde",
          type: "italic",
          description: "A omschrijving for the italic text",
        },
        {
          key: "Date",
          content: "2024-09-11",
          type: "date",
          description: "The date of the event",
        },
        {
          key: "Boolean",
          content: "true",
          description: "boolean true waarde",
        },
        {
          key: "Boolean 2",
          content: "true",
          description: "boolean false waarde",
        },
      ],
    },
  ],
} as ExtraZaakDetails;

export const ExtraCaseDetails = ({ data }: Props) => {
  const { formatDate } = useDateFormatter();
  console.log(data);
  //if (!data) return null;
  const zaakDetailsContent: ReactNode[] = [];

  const convertRichtText = (
    value: string,
    type?: ContentTypes,
  ): string | JSX.Element | JSX.Element[] | null => {
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

  const getTableSection = (heading: string, table: Table) => {
    return (
      <section key={`section-${heading}`}>
        <TableList
          key={heading}
          titleTranslationId={heading}
          headers={table.headers.map((head) => head.content)}
          rows={table.rows.map((row) =>
            row.map((cell) => {
              return {
                children: convertRichtText(cell.content, cell.type),
              };
            }),
          )}
        />
      </section>
    );
  };

  const getContentElements = (detail: Details, isChild: boolean) => {
    if (detail.type === DetailType.TABLE) {
      zaakDetailsContent.push(
        getTableSection(detail.heading, detail.items as Table),
      );
    }

    if (detail.type === DetailType.DESCRIPTION_LIST) {
      zaakDetailsContent.push(
        <section key={`section-${detail.heading}`}>
          <SectionHeader title={detail.heading} small={isChild} />
          <DescriptionList
            items={(detail.items as Content[]).map((item) => {
              return {
                title: item.key,
                detail: convertRichtText(item.content, item.type),
              };
            })}
          />
        </section>,
      );

      if (!isChild) {
        detail.children?.forEach((child) => getContentElements(child, true));
      }
    }
  };

  exampleData.data.forEach((detail) => {
    getContentElements(detail, false);
  });

  return zaakDetailsContent;
};

export default ExtraCaseDetails;
