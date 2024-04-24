import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import { FormattedMessage } from "react-intl";
import { Link } from "@gemeente-denhaag/link";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { Heading3 } from "@gemeente-denhaag/components-react";
import { useGetFormsQuery } from "@nl-portal/nl-portal-api";

const FormsPage = () => {
  const { data, loading, error } = useGetFormsQuery();

  if (loading) {
    return null;
  }

  return (
    <PageGrid>
      <PageHeader title={<FormattedMessage id="pageTitles.forms" />}>
        {error && data?.allStartForms && !data?.allStartForms.length && (
          <span data-testid={"empty-forms"}>
            <FormattedMessage id="formsList.empty" />
          </span>
        )}
      </PageHeader>
      {!error && data?.allStartForms && data?.allStartForms.length > 0 && (
        <section data-testid={"list-forms"}>
          <Heading3>
            <FormattedMessage id={`forms.listSubHeader`} />
          </Heading3>
          <ul className="utrecht-link-list utrecht-link-list--html-ul denhaag-link-group__list">
            {data?.allStartForms.map((form) => {
              return (
                <li
                  className="denhaag-link-group__list-item"
                  key={`${form.name}`}
                >
                  <Link
                    href={`/formulieren/${form.name}`}
                    icon={<ArrowRightIcon />}
                    iconAlign="start"
                  >
                    <span data-testid={`forms-item-${form.name}`}>
                      <FormattedMessage id={`forms.${form.name}`} />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </PageGrid>
  );
};

export default FormsPage;
