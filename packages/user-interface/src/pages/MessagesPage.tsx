import { useIntl } from "react-intl";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import MessagesList from "../components/MessagesList";
import { Bericht, useGetBerichtenQuery } from "@nl-portal/nl-portal-api";
import SearchForm from "../components/SearchForm";

const MessagesPage = () => {
  const intl = useIntl();
  const { data, loading, error, refetch } = useGetBerichtenQuery({
    variables: { pageSize: 10 },
    fetchPolicy: "cache-and-network",
  });
  const messages = data?.getBerichten.content as Bericht[] | undefined;

  const handleFormSubmit = (searchValue: string) => {
    refetch({ onderwerp: searchValue });
  };

  const onPageChange = (index: number) => {
    refetch({ pageNumber: index + 1 });
    return index;
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
