import { Header } from '@/components/organisms/Header';
import { ISI } from '@/components/organisms/ISI';
import { CustomCssProps } from '@/types';
import { FC, ReactNode } from 'react';
import tw, { css, styled } from 'twin.macro';

export type LayoutProps = CustomCssProps & {
  children?: ReactNode;
  minimalIsi?: boolean;
};

/** -----------------------------------------------------------------
 * Layout - Main layout grid for the application
 *
 *  --------------------------------------------------------------- */
export const Layout: FC<LayoutProps> = ({
  children,
  customCss,
  minimalIsi = false,
}) => (
  <MainGrid css={customCss}>
    <Header />
    <InnerContent>{children}</InnerContent>
    <ISI minimal={minimalIsi} />
  </MainGrid>
);

const MainGrid = styled.div([
  tw`relative flex flex-col h-full w-full min-h-screen justify-start items-center overflow-hidden`,
  tw`bg-gradient-brand-multi-reverse`,
  css`
    background-image: linear-gradient(
      119deg,
      #c8787c1a 15.59%,
      #fa78211a 41.63%,
      #4f08b01a 64.55%,
      #9548ff1a 74.12%
    );
  `,
]);

const InnerContent = tw.div`w-full h-full`;
