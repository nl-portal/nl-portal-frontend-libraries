import { FormattedMessage } from "react-intl";
import {
  GetBurgerProfielDocument,
  useGetBurgerProfielQuery,
  useUpdateBurgerProfielMutation,
} from "@nl-portal/nl-portal-api";
import PageHeader from "../components/PageHeader";
import useUserInfo from "../hooks/useUserInfo";
import { FormEvent } from "react";
import Skeleton from "react-loading-skeleton";
import NotificationForm from "../forms/NotificationForm";
import { RouterOutletContext } from "../interfaces/router-outlet-context";
import { useOutletContext } from "react-router-dom";
import BackLink from "../components/BackLink";

const EditNotificationsPage = () => {
  const { isPerson } = useUserInfo();
  const { paths } = useOutletContext<RouterOutletContext>();

  const { data: contactData, loading } = useGetBurgerProfielQuery({
    skip: !isPerson,
  });

  const [mutateFunction, { loading: loadingMutation }] =
    useUpdateBurgerProfielMutation({
      update: (cache, { data }) => {
        cache.writeQuery({
          query: GetBurgerProfielDocument,
          data: {
            getBurgerProfiel: {
              ...data?.updateBurgerProfiel,
            },
          },
        });
      },
    });

  const handleNotificationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { emailNotification } = Object.fromEntries(
      new FormData(event.currentTarget),
    );

    mutateFunction({
      variables: {
        klant: { aanmaakkanaal: emailNotification?.toString() || "" },
      },
    });
  };

  return (
    <>
      <BackLink href={paths.account} />
      <PageHeader
        title={<FormattedMessage id={`pageTitles.editNotifications`} />}
      />
      {loading ? (
        <Skeleton />
      ) : (
        <NotificationForm
          currentValue={contactData?.getBurgerProfiel?.aanmaakkanaal || ""}
          onSubmit={handleNotificationSubmit}
          loading={loadingMutation}
        />
      )}
    </>
  );
};

export default EditNotificationsPage;
