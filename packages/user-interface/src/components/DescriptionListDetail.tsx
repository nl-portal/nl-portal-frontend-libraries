import { HTMLAttributes, ReactNode } from "react";
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
}: DescriptionListDetailProps) => {
  if (loading) {
    return <Skeleton />;
  }

  return <span {...props}>{children || placeholder}</span>;
};

export default DescriptionListDetail;
