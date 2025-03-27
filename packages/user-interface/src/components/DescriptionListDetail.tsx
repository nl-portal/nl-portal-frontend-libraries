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

  return <span {...props}>{children || placeholder}</span>;
};

export default DescriptionListDetail;
