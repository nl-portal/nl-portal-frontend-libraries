import { useState } from "react";
import styles from "./Filter.module.scss";
import { Button } from "@gemeente-denhaag/components-react";
import { TextInput } from "@gemeente-denhaag/text-input";
import { FormattedMessage, useIntl } from "react-intl";
import { ChevronDownIcon, ChevronUpIcon } from "@gemeente-denhaag/icons";

interface Filter {
  label: string;
  values: { label: string; value: string; active: boolean }[];
}

interface Props {
  query?: string;
  filters?: Filter[];
  results?: number;
  queryPlaceholderTranslationKey?: string;
  resultsTranslationKey?: string;
  onChange?: (query: string, filters?: Filter[]) => void;
}

const Filter = ({
  query: queryProp,
  filters: filtersProp,
  results,
  queryPlaceholderTranslationKey = "filter.queryPlaceholder",
  resultsTranslationKey = "filter.results",
  onChange,
}: Props) => {
  const intl = useIntl();
  const [query, setQuery] = useState(queryProp);
  const [showFilters, setShowFilters] = useState(false);
  const [filters] = useState(filtersProp);
  const activeFilters =
    filters?.filter((filter) => filter.values.find((v) => v.active)).length ||
    0;

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    onChange?.(event.target.value, filters);
  };

  console.log(query);

  return (
    <div className={styles["filter"]}>
      <div className={styles["filter__top"]}>
        <TextInput
          placeholder={intl.formatMessage({
            id: queryPlaceholderTranslationKey,
          })}
          onChange={onQueryChange}
        />
        <Button
          icon={showFilters ? <ChevronUpIcon /> : <ChevronDownIcon />}
          variant="secondary-action"
          onClick={() => setShowFilters((show) => !show)}
        >
          <FormattedMessage id={"filter.filterButton"} />
          {activeFilters > 0 && ` (${activeFilters})`}
        </Button>
      </div>
      {showFilters ? (
        <div className={styles["filter__filters"]}>filters</div>
      ) : (
        <div className={styles["filter__results"]}>
          <FormattedMessage id={resultsTranslationKey} values={{ results }} />
        </div>
      )}
    </div>
  );
};

export default Filter;
