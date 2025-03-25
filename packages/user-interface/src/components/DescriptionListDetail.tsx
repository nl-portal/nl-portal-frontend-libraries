import { HTMLAttributes, PropsWithChildren, ReactNode } from "react";
import Skeleton from "react-loading-skeleton";

interface DescriptionListDetailProps extends HTMLAttributes<HTMLSpanElement> {
  placeholder?: ReactNode;
  loading?: boolean;
}

const DescriptionListDetail = ({
  children,
  placeholder = "-",
  loading,
  ...props
}: PropsWithChildren<DescriptionListDetailProps>) => {
  if (loading) {
    return <Skeleton />;
  }

  if (!children) return <span {...props}>{placeholder}</span>;

  return <span {...props}>{children}</span>;
};

export default DescriptionListDetail;
