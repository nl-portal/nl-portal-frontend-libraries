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
    </ThemeDetailsPage>
  );
};

export default ThemeSampleDetailPage;
