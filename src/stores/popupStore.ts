import { CustomCssProps } from '@/types';
import { atom } from 'nanostores';

import { ReactNode } from 'react';

export type PopupState =
  | (CustomCssProps & {
      title?: ReactNode;
      content: ReactNode;
    })
  | null;

export const $popup = atom<PopupState>(null);

export function openPopup(popup: Exclude<PopupState, null>): void {
  $popup.set(popup);
}

export function closePopup(): void {
  $popup.set(null);
}
