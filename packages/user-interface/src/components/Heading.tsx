import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
} from "@gemeente-denhaag/typography";
import classNames from "classnames";

export type Headers = "h1" | "h2" | "h3" | "h4" | "h5";

interface Props {
  as?: Headers;
  size?: Headers;
  className?: string;
  children: React.ReactNode;
}

const Heading = ({ as = "h1", size = as, className, children }: Props) => {
  const classes = classNames(className, {
    [`utrecht-heading-${size.replace("h", "")}`]: as !== size,
  });

  if (as === "h1") return <Heading1 className={classes}>{children}</Heading1>;
  if (as === "h4") return <Heading4 className={classes}>{children}</Heading4>;
  if (as === "h2") return <Heading2 className={classes}>{children}</Heading2>;
  if (as === "h3") return <Heading3 className={classes}>{children}</Heading3>;
};

export default Heading;
