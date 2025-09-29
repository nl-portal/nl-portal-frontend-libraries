import classNames from "classnames";
import { AnchorHTMLAttributes } from "react";
import { Link } from "react-router";
import { Link as DHLink } from "@gemeente-denhaag/link";

// A generic wrapper around the React Router Link, which will possibly be used a lot in implementations to pass to components from design systems.
// For example in breadcrumbs, headers and footers.
//
// TODO: the external link determination a little bit hacky. Ideally, the React Router Link would automatically know if a href is external.
// This logic should be improved or extended in the future.
const PortalLink = ({
  href,
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isExternalLink =
    href && (href.startsWith("https://") || href.startsWith("tel:"));
  const linkClassNames = classNames("nl-link", className);
  if (href && !isExternalLink) {
    return (
      <Link to={href} className={linkClassNames} {...props}>
        {props.children}
      </Link>
    );
  }
  return (
    <DHLink href={href} className={className} {...props}>
      {props.children}
    </DHLink>
  );
};

export default PortalLink;
