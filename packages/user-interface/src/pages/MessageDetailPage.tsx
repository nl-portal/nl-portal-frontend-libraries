import { Bericht, useGetBerichtQuery } from "@nl-portal/nl-portal-api";
import { useOutletContext, useParams } from "react-router-dom";
import BackLink from "../components/BackLink";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import { RouterOutletContext } from "../contexts/RouterOutletContext";
import MessageContent from "../components/MessageContent.tsx";

const MessageDetailPage = () => {
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

  return (
    <PageGrid>
      <div>
        <BackLink routePath={paths.messages} />
        <PageHeader loading={messageLoading} title={message?.onderwerp} />
      </div>
      <MessageContent
        loading={messageLoading}
        error={!!messageError}
        messageText={message?.berichtTekst}
      />
    </PageGrid>
  );
};

export default MessageDetailPage;
