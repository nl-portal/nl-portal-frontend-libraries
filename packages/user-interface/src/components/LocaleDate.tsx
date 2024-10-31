import { useContext } from "react";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { formatDate, longDateOptions } from "@gemeente-denhaag/utils";

interface Props {
  date: string;
  formatOptions?: Intl.DateTimeFormatOptions;
}

const LocaleDate = ({ date, formatOptions = longDateOptions }: Props) => {
  const { currentLocale } = useContext(LocaleContext);

  return formatDate({
    dateTime: date,
    locale: currentLocale,
    format: formatOptions,
  });
};

export default LocaleDate;
