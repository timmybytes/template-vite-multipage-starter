import { navData, type ParentNav, type SubNav } from '@/data/navData';
import { atom } from 'nanostores';
import type { ReactNode } from 'react';

export type ActiveParent = {
  order: number;
  name: ReactNode;
  link?: string;
};

export type NavState = {
  isOpen: boolean;
  activePage: string | null;
  activeParent: ActiveParent | null;
  subNav: SubNav[] | null;
};

type NavDirection = 'next' | 'prev';

type NavPage = {
  order: number;
  parentOrder: number;
  link: string;
};

const HOME_LINK = '/home/';

/** -----------------------------------------------------------------
 * Navigation list: for arrowing through pages in correct order
 *  --------------------------------------------------------------- */

/** Flatten navData into page links array. */
const getOrderedNavPages = (): NavPage[] => {
  return navData
    .toSorted((a, b) => a.order - b.order)
    .flatMap((parent) => {
      if (parent.subNav?.length) {
        return parent.subNav
          .toSorted((a, b) => a.order - b.order)
          .map((sub) => ({
            order: sub.order,
            parentOrder: parent.order,
            link: sub.link,
          }));
      }

      if (parent.link) {
        return [
          {
            order: parent.order,
            parentOrder: parent.order,
            link: parent.link,
          },
        ];
      }

      return [];
    });
};

/** Get the current page slug from the browser pathname. */
export const getPage = () => {
  const path = window.location.pathname;
  const pathParts = path.split('/').filter(Boolean);
  return pathParts.length > 0 ? pathParts[pathParts.length - 1] : 'home';
};

/** Get the next or previous page link from the ordered nav list. */
export const getNextPrevPage = (direction: NavDirection): string | null => {
  const pageLink = getPageLink(getPage());
  if (!pageLink) return null;

  const pages = getOrderedNavPages();
  if (!pages.length) return null;

  const currentIndex = pages.findIndex((page) => page.link === pageLink);
  if (currentIndex === -1) {
    return direction === 'next'
      ? (pages[0]?.link ?? null)
      : (pages.at(-1)?.link ?? null);
  }

  if (direction === 'next' && currentIndex === pages.length - 1) {
    return HOME_LINK;
  }
  if (direction === 'prev' && pageLink === HOME_LINK) {
    return pages.at(-1)?.link ?? null;
  }
  const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
  return pages[nextIndex]?.link ?? null;
};

/** -----------------------------------------------------------------
 * Get nav data - For calculating the dropdown nav
 *  --------------------------------------------------------------- */

/** Convert a page slug into a comparable page link. */
const getPageLink = (page: string | null): string | null => {
  if (!page) return null;
  return page === 'home' ? '/' : `/${page}/`;
};

/** Convert a parent nav item into active parent state. */
const getActiveParent = (parent: ParentNav): ActiveParent => ({
  order: parent.order,
  name: parent.name,
  link: parent.link,
});

/** Find the parent nav item for the current page. */
const getParentForPage = (page: string | null): ParentNav | null => {
  const pageLink = getPageLink(page);

  if (!pageLink) return null;

  return (
    navData.find((parent) => {
      if (parent.link === pageLink) return true;

      return parent.subNav?.some((sub) => sub.link === pageLink);
    }) ?? null
  );
};

/** Find a parent nav item by its link. */
const getParentByLink = (link: string): ParentNav | null => {
  return navData.find((parent) => parent.link === link) ?? null;
};

/** Find a parent nav item by its order value. */
const getParentByOrder = (order: number): ParentNav | null => {
  return navData.find((parent) => parent.order === order) ?? null;
};

/** Derive route-based nav state from the active page. */
const getNavRouteState = (
  page: string | null,
): Pick<NavState, 'activePage' | 'activeParent' | 'subNav'> => {
  const parent = getParentForPage(page);

  return {
    activePage: page,
    activeParent: parent ? getActiveParent(parent) : null,
    subNav: parent?.subNav ?? null,
  };
};

/** Derive dropdown state from the active parent item. */
const getNavParentState = (
  parent: ParentNav | null,
): Pick<NavState, 'activeParent' | 'subNav'> => {
  return {
    activeParent: parent ? getActiveParent(parent) : null,
    subNav: parent?.subNav ?? null,
  };
};

export const $navState = atom<NavState>({
  isOpen: false,
  ...getNavRouteState(getPage()),
});

/** Set whether the nav is open. */
export function setNavOpen(isOpen: boolean): void {
  $navState.set({
    ...$navState.get(),
    isOpen,
  });
}

/** Open the nav. */
export function openNav(): void {
  setNavOpen(true);
}

/** Close the nav. */
export function closeNav(): void {
  setNavOpen(false);
}

/** Toggle the nav open state. */
export function toggleNav(): void {
  const currentState = $navState.get();

  $navState.set({
    ...currentState,
    isOpen: !currentState.isOpen,
  });
}

/** Set the active page and derived nav state. */
export function setActivePage(page: string | null): void {
  const currentState = $navState.get();

  $navState.set({
    ...currentState,
    ...getNavRouteState(page),
  });
}

/** Set the active parent and related subnav. */
export function setActiveParent(parent: ParentNav | null): void {
  const currentState = $navState.get();

  $navState.set({
    ...currentState,
    ...getNavParentState(parent),
  });
}

/** Set the active parent by matching its link. */
export function setActiveParentByLink(link: string): void {
  setActiveParent(getParentByLink(link));
}

/** Set the active parent by matching its order value. */
export function setActiveParentByOrder(order: number): void {
  setActiveParent(getParentByOrder(order));
}

/** Sync nav state with the current browser page. */
export function syncNavWithCurrentPage(): void {
  setActivePage(getPage());
}

/** Merge a partial update into the nav state. */
export function updateNavState(newState: Partial<NavState>): void {
  $navState.set({
    ...$navState.get(),
    ...newState,
  });
}
