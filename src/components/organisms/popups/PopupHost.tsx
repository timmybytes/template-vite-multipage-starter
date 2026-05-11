import { FC } from 'react';
import { useStore } from '@nanostores/react';
import { $popup, closePopup } from '@/stores/popupStore';
import { PopupShell } from './PopupShell';

export const PopupHost: FC = () => {
  const popup = useStore($popup);

  return (
    <PopupShell
      isOpen={popup !== null}
      onClose={closePopup}
      title={popup?.title}
      customCss={popup?.customCss}
    >
      {popup?.content}
    </PopupShell>
  );
};
