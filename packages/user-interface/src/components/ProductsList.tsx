import { useIntl } from "react-intl";
import styles from "./ProductsList.module.scss";
import { Paragraph } from "@gemeente-denhaag/typography";
import Skeleton from "./Skeleton";
import { OpenProductProduct } from "@nl-portal/nl-portal-api";
import { Pagination } from "@gemeente-denhaag/pagination";
import SectionHeader from "./SectionHeader";
import { useOutletContext } from "react-router";
import { RouterOutletContext } from "../interfaces/router-outlet-context";
import { listViewHeight } from "../constants/skeleton";
import Product from "./Product";

interface Props {
  loading?: boolean;
  error?: boolean;
  errorTranslationId?: string;
  showEmpty?: boolean;
  emptyTranslationId?: string;
  titleTranslationId?: string | null;
  readMoreLink?: string;
  readMoreTranslationId?: string | null;
  products?: OpenProductProduct[];
  index?: number;
  indexLimit?: number;
  onChange?: (index: number) => void;
}

const ProductsList = ({
  loading,
  error,
  errorTranslationId = "tasksList.fetchError",
  showEmpty = true,
  emptyTranslationId = "tasksList.empty",
  titleTranslationId = "tasksList.title",
  readMoreLink,
  readMoreTranslationId = "tasksList.viewAll",
  products,
  index,
  indexLimit,
  onChange,
}: Props) => {
  const intl = useIntl();
  const { paths } = useOutletContext<RouterOutletContext>();
  const tasksPath = readMoreLink || paths.tasks;
  const title = titleTranslationId
    ? intl.formatMessage({ id: titleTranslationId })
    : undefined;
  const subTitle = readMoreTranslationId
    ? intl.formatMessage({ id: readMoreTranslationId })
    : undefined;
  const errorMessage = intl.formatMessage({ id: errorTranslationId });
  const emptyMessage = intl.formatMessage({ id: emptyTranslationId });

  if (!loading) {
    if (error)
      return (
        <section className={styles["tasks-list"]}>
          <SectionHeader title={title} />
          <Paragraph>{errorMessage}</Paragraph>
        </section>
      );

    if (!products || products.length === 0) {
      if (!showEmpty) return null;
      return (
        <section className={styles["products-list"]}>
          <SectionHeader title={title} />
          <Paragraph>{emptyMessage}</Paragraph>
        </section>
      );
    }
  }

  return (
    <section className={styles["products-list"]}>
      <SectionHeader title={title} subTitle={subTitle} href={tasksPath} />
      {loading ? (
        <>
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} height={listViewHeight} />
          ))}
        </>
      ) : (
        products?.map((product) => (
          <Product key={product.uuid} product={product} />
        ))
      )}
      {indexLimit ? (
        <Pagination
          className={`denhaag-pagination--center ${styles["products-list__pagination"]}`}
          index={index}
          indexLimit={indexLimit}
          onChange={onChange}
        />
      ) : null}
    </section>
  );
};

export default ProductsList;
