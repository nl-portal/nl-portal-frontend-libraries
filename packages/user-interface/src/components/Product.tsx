import type { OpenProductProduct } from "@nl-portal/nl-portal-api";
import PortalLink from "./PortalLink";
import { ActionSingle } from "@gemeente-denhaag/action";
import useProductUrl from "../hooks/useProductUrl";

interface Props {
  product: OpenProductProduct;
}

const Product = ({ product }: Props) => {
  const productLink = useProductUrl(product) ?? "";

  return (
    <ActionSingle link={productLink} Link={PortalLink}>
      {product.naam}
    </ActionSingle>
  );
};

export default Product;
