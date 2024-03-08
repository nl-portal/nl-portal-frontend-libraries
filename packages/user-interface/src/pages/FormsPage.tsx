import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import { FormattedMessage } from "react-intl";
import { Link } from "@gemeente-denhaag/link";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import { Forms } from "../interfaces/forms";
import { Heading3 } from "@gemeente-denhaag/components-react";

const FormsPage = ({ forms }: Forms) => {
  return (
    <PageGrid>
      <PageHeader title={<FormattedMessage id="pageTitles.forms" />}>
        {forms && !forms.length && (
          <span data-testid={"empty-forms"}>
            <FormattedMessage id="formsList.empty" />
          </span>
        )}
      </PageHeader>
      {forms && forms.length > 0 && (
        <section data-testid={"list-forms"}>
          <Heading3>
            <FormattedMessage id={`forms.listSubHeader`} />
          </Heading3>
          <ul className="utrecht-link-list utrecht-link-list--html-ul denhaag-link-group__list">
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
        </section>
      )}
    </PageGrid>
  );
};

export default FormsPage;
