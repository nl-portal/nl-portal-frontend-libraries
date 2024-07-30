import { useIntl } from "react-intl";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import MessagesList from "../components/MessagesList";

export const messages = [
  {
    id: 1,
    titel:
      "Herinnering: Informatie geven voor uw aanvraag subsidie geluidsisolatie",
    verloopdatum: "2024-09-01T12:00:00Z",
    read: false,
    bericht: (
      <>
        Beste mevrouw Klap,
        <br />
        <br />
        U heeft te weinig of geen parkeerkosten betaald voor het parkeren bij
        Valeriusplein. Daarom heeft u een parkeerbon gekregen.
        <br />
        <br />
        Betaal vóór 1 maart 2023 uw parkeerbon van € 74.90.
        <br />
        <br />
        Bent u het niet eens met deze parkeerbon? Dan kunt u bezwaar maken. Vul
        het formulier <a href="#test">Bezwaar maken tegen een parkeerbon</a> in.
        <br />
        <br />
        Met vriendelijke groet,
        <br />
        Gemeente Den Haag
      </>
    ),
  },
  {
    id: 2,
    titel: "Informatie geven voor uw aanvraag Ooievaarspas",
    verloopdatum: "2024-09-01T12:00:00Z",
    read: true,
    bericht: (
      <>
        Beste mevrouw Klap,
        <br />
        <br />
        U heeft te weinig of geen parkeerkosten betaald voor het parkeren bij
        Valeriusplein. Daarom heeft u een parkeerbon gekregen.
        <br />
        <br />
        Betaal vóór 1 maart 2023 uw parkeerbon van € 74.90.
        <br />
        <br />
        Bent u het niet eens met deze parkeerbon? Dan kunt u bezwaar maken. Vul
        het formulier <a href="#test">Bezwaar maken tegen een parkeerbon</a> in.
        <br />
        <br />
        Met vriendelijke groet,
        <br />
        Gemeente Den Haag
      </>
    ),
  },
];

const MessagesPage = () => {
  const intl = useIntl();

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
