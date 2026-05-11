import { PopupHost } from '@/components/organisms/popups/PopupHost';
import { Layout } from '@/components/wrappers/Layout';
import { ReferenceId } from '@/data/references';
import {
  clearActiveReferences,
  setActiveReferences,
} from '@/stores/referenceStore';
import GlobalStyles from '@/styles/GlobalStyles';
import { CustomCssProps } from '@/types';
import React, { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';

type PageWrapperProps = CustomCssProps & {
  pageContent: ReactNode;
  pageReferences?: ReferenceId[];
  minimalIsi?: boolean;
};

const PAGE_READY_CLASS = 'page-ready';
const PAGE_EXIT_CLASS = 'page-exit';
const STORAGE_KEY = 'page-transition';

function installPageTransitions(): void {
  const rootEl = document.documentElement;

  const pendingTransition = sessionStorage.getItem(STORAGE_KEY);

  if (pendingTransition) {
    sessionStorage.removeItem(STORAGE_KEY);
    requestAnimationFrame(() => {
      rootEl.classList.add(PAGE_READY_CLASS);
    });
  } else {
    rootEl.classList.add(PAGE_READY_CLASS);
  }

  document.addEventListener('click', (event) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const anchor = target.closest('a');

    if (!(anchor instanceof HTMLAnchorElement)) {
      return;
    }

    const href = anchor.getAttribute('href');

    if (!href) {
      return;
    }

    const isModifiedClick =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

    const isExternal =
      anchor.target === '_blank' ||
      anchor.hasAttribute('download') ||
      anchor.origin !== window.location.origin;

    if (isModifiedClick || isExternal) {
      return;
    }

    event.preventDefault();

    sessionStorage.setItem(STORAGE_KEY, '1');
    rootEl.classList.remove(PAGE_READY_CLASS);
    rootEl.classList.add(PAGE_EXIT_CLASS);

    window.setTimeout(() => {
      window.location.href = anchor.href;
    }, 220);
  });
}

/**
 * Helper that wraps page content in the app's Layout and mounts it to the DOM.
 * This is used by each page entry file to bootstrap the page.
 */
export function PageWrapper({
  pageContent,
  pageReferences = [],
  minimalIsi = false,
  customCss,
}: PageWrapperProps): void {
  clearActiveReferences();
  setActiveReferences(pageReferences);
  installPageTransitions();

  const container = document.getElementById('root');

  if (!container) {
    throw new Error('Missing #root mount node.');
  }

  createRoot(container).render(
    <React.StrictMode>
      <GlobalStyles />
      <Layout minimalIsi={minimalIsi} customCss={customCss}>
        {pageContent}
        <PopupHost />
      </Layout>
    </React.StrictMode>,
  );
}
