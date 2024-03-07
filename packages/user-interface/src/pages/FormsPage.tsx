import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import { FormattedMessage } from "react-intl";
import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../contexts/RouterOutletContext.tsx";
import { Link } from "@gemeente-denhaag/link";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";

const FormsPage = ({ forms }) => {
  return (
    <PageGrid>
      <PageHeader title={<FormattedMessage id="pageTitles.forms" />}>
        {forms && !forms.length && (
          <span data-testid={"empty-forms"}>
            <FormattedMessage id="forms.emptyForms" />
          </span>
        )}
      </PageHeader>
      {forms && forms.length > 0 && (
        <ul data-testid={"list-forms"}
            className="utrecht-link-list utrecht-link-list--html-ul denhaag-link-group__list">
            {forms.map((form) => {
              return (
                <li className="denhaag-link-group__list-item" key={`${form}`}>
                  <Link href={`/formulieren/formulier/${form}`}
                        icon={<ArrowRightIcon />}
                        iconAlign="start">
                    <span data-testid={`forms-item-${form}`}>
                      <FormattedMessage id={`forms.${form}`} />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
      )}
    </PageGrid>
  );
};

export default FormsPage;
