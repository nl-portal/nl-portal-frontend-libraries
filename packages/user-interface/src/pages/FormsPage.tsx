import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import { FormattedMessage } from "react-intl";
import { Paragraph } from "@gemeente-denhaag/components-react";
import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../contexts/RouterOutletContext.tsx";
import { Link } from "react-router-dom";


const FormsPage = ({forms}) => {
  const { paths } = useOutletContext<RouterOutletContext>();
  return (
    <PageGrid>
      <PageHeader title={<FormattedMessage id="pageTitles.forms" />} />
      {forms && forms.length > 0 && (
        <ul>
          {forms.map((form) => {
            return (
              <li key={`${form}`}>
                <Link to={paths.form(form)}>
                  <FormattedMessage id={`forms.${form}`} />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      {forms && !forms.length && (
        <Paragraph>
          <FormattedMessage id="forms.noForms" />
        </Paragraph>
      )}
    </PageGrid>
);
};

export default FormsPage;
