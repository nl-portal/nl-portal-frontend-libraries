import * as React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Paragraph} from '@gemeente-denhaag/components-react';
import {Link} from '@gemeente-denhaag/link';
import {Alert} from '@gemeente-denhaag/alert';
import {Heading2, Heading3} from '@gemeente-denhaag/components-react';
import {FormattedMessage, useIntl} from 'react-intl';
import {FC, useContext} from 'react';
import {LocaleContext} from '@nl-portal/nl-portal-localization';
import {useUserInfo} from '../../utils/use-user-info';

interface OverviewPageProps {
  openFormsFormId?: string;
  showFormsLink?: string;
  showIntro?: string;
  personalizeIntro?: string;
  showAlert?: string;
  alertType?: 'error' | 'info' | 'success' | 'warning';
}

const OverviewPage: FC<OverviewPageProps> = ({
  openFormsFormId,
  showFormsLink = 'true',
  showIntro = 'false',
  personalizeIntro = 'false',
  showAlert = 'false',
  alertType = 'warning',
}) => {
  const {hrefLang} = useContext(LocaleContext);
  const intl = useIntl();

  const {userName, volmachtgever, isVolmachtLogin} = useUserInfo();

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
          {personalizeIntro ? (
            <React.Fragment>
              <Heading2>
                <FormattedMessage id="overviewpage.title" values={{userName}} />
              </Heading2>
              {isVolmachtLogin && (
                <div>
                  <Heading3>
                    <FormattedMessage id="overviewpage.subtitle" values={{volmachtgever}} />
                  </Heading3>
                </div>
              )}
              <Paragraph>
                <FormattedMessage id="overviewpage.paragraph" />
              </Paragraph>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Heading2 className="utrecht-heading-2">
                <FormattedMessage id="overviewpage.title" />
              </Heading2>
              <Paragraph>
                <FormattedMessage id="overviewpage.paragraph" />
              </Paragraph>
            </React.Fragment>
          )}
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
