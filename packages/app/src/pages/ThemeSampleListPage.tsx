import { paths } from "../constants/paths";
import { TableList, ThemeSubPage } from "@nl-portal/nl-portal-user-interface";

const ThemeSampleListPage = () => {
  const slug = "sample";

  return (
    <ThemeSubPage slug={slug} titleTranslationId="Voorbeeldcontracten">
      <TableList
        titleTranslationId={null}
        headers={["Adres", "Kadastrale gegevens", "Contractnummer"]}
        rows={[
          [
            {
              children: "Westerstraat 393 Den Haag",
              href: paths.themeDetails("sample", "123"),
            },
            {
              children: "‘s-Gravenhage AF 2679",
              href: paths.themeDetails("sample", "123"),
            },
            {
              children: "78435785",
              href: paths.themeDetails("sample", "123"),
            },
          ],
          [
            {
              children: "Westerstraat 393 Den Haag",
              href: paths.themeDetails("sample", "123"),
            },
            {
              children: "‘s-Gravenhage AF 2679",
              href: paths.themeDetails("sample", "123"),
            },
            {
              children: "78435785",
              href: paths.themeDetails("sample", "123"),
            },
          ],
          [
            {
              children: "Westerstraat 393 Den Haag",
              href: paths.themeDetails("sample", "123"),
            },
            {
              children: "‘s-Gravenhage AF 2679",
              href: paths.themeDetails("sample", "123"),
            },
            {
              children: "78435785",
              href: paths.themeDetails("sample", "123"),
            },
          ],
        ]}
        indexLimit={2}
      />
    </ThemeSubPage>
  );
};

export default ThemeSampleListPage;
