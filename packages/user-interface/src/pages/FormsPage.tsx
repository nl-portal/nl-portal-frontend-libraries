import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import { FormattedMessage } from "react-intl";
import { Paragraph } from "@gemeente-denhaag/components-react";
import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../contexts/RouterOutletContext.tsx";
import { Link } from "react-router-dom";


const FormsPage = ({ forms }) => {
  const { paths } = useOutletContext<RouterOutletContext>();
  return (
    <PageGrid>
      <PageHeader title={<FormattedMessage id="pageTitles.forms" />} />
      {forms && forms.length > 0 && (
        <ul class="utrecht-link-list utrecht-link-list--html-ul denhaag-link-group__list">
          {forms.map((form) => {
            return (
              <li class="denhaag-link-group__list-item" key={`${form}`}>
                <Link to={paths.form(form)}>
                  <span className="denhaag-link denhaag-link--with-icon denhaag-link--with-icon-start">
                    <svg  aria-hidden="true"
                          className="denhaag-icon"
                          focusable="false"
                          height="1em"
                          viewBox="0 0 24 24"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12.293 5.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L16.586 13H5a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        fill="currentColor"></path>
                    </svg>
                  </span>
                  <span className="denhaag-link__label">
                    <FormattedMessage id={`forms.${form}`} />
                  </span>
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
