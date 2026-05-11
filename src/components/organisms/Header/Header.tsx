import { NavBar } from '@/components/organisms/navigation';
import { CustomCssProps } from '@/types';
import { FC } from 'react';
import tw from 'twin.macro';

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
