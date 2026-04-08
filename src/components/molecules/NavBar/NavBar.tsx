import { FC } from 'react';
import tw, { css, styled } from 'twin.macro';
import { CustomCssProps } from '@/types';
import { NavLink } from 'react-router';

export type NavBarProps = CustomCssProps & {
  //
};

/**
 * NavBar
 */
export const NavBar: FC<NavBarProps> = ({ customCss }) => {
  return (
    <Container css={customCss}>
      <NavBarLink
        to="/"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Home
      </NavBarLink>
      <NavBarLink
        to="/about"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        About
      </NavBarLink>
    </Container>
  );
};

const Container = tw.div`flex justify-between items-center gap-4`;
const NavBarLink = styled(NavLink)(() => [
  tw`text-neutral-100 hover:text-neutral-300 transition-colors duration-200`,
  css`
    &.active {
      ${tw`text-purple-400`}
    }
  `,
]);
