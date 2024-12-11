import { paths } from "../constants/paths";
import { TableList, ThemeSubPage } from "@nl-portal/nl-portal-user-interface";
import { Paragraph } from "@gemeente-denhaag/typography";
import { Link } from "@gemeente-denhaag/link";
import { ExternalLinkIcon } from "@gemeente-denhaag/icons";

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
      >
        <Paragraph>
          Aanslagen ouder dan 4 jaar kunt u hier niet bekijken. Heeft u hier
          vragen over? Neem dan contact op met{" "}
          <Link icon={<ExternalLinkIcon />}>Belastingzaken</Link>.
        </Paragraph>
      </TableList>
    </ThemeSubPage>
  );
};

export default ThemeSampleListPage;
