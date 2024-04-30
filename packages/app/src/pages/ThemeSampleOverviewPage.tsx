import {
  ThemeOverviewPage,
  TableList,
} from "@nl-portal/nl-portal-user-interface";
import { paths } from "../constants/paths";

const ThemeSampleOverviewPage = () => {
  const type = "sample";
  const loading = false;
  const contractsLength = 5;
  const contractsTotal = 12;

  return (
    <ThemeOverviewPage type={type} loading={loading}>
      <TableList
        loading={loading}
        titleTranslationId={`theme.${type}.listTitle`}
        readMoreTranslationId={`theme.${type}.listViewAll`}
        readMoreLink={paths.themeSub(type)}
        totalAmount={
          contractsTotal > contractsLength ? contractsTotal : undefined
        }
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
      />
    </ThemeOverviewPage>
  );
};

export default ThemeSampleOverviewPage;
