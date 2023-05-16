import * as React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Link, Paragraph} from '@gemeente-denhaag/components-react';
import {Alert} from '@gemeente-denhaag/alert';
import {FormattedMessage, useIntl} from 'react-intl';
import {FC, useContext} from 'react';
import {LocaleContext} from '@nl-portal/nl-portal-localization';

interface OverviewPageProps {
  openFormsFormId?: string;
  showFormsLink?: string;
  showIntro?: string;
  showAlert?: string;
  alertType?: 'error' | 'info' | 'success' | 'warning';
}

const OverviewPage: FC<OverviewPageProps> = ({
  openFormsFormId,
  showFormsLink = 'true',
  showIntro = 'false',
  showAlert = 'false',
  alertType = 'warning',
}) => {
  const {hrefLang} = useContext(LocaleContext);
  const intl = useIntl();

  return (
    <section>
      {showAlert === 'true' && (
        <Alert
          variant={alertType}
          title={intl.formatMessage({id: 'overview.alertTitle'})}
          text={intl.formatMessage({id: 'overview.alertText'})}
        />
      )}
      {showIntro === 'true' && (
        <React.Fragment>
          <h2 className="utrecht-heading-2">
            <FormattedMessage id="overviewpage.title" />
          </h2>
          <Paragraph>
            <FormattedMessage id="overviewpage.paragraph" />
          </Paragraph>
        </React.Fragment>
      )}
      {showFormsLink === 'true' && (
        <Link component={RouterLink} to={`/formulier/${openFormsFormId}`} hrefLang={hrefLang}>
          <FormattedMessage id="overview.defaultFormTitle" />
        </Link>
      )}
    </section>
  );
};

export {OverviewPage};
