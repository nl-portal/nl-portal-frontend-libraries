import { useContext } from "react";
import LocaleContext from "../contexts/LocaleContext";
import {
  formatDate as format,
  FormatDateLabels,
  longDateOptions,
} from "@gemeente-denhaag/utils";
import useActionLabels from "./useActionLabels";

interface FormatDateProps {
  date: string;
  formatOptions?: Intl.DateTimeFormatOptions;
  relative?: boolean;
  namedDays?: boolean;
  labels?: FormatDateLabels;
}

const useDateFormatter = () => {
  const { currentLocale } = useContext(LocaleContext);
  const defaultLabels = useActionLabels();

  const formatDate = ({
    date,
    formatOptions = longDateOptions,
    relative,
    namedDays,
    labels = defaultLabels,
  }: FormatDateProps) => {
    return format({
      dateTime: date,
      locale: currentLocale,
      format: formatOptions,
      relative,
      namedDays,
      labels,
    })[0];
  };

  return { formatDate };
};

export default useDateFormatter;
