import { DescriptionList } from "@nl-portal/nl-portal-user-interface";
import {
  DocumentsList,
  ThemeDetailsPage,
} from "@nl-portal/nl-portal-user-interface";

const ThemeSampleDetailPage = () => {
  const type = "sample";
  const loading = false;

  return (
    <ThemeDetailsPage
      type={type}
      loading={loading}
      titleTranslationId="Keukenhoflaan 133"
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
        title="Gegevens contactpersoon"
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
    </ThemeDetailsPage>
  );
};

export default ThemeSampleDetailPage;
