import { UIMatch } from "react-router-dom";
import { NavigationItem } from "../interfaces/navigation-item";

/**
 * Needed for multiple backwards compatibility reasons, because the old nl-portal design
 * shows the current page + icon below the header. In case of the childpages, the parent page + icon is shown.
 * Also the document title show this "navigation page" (first parent which is shown in the menu)
 *
 * @param matches react-router-dom useMatches
 * @param navigationItems navigationItems
 * @returns current navigation page
 */
export const getCurrentNavigationPage = (
  matches: UIMatch[],
  navigationItems: NavigationItem[][],
) => {
  const matchesCopy = [...matches];
  const matchesIndexSize = matchesCopy.length - 1;

  for (let i = 0; i < matchesCopy.length - 1; i++) {
    const match = matches.pop();

    if (!match) continue;
    if (i === matchesIndexSize && match.pathname === "/") continue;

    const foundNavItem = navigationItems
      .flat()
      .find((item) => item?.path === match.pathname);

    if (foundNavItem) return foundNavItem;
  }

  return;
};
