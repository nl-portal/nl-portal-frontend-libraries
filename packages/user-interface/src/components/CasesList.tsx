import { Fragment, useEffect, useContext } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Skeleton from "react-loading-skeleton";
import { useGetZakenQuery } from "@nl-portal/nl-portal-api";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { Heading3, Paragraph } from "@gemeente-denhaag/components-react";
import { CaseCard } from "@gemeente-denhaag/card";
import { Link } from "@gemeente-denhaag/link";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import PortalLink from "./PortalLink";
import styles from "./CasesList.module.scss";
import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../contexts/RouterOutletContext";

interface CasesListContainerProps {
  children: React.ReactNode;
  numCases: number;
}

const CasesListContainer = ({
  children,
  numCases,
}: CasesListContainerProps) => {
  const { hrefLang } = useContext(LocaleContext);
  const { paths } = useOutletContext<RouterOutletContext>();

  return (
    <div className={styles.cases__container}>
      <div className={styles["cases__container-header"]}>
        <Heading3>
          <FormattedMessage id="overview.currentCases" />
        </Heading3>
        {numCases > 0 && (
          <Link
            Link={PortalLink}
            href={paths.cases}
            icon={<ArrowRightIcon />}
            iconAlign="end"
            hrefLang={hrefLang}
          >
            <FormattedMessage id="overview.showAllCases" />
          </Link>
        )}
      </div>
      {children}
    </div>
  );
};

interface CasesListProps {
  showCaseIdentification?: boolean;
  numElements?: number;
  completed?: boolean;
  showHeader?: boolean;
}

const CasesList = ({
  showCaseIdentification,
  numElements,
  completed,
  showHeader,
}: CasesListProps) => {
  const { paths } = useOutletContext<RouterOutletContext>();
  const { data, loading, error, refetch } = useGetZakenQuery();
  const intl = useIntl();

  useEffect(() => {
    refetch();
  }, []);

  const getCaseCards = () =>
    data?.getZaken
      .filter((zaak) => {
        const isEndStatus = zaak?.status?.statustype.isEindstatus;
        return completed ? isEndStatus : !isEndStatus;
      })
      .slice(0, numElements)
      .map((zaak) => (
        <div className={styles.cases__card} key={zaak.uuid}>
          <CaseCard
            active={!completed}
            title={intl.formatMessage({
              id: `case.${zaak.zaaktype.identificatie}.title`,
            })}
            subTitle={
              showCaseIdentification ? zaak.identificatie : zaak.omschrijving
            }
            date={new Date(zaak.startdatum)}
            href={paths.case(zaak.uuid)}
            Link={PortalLink}
          />
        </div>
      )) || [];

  const getNoDataMessage = () => (
    <Paragraph>
      <FormattedMessage
        id={completed ? "cases.noClosedCases" : "cases.noOpenCases"}
      />
    </Paragraph>
  );

  const getErrorMessage = () => (
    <Paragraph>
      <FormattedMessage id="cases.fetchError" />
    </Paragraph>
  );

  const getTabContent = (): [JSX.Element | JSX.Element[], number] => {
    const cards = getCaseCards();
    if (error) {
      return [getErrorMessage(), 0];
    }

    return [cards.length > 0 ? cards : getNoDataMessage(), cards.length];
  };

  const getSkeleton = () => {
    const getSkeletonCard = (key: number) => (
      <div
        className={styles.cases__card}
        key={key}
        aria-busy
        aria-disabled
        aria-label={intl.formatMessage({ id: "element.loading" })}
      >
        <Skeleton height={220} />
      </div>
    );

    return (
      <Fragment>
        {getSkeletonCard(0)}
        {getSkeletonCard(1)}
      </Fragment>
    );
  };

  const [tabContent, numCases] = getTabContent();
  const cardList = (
    <div className={styles.cases__cards}>
      {loading ? getSkeleton() : tabContent}
    </div>
  );

  return showHeader ? (
    <CasesListContainer numCases={numCases}>{cardList}</CasesListContainer>
  ) : (
    cardList
  );
};

export default CasesList;
