import { FC, Fragment, useContext } from "react";
import { LocaleContext } from "@nl-portal/nl-portal-localization";

interface LocaleDateProps {
  date: Date;
  year?: Intl.DateTimeFormatOptions["year"];
  month?: Intl.DateTimeFormatOptions["month"];
  day?: Intl.DateTimeFormatOptions["day"];
}

const LocaleDate: FC<LocaleDateProps> = ({ date, year, month, day }) => {
  const { currentLocale } = useContext(LocaleContext);
  const options: Intl.DateTimeFormatOptions = {
    year: year || "numeric",
    month: month || "long",
    day: day || "numeric",
  };

  return <Fragment>{date.toLocaleDateString(currentLocale, options)}</Fragment>;
};

export { LocaleDate };
