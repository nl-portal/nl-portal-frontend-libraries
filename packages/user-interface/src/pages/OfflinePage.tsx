import { FormattedMessage, useIntl } from "react-intl";
import { Paragraph } from "@gemeente-denhaag/components-react";

const OfflinePage = () => {
  const intl = useIntl();

  return (
    <>
      <Paragraph>
        <FormattedMessage
          id="offline.warning"
          values={{
            applicationName: intl.formatMessage({ id: "app.appName" }),
          }}
        />
      </Paragraph>
    </>
  );
};
export default OfflinePage;
