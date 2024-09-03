import {
  ThemeOverviewPage,
  TableList,
} from "@nl-portal/nl-portal-user-interface";
import { paths } from "../constants/paths";

const ThemeSampleOverviewPage = () => {
  const slug = "sample";
  const productType = "erfpacht";
  const loading = false;
  const contractsLength = 5;
  const contractsTotal = 12;

  return (
    <ThemeOverviewPage slug={slug} productType={productType} loading={loading}>
      <TableList
        loading={loading}
        titleTranslationId={`theme.${slug}.listTitle`}
        readMoreTranslationId={`theme.${slug}.listViewAll`}
        readMoreLink={paths.themeSub(slug, "contracten")}
        totalAmount={
          contractsTotal > contractsLength ? contractsTotal : undefined
        }
        headers={["Adres", "Kadastrale gegevens", "Contractnummer"]}
        rows={[
          [
            {
              children: (
                <>
                  Westerstraat 393
                  <br />
                  Den Haag
                </>
              ),
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
      />
    </ThemeOverviewPage>
  );
};

export default ThemeSampleOverviewPage;
