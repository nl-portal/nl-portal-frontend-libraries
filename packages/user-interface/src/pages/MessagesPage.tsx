import { useIntl } from "react-intl";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import MessagesList from "../components/MessagesList";
import { Bericht, GetBerichtenDocument } from "@nl-portal/nl-portal-api";
import { useQuery } from "@apollo/client/react";
import SearchForm from "../components/SearchForm";

const MessagesPage = () => {
  const intl = useIntl();
  const { data, loading, error, refetch } = useQuery(GetBerichtenDocument, {
    variables: { pageSize: 10 },
    fetchPolicy: "cache-and-network",
  });
  const messages = data?.getBerichten.content as Bericht[] | undefined;

  const handleFormSubmit = (searchValue: string) => {
    try {
      refetch({ onderwerp: searchValue });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const onPageChange = (index: number) => {
    try {
      refetch({ pageNumber: index + 1 });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <PageGrid>
      <PageHeader title={intl.formatMessage({ id: "pageTitles.messages" })}>
        <SearchForm
          translationId="messages"
          totalElements={data?.getBerichten.totalElements ?? 0}
          onSubmit={handleFormSubmit}
        />
      </PageHeader>
      <MessagesList
        loading={loading}
        error={Boolean(error)}
        messages={messages}
        indexLimit={
          data?.getBerichten.totalPages && data.getBerichten.totalPages - 1
        }
        onChange={onPageChange}
      />
    </PageGrid>
  );
};

export default MessagesPage;
