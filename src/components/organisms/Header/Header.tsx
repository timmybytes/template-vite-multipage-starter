import { FC } from 'react';
import tw from 'twin.macro';
import { CustomCssProps } from '@/types';
import { NavBar } from '@/components/molecules/NavBar';

export type HeaderProps = CustomCssProps & {
  //
};

/**
 * Header
 */
export const Header: FC<HeaderProps> = ({ customCss }) => {
  return (
    <Container css={customCss}>
      <NavBar />
      <div>Logo</div>
    </Container>
  );
};

const Container = tw.div`w-full flex justify-between items-center gap-4 mb-8`;
