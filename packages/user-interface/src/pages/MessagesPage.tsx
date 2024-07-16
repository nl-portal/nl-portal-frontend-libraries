import { useIntl } from "react-intl";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import MessagesList from "../components/MessagesList";

const MessagesPage = () => {
  const intl = useIntl();

  const messages = [
    {
      id: 1,
      titel:
        "Herinnering: Informatie geven voor uw aanvraag subsidie geluidsisolatie",
      verloopdatum: "2024-09-01T12:00:00Z",
      read: false,
    },
    {
      id: 2,
      titel: "Informatie geven voor uw aanvraag Ooievaarspas",
      verloopdatum: "2024-09-01T12:00:00Z",
      read: true,
    },
  ];

  return (
    <PageGrid>
      <PageHeader title={intl.formatMessage({ id: "pageTitles.messages" })} />
      <MessagesList
        loading={false}
        error={Boolean(false)}
        messages={messages}
      />
    </PageGrid>
  );
};

export default MessagesPage;
