import { Bericht, useGetBerichtQuery } from "@nl-portal/nl-portal-api";
import { useOutletContext, useParams } from "react-router-dom";
import BackLink from "../components/BackLink";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import { RouterOutletContext } from "../contexts/RouterOutletContext";
import MessageContent from "../components/MessageContent";
import { Paragraph } from "@gemeente-denhaag/typography";
import { FormattedDate, FormattedMessage, FormattedTime } from "react-intl";

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

  return (
    <PageGrid>
      <div>
        <BackLink routePath={paths.messages} />
        <PageHeader loading={messageLoading} title={message?.onderwerp}>
          <Paragraph>
            <FormattedMessage
              id="messageDetails.sent"
              values={{
                date: (
                  <FormattedDate
                    value={message?.publicatiedatum}
                    year="numeric"
                    month="long"
                    day="numeric"
                  />
                ),
                time: (
                  <FormattedTime
                    value={message?.publicatiedatum}
                    hour="numeric"
                    minute="numeric"
                  />
                ),
              }}
            />
          </Paragraph>
        </PageHeader>
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
