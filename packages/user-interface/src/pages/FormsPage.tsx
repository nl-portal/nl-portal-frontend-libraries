import * as React from "react";
import {
  DocumentIcon,
  Heading2,
  List,
  ListItem,
  ListSubheader,
} from "@gemeente-denhaag/components-react";
import { FormattedMessage, useIntl } from "react-intl";
import { useGetFormsQuery } from "@nl-portal/nl-portal-api";
import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FormsPage.module.scss";
import ListItemSkeleton from "../components/ListItemSkeleton";

const FormsPage = () => {
  const intl = useIntl();
  const { data, loading, refetch } = useGetFormsQuery();
  const navigate = useNavigate();

  const onClickFunction = (
    event: React.MouseEvent<HTMLButtonElement>,
    formId: string,
  ): void => {
    event.stopPropagation();
    event.preventDefault();
    navigate(`/formulier/${formId}`);
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <section className={styles.forms}>
      <header className={styles.forms__header}>
        <Heading2>
          <FormattedMessage id="pageTitles.forms" />
        </Heading2>
      </header>
      <div className={styles["forms__forms-list"]}>
        <List
          subheader={
            <ListSubheader>
              {intl.formatMessage({ id: "forms.listSubHeader" })}
            </ListSubheader>
          }
        >
          {loading ? (
            <Fragment>
              <ListItemSkeleton icon={<DocumentIcon />} />
              <ListItemSkeleton icon={<DocumentIcon />} />
            </Fragment>
          ) : (
            data?.getFormList.map((form) => (
              <button
                key={form.uuid}
                onClick={(event) => onClickFunction(event, form.uuid)}
                type="button"
                className={styles["forms__list-item-button"]}
              >
                <ListItem primaryText={form.name} leftIcon={<DocumentIcon />} />
              </button>
            ))
          )}
        </List>
      </div>
    </section>
  );
};
export default FormsPage;
