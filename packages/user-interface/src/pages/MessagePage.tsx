import {
  Bericht,
  TaakV2,
  useGetBerichtQuery,
  useGetTakenV2Query,
} from "@nl-portal/nl-portal-api";
import { Paragraph } from "@gemeente-denhaag/typography";
import { FormattedMessage } from "react-intl";
import { useOutletContext, useParams } from "react-router-dom";
import BackLink from "../components/BackLink";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import TasksList from "../components/TasksList";
import { RouterOutletContext } from "../contexts/RouterOutletContext";
import styles from "./MessagePage.module.scss";
import Skeleton from "../components/Skeleton.tsx";

const MessagePage = () => {
  const { id } = useParams();
  const { paths } = useOutletContext<RouterOutletContext>();
  const { data: tasksData, loading: taskLoading } = useGetTakenV2Query({
    variables: { zaakId: id },
  });
  const {
    data: messageData,
    loading: messageLoading,
    error: messageError,
  } = useGetBerichtQuery({
    variables: { id: id },
  });
  const tasks: TaakV2[] | undefined = tasksData?.getTakenV2.content as
    | TaakV2[]
    | undefined;
  const message: Bericht | undefined = messageData?.getBericht as
    | Bericht
    | undefined;

  if (messageLoading) {
    return (
      <div>
        <Skeleton />
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
        <PageHeader
          loading={messageLoading}
          title={!messageLoading && message?.onderwerp}
        />
      </div>
      <TasksList
        loading={taskLoading}
        showEmpty={false}
        titleTranslationId={null}
        tasks={tasks}
      />
      <div className={styles["message__content-text"]}>
        <Paragraph>{message?.berichtTekst}</Paragraph>
      </div>
    </PageGrid>
  );
};

export default MessagePage;
