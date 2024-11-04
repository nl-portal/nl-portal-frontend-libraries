import { useContext } from "react";
import LocaleContext from "../contexts/LocaleContext";
import { formatDate as format, longDateOptions } from "@gemeente-denhaag/utils";

interface FormatDateProps {
  date: string;
  formatOptions?: Intl.DateTimeFormatOptions;
  relative?: boolean;
  namedDays?: boolean;
}

const useDateFormatter = () => {
  const { currentLocale } = useContext(LocaleContext);

  const formatDate = ({
    date,
    formatOptions = longDateOptions,
    relative,
    namedDays,
  }: FormatDateProps) => {
    return format({
      dateTime: date,
      locale: currentLocale,
      format: formatOptions,
      relative,
      namedDays,
    })[0];
  };

  return { formatDate };
};

export default useDateFormatter;
