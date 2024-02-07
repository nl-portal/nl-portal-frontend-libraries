import { useIntl } from "react-intl";
import {
  default as ReactSkeleton,
  SkeletonProps,
} from "react-loading-skeleton";

interface Props extends SkeletonProps {}

const Skeleton = ({ className, ...props }: Props) => {
  const intl = useIntl();

  return (
    <div
      className={className}
      aria-busy
      aria-disabled
      aria-label={intl.formatMessage({ id: "element.loading" })}
    >
      <ReactSkeleton {...props} />
    </div>
  );
};

export default Skeleton;
