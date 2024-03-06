import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import { FormattedMessage } from "react-intl";
import { Paragraph } from "@gemeente-denhaag/components-react";
import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../contexts/RouterOutletContext.tsx";
import { Link } from "@gemeente-denhaag/link";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";

const FormsPage = ({ forms }) => {
  const { paths } = useOutletContext<RouterOutletContext>();
  return (
    <PageGrid>
      <PageHeader title={<FormattedMessage id="pageTitles.forms" />}>
        {forms && forms.length > 0 && (
          <ul className="utrecht-link-list utrecht-link-list--html-ul denhaag-link-group__list">
            {forms.map((form) => {
              return (
                <li className="denhaag-link-group__list-item" key={`${form}`}>
                  <Link href={paths.form(form)}
                        icon={<ArrowRightIcon />}
                        iconAlign="start">
                  <span>
                   <FormattedMessage id={`forms.${form}`} />
                  </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) || forms && !forms.length && (
          <Paragraph>
            <FormattedMessage id="forms.noForms" />
          </Paragraph>
        )}
      </PageHeader>
    </PageGrid>
  );
};

export default FormsPage;
