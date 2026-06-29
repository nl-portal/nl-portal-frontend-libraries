import { useOutletContext } from "react-router";
import { RouterOutletContext } from "../interfaces/router-outlet-context";
import { OpenProductProduct } from "@nl-portal/nl-portal-api";

const useProductUrl = (product: OpenProductProduct) => {
  const { paths, themes } = useOutletContext<RouterOutletContext>();

  if (!themes) return "#";

  const theme = Object.values(themes).find((theme) =>
    Object.values(theme.productTypes).some(
      (pt) => pt?.code === product.producttype?.code,
    ),
  );

  if (!theme || !themes[theme?.slug]) return "#";

  const productType = Object.values(
    themes[theme?.slug]?.productTypes || {},
  ).find((pt) => pt?.code === product.producttype?.code);

  if (!productType) return paths.themeOverview(theme?.slug);

  return paths.themeDetails(theme?.slug, productType?.slug, product.uuid);
};

export default useProductUrl;
