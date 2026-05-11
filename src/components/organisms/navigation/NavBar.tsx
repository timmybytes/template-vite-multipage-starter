import { MenuButton } from '@/components/atoms/buttons';
import { getNextPrevPage } from '@/stores/navStore';
import { openPopup } from '@/stores/popupStore';
import { CustomCssProps } from '@/types';
import { FC, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import { ReferencePopup } from '../popups';
import { DropdownNav } from './DropdownNav';

export type NavBarProps = CustomCssProps & {
  //
};

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  return target.isContentEditable;
}

/**
 * NavBar
 */
export const NavBar: FC<NavBarProps> = ({ customCss }) => {
  const nextHref = getNextPrevPage('next');
  const prevHref = getNextPrevPage('prev');
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      if (isEditableTarget(event.target)) return;

      if (event.key === 'ArrowLeft' && prevHref) {
        event.preventDefault();
        window.location.assign(prevHref);
      } else if (event.key === 'ArrowRight' && nextHref) {
        event.preventDefault();
        window.location.assign(nextHref);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [prevHref, nextHref]);

  return (
    <Container css={customCss}>
      <MenuButton />
      <NavBarLink href="/home/" data-nav="true">
        Home
      </NavBarLink>
      <NavBarLink
        href="https://wikipedia.org/"
        target="_blank"
        rel="noopener noreferrer"
        data-nav="true"
      >
        Information
      </NavBarLink>
      <NavBarText
        onClick={() =>
          openPopup({
            title: <ReferenceHeading>References</ReferenceHeading>,
            content: <ReferencePopup />,
          })
        }
      >
        References
      </NavBarText>
      <DropdownNav />
      <NavBarLink href="/" data-nav="true">
        Summary
      </NavBarLink>
    </Container>
  );
};

const Container = tw.div`
  flex justify-start items-center h-[58px] w-full bg-brand-purple shadow-xl pl-[135.5px] z-10 relative`;
const NavBarItem = tw`font-bold text-white text-base
  transition-colors duration-200 px-[55px]
  border-l-white border-solid border-l-[1px]`;
const NavBarText = styled.button(() => [NavBarItem]);
const NavBarLink = styled.a(() => [NavBarItem]);
const ReferenceHeading = tw.h2`text-brand-purple text-[21px] leading-[25px] font-bold`;
