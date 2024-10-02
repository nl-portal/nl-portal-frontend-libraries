import { useGetTakenV2Query, TaakV2 } from "@nl-portal/nl-portal-api";
import { Paragraph } from "@gemeente-denhaag/typography";
import { FormattedMessage } from "react-intl";
import { useOutletContext, useParams } from "react-router-dom";
import BackLink from "../components/BackLink";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import TasksList from "../components/TasksList";
import { MessageType } from "../components/Message";
import { messages } from "./MessagesPage";
import { RouterOutletContext } from "../interfaces/router-outlet-context";

const MessagePage = () => {
  const { id } = useParams();
  const { paths } = useOutletContext<RouterOutletContext>();
  const {
    data: tasksData,
    loading: taskLoading,
    error: tasksError,
  } = useGetTakenV2Query({
    variables: { zaakId: id },
  });
  const loading = taskLoading;
  const error = tasksError;
  const message: MessageType = messages.find((m) => m.id === Number(id))!;
  const tasks = tasksData?.getTakenV2.content as TaakV2[] | undefined;

  if (error) {
    <div>
      <Paragraph>
        <FormattedMessage id="messagePage.fetchError" />
      </Paragraph>
    </div>;
  }

  return (
    <PageGrid>
      <div>
        <BackLink routePath={paths.messages} />
        <PageHeader loading={loading} title={!loading && message.titel} />
      </div>
      <TasksList
        loading={loading}
        showEmpty={false}
        titleTranslationId={null}
        tasks={tasks}
      />
      <section>
        <Paragraph>{message.bericht}</Paragraph>
      </section>
      <TasksList
        loading={loading}
        showEmpty={false}
        titleTranslationId={null}
        tasks={tasks}
      />
    </PageGrid>
  );
};

export default MessagePage;
