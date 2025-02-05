import FormField from "@gemeente-denhaag/form-field";
import Form from "./Form";
import FormLabel from "@gemeente-denhaag/form-label";
import TextInput from "@gemeente-denhaag/text-input";
import { SearchIcon } from "@gemeente-denhaag/icons";
import Button from "@gemeente-denhaag/button";
import useInput, { Validation } from "../hooks/useInput";
import { FormEvent } from "react";
import styles from "./SearchForm.module.scss";
import { FormattedMessage } from "react-intl";
import { Paragraph } from "@gemeente-denhaag/typography";
import FormFieldErrorMessage from "@gemeente-denhaag/form-field-error-message";

interface SearchFormProps {
  translationId: string;
  defaultSearchValue?: string;
  totalElements: number | null;
  searchValidations?: Validation[];
  onSubmit: (searchValue: string) => void;
}

const SearchForm = ({
  translationId,
  defaultSearchValue = "",
  totalElements,
  onSubmit,
  searchValidations = [{ validationFn: () => true, errorTranslationId: "" }],
}: SearchFormProps) => {
  const {
    value: searchTitleValue,
    handleInputChange: handleSearchTitleChange,
    handleInputBlur: handleSearchTitleBlur,
    hasError,
    errorTranslationId,
  } = useInput(defaultSearchValue, searchValidations);

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
      <FormField invalid={hasError}>
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
            invalid={hasError}
          ></TextInput>
          {hasError && (
            <FormFieldErrorMessage>
              <FormattedMessage id={errorTranslationId} />
            </FormFieldErrorMessage>
          )}
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
