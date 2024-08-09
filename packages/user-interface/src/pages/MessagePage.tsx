import { Bericht, useGetBerichtQuery } from "@nl-portal/nl-portal-api";
import { Paragraph } from "@gemeente-denhaag/typography";
import { FormattedMessage } from "react-intl";
import { useOutletContext, useParams } from "react-router-dom";
import BackLink from "../components/BackLink";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import { RouterOutletContext } from "../contexts/RouterOutletContext";
import Skeleton from "../components/Skeleton.tsx";
import MessageContent from "../components/MessageContent.tsx";

const MessagePage = () => {
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
          <FormattedMessage id="messagePage.fetchError" />
        </Paragraph>
      </div>
    );
  }

  return (
    <PageGrid>
      <div>
        <BackLink routePath={paths.messages} />
        <PageHeader title={message.onderwerp} />
      </div>
      <MessageContent messageText={message.berichtTekst} />
    </PageGrid>
  );
};

export default MessagePage;
