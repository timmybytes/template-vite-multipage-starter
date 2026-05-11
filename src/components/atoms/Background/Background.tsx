import { CustomCssProps } from '@/types';
import { FC } from 'react';
import tw, { css } from 'twin.macro';

export type BackgroundProps = CustomCssProps & {
  imageUrl: string;
};

/**
 * Background - Fixed full-viewport image layer composed into pages that need a
 * page-level background. Sits behind Layout's semi-transparent gradient at z-index -1.
 */
export const Background: FC<BackgroundProps> = ({ imageUrl, customCss }) => (
  <div
    css={[
      tw`fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat`,
      css`
        background-image: url(${imageUrl});
      `,
      customCss,
    ]}
  />
);
