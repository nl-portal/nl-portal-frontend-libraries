import { useOutletContext } from "react-router";
import { RouterOutletContext } from "../interfaces/router-outlet-context";
import { OpenProductProduct } from "@nl-portal/nl-portal-api";

const useProductUrl = (product: OpenProductProduct) => {
  const { paths, themes } = useOutletContext<RouterOutletContext>();

  if (!themes || !product.producttype?.code) return undefined;

  const theme = Object.values(themes).find((theme) =>
    Object.values(theme.productTypes).some(
      (pt) => pt?.code === product.producttype?.code,
    ),
  );

  if (!theme || !themes[theme?.slug]) return undefined;

  const productType = Object.values(
    themes[theme?.slug]?.productTypes || {},
  ).find((pt) => pt?.code === product.producttype?.code);

  if (!productType) return undefined;

  return paths.themeDetails(theme?.slug, productType?.slug, product.uuid);
};

export default useProductUrl;
