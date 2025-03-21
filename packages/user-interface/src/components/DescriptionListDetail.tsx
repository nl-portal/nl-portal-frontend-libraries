import { PropsWithChildren, ReactNode } from "react";
import Skeleton from "react-loading-skeleton";

interface DescriptionListDetailProps {
  defaultValue?: ReactNode;
  loading?: boolean;
  blockTranslation?: boolean;
}

const DescriptionListDetail = ({
  children,
  defaultValue = "-",
  loading,
  blockTranslation,
}: PropsWithChildren<DescriptionListDetailProps>) => {
  if (loading) {
    return <Skeleton />;
  }

  if (!children) return defaultValue;

  if (blockTranslation) return <span translate="no">{children}</span>;

  return children;
};

export default DescriptionListDetail;
