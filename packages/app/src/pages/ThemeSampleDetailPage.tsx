import {
  DocumentsList,
  ThemeDetailsPage,
  TableList,
  DescriptionList,
} from "@nl-portal/nl-portal-user-interface";

const ThemeSampleDetailPage = () => {
  const slug = "sample";
  const loading = false;

  return (
    <ThemeDetailsPage
      slug={slug}
      loading={loading}
      titleTranslationId="Keukenhoflaan 133"
      links={[
        { title: "Link 1", href: "https://example.com" },
        { title: "Link 2", href: "https://example.com" },
        { title: "Link 3", href: "https://example.com" },
      ]}
    >
      <DocumentsList
        loading={loading}
        error={Boolean(false)}
        titleTranslationId="Facturen"
        documents={[
          {
            uuid: "1",
            bestandsnaam: "Document1",
            bestandsomvang: 5000,
            documentapi: "http://localhost:3000/api/documents/1",
          },
          {
            uuid: "2",
            bestandsnaam: "Document2",
            bestandsomvang: 10000,
            documentapi: "http://localhost:3000/api/documents/2",
          },
        ]}
      />
      <DescriptionList
        loading={loading}
        titleTranslationId="Gegevens contactpersoon"
        items={[
          {
            title: "Naam",
            detail: "John Doe",
          },
          {
            title: "Adres",
            detail: "Keukenhoflaan 133, 2548 PD Den Haag",
          },
          {
            title: "Klantnummer",
            detail: "1056034",
          },
          {
            title: "E-mailadres",
            detail: "b.smilede@gmail.com",
          },
        ]}
      />
      <TableList
        loading={loading}
        titleTranslationId="Financiele gegevens"
        headers={["Soort finanacien", "Bedrag", "Periode", "Factuurwijze"]}
        rows={[
          [
            {
              children: "Canon oude rechten",
            },
            {
              children: "€ 6,32",
            },
            {
              children: "halfjaarlijks",
            },
            {
              children: "Achteraf",
            },
          ],
          [
            {
              children: "Canon oude rechten",
            },
            {
              children: "€ 6,32",
            },
            {
              children: "halfjaarlijks",
            },
            {
              children: "Achteraf",
            },
          ],
        ]}
      />
    </ThemeDetailsPage>
  );
};

export default ThemeSampleDetailPage;
