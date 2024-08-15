import { Bericht, useGetBerichtQuery } from "@nl-portal/nl-portal-api";
import { useOutletContext, useParams } from "react-router-dom";
import BackLink from "../components/BackLink";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import { RouterOutletContext } from "../contexts/RouterOutletContext";
import MessageContent from "../components/MessageContent.tsx";
import Skeleton from "react-loading-skeleton";
import { Paragraph } from "@gemeente-denhaag/typography";
import { FormattedMessage } from "react-intl";

const MessageDetailsPage = () => {
  const { id } = useParams();
  const { paths } = useOutletContext<RouterOutletContext>();
  const {
    data: messageData,
    loading: messageLoading,
    error: messageError,
  } = useGetBerichtQuery({
    variables: { id: id },
  });
  const message = messageData?.getBericht as Bericht | undefined;

  if (messageLoading) {
    return (
      <div>
        <Skeleton height={60} />
      </div>
    );
  }

  if (messageError || !message) {
    return (
      <div>
        <BackLink routePath={paths.messages} />
        <Paragraph>
          <FormattedMessage id="messageDetails.fetchError" />
        </Paragraph>
      </div>
    );
  }

  return (
    <PageGrid>
      <div>
        <BackLink routePath={paths.messages} />
        <PageHeader loading={messageLoading} title={message?.onderwerp} />
      </div>
      <MessageContent
        loading={messageLoading}
        error={Boolean(messageError)}
        messageText={message?.berichtTekst}
      />
    </PageGrid>
  );
};

export default MessageDetailsPage;
