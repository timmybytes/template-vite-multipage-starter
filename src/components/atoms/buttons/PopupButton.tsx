import { CustomCssProps } from '@/types';
import { FC, ReactNode } from 'react';
import tw, { styled, theme } from 'twin.macro';

export type PopupButtonProps = CustomCssProps & {
  invert?: boolean;
  children?: ReactNode;
  onClick?: () => void;
};

/**
 * PopupButton
 */
export const PopupButton: FC<PopupButtonProps> = ({
  invert = false,
  customCss,
  children,
  onClick,
}) => {
  return (
    <PlusButton type="button" css={customCss} onClick={onClick} invert={invert}>
      <svg
        aria-hidden="true"
        focusable="false"
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        tw="mr-2 w-[12.5px] h-[12.5px]"
      >
        <path
          d="M25.5 14.7H14.85V25.5H10.6V14.7H0V10.85H10.6V0H14.85V10.85H25.5V14.7Z"
          fill={invert ? theme`colors.brand-purple` : theme`colors.white`}
        />
      </svg>

      {children}
    </PlusButton>
  );
};

const PlusButton = styled.button(({ invert }: { invert: boolean }) => [
  tw`absolute bottom-0 -right-[56px] w-[161px] min-h-[45px]
  mb-2 mr-4 pl-[19px] pr-[25px] py-[12px]
  flex justify-between items-center rounded-l-full
   font-bold text-disclaimer_copy`,
  invert ? tw`bg-white text-brand-purple` : tw`bg-brand-purple text-white`,
]);
