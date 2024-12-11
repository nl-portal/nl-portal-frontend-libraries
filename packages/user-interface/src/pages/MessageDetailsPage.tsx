import { Bericht, useGetBerichtQuery } from "@nl-portal/nl-portal-api";
import { useOutletContext, useParams } from "react-router-dom";
import BackLink from "../components/BackLink";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import { Paragraph } from "@gemeente-denhaag/typography";
import { FormattedDate, FormattedMessage, FormattedTime } from "react-intl";
import { RouterOutletContext } from "../interfaces/router-outlet-context";
import { useContext } from "react";
import MessagesContext from "../contexts/MessagesContext";
import MessageContent from "../components/MessageContent";

const MessageDetailsPage = () => {
  const { id } = useParams();
  const { refetchMessages } = useContext(MessagesContext);
  const { paths } = useOutletContext<RouterOutletContext>();
  const {
    data: messageData,
    loading: messageLoading,
    error: messageError,
  } = useGetBerichtQuery({
    variables: { id: id },
    onCompleted: () => refetchMessages(),
  });
  const message = messageData?.getBericht as Bericht | undefined;

  return (
    <PageGrid variant="medium">
      <div>
        <BackLink href={paths.messages} />
        <PageHeader loading={messageLoading} title={message?.onderwerp}>
          {message?.publicatiedatum && (
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
          )}
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
