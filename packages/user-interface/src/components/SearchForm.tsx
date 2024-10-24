import FormField from "@gemeente-denhaag/form-field";
import Form from "./Form";
import FormLabel from "@gemeente-denhaag/form-label";
import TextInput from "@gemeente-denhaag/text-input";
import { SearchIcon } from "@gemeente-denhaag/icons";
import Button from "@gemeente-denhaag/button";
import useInput from "../hooks/useInput";
import { FormEvent } from "react";
import styles from "./SearchForm.module.scss";
import { FormattedMessage } from "react-intl";
import { Paragraph } from "@gemeente-denhaag/typography";

interface SearchFormProps {
  translationId: string;
  defaultSearchValue?: string;
  totalElements: number | null;
  searchValidationFn?: (value: string) => boolean;
  onSubmit: (searchValue: string) => void;
}

const SearchForm = ({
  translationId,
  defaultSearchValue = "",
  totalElements,
  onSubmit,
  searchValidationFn = () => true,
}: SearchFormProps) => {
  const {
    value: searchTitleValue,
    handleInputChange: handleSearchTitleChange,
    handleInputBlur: handleSearchTitleBlur,
  } = useInput(defaultSearchValue, searchValidationFn);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const searchInputValue = formData.get("search-input");

    if (typeof searchInputValue === "string") {
      onSubmit(searchInputValue);
    }
  };

  return (
    <Form className={styles["search-form"]} onSubmit={handleFormSubmit}>
      <FormField>
        <FormLabel htmlFor="search-input">
          <FormattedMessage id={`searchForm.${translationId}.searchLabel`} />
        </FormLabel>
        <div className={styles["search-form-input-container"]}>
          <TextInput
            id="search-input"
            name="search-input"
            value={searchTitleValue}
            onChange={handleSearchTitleChange}
            onBlur={handleSearchTitleBlur}
            iconEnd={<SearchIcon />}
          ></TextInput>
          <Button type="submit">
            <FormattedMessage id={`searchForm.${translationId}.searchButton`} />
          </Button>
        </div>
      </FormField>
      {totalElements !== null && (
        <Paragraph className={styles["search-form-total-elements"]}>
          <FormattedMessage
            id={
              totalElements === 1
                ? `searchForm.${translationId}.totalElements.singular`
                : `searchForm.${translationId}.totalElements`
            }
            values={{ total: totalElements }}
          />
        </Paragraph>
      )}
    </Form>
  );
};

export default SearchForm;
