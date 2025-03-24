import { HTMLAttributes, PropsWithChildren, ReactNode } from "react";
import Skeleton from "react-loading-skeleton";

interface DescriptionListDetailProps extends HTMLAttributes<HTMLSpanElement> {
  placeholder?: ReactNode;
  loading?: boolean;
  blockTranslation?: boolean;
}

const DescriptionListDetail = ({
  children,
  placeholder = "-",
  loading,
  blockTranslation,
  ...props
}: PropsWithChildren<DescriptionListDetailProps>) => {
  if (loading) {
    return <Skeleton />;
  }

  if (!children) return <span {...props}>{placeholder}</span>;

  if (blockTranslation)
    return (
      <span {...props} translate="no">
        {children}
      </span>
    );

  return <span {...props}>{children}</span>;
};

export default DescriptionListDetail;
