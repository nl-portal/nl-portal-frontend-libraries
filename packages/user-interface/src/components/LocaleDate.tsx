import { useContext } from "react";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { formatDate, longDateOptions } from "@gemeente-denhaag/utils";

interface Props {
  date: string;
  formatOptions?: Intl.DateTimeFormatOptions;
  relative?: boolean;
  namedDays?: boolean;
}

const LocaleDate = ({
  date,
  formatOptions = longDateOptions,
  relative,
  namedDays,
}: Props) => {
  const { currentLocale } = useContext(LocaleContext);

  return formatDate({
    dateTime: date,
    locale: currentLocale,
    format: formatOptions,
    relative,
    namedDays,
  });
};

export default LocaleDate;
