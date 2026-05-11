import { $navState, toggleNav } from '@/stores/navStore';
import { CustomCssProps } from '@/types';
import { useStore } from '@nanostores/react';
import { FC } from 'react';
import tw from 'twin.macro';

export type MenuButtonProps = CustomCssProps & {};

/**
 * MenuButton
 */

export const MenuButton: FC<MenuButtonProps> = ({ customCss }) => {
  const navStore = useStore($navState);

  return (
    <Button
      onClick={() => {
        toggleNav();
      }}
      css={customCss}
    >
      {navStore.isOpen ? (
        <img
          src="/shared/icon-menu-close.svg"
          tw="w-[20px] h-[17px] mr-[22px]"
          alt="Close Menu"
        />
      ) : (
        <img
          src="/shared/burger.svg"
          alt="Menu"
          tw="w-[20px] h-[17px] mr-[22px]"
        />
      )}
    </Button>
  );
};

const Button = tw.button``;
