import { navData } from '@/data/navData';
import { $navState, closeNav, setActiveParent } from '@/stores/navStore';
import { CustomCssProps } from '@/types';
import { useGSAP } from '@gsap/react';
import { useStore } from '@nanostores/react';
import gsap from 'gsap';
import { FC, SVGProps, useRef } from 'react';
import tw, { css, styled, theme } from 'twin.macro';

gsap.registerPlugin(useGSAP);

export type DropdownNavProps = CustomCssProps & {};

/**
 * DropdownNav
 */
export const DropdownNav: FC<DropdownNavProps> = ({ customCss }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const navStore = useStore($navState);
  const { isOpen, activeParent } = navStore;

  // Kludge to match the awkward subnav placements in design
  const subNavHeight = (order: number) => {
    switch (order) {
      case 1:
      case 2:
      case 3:
        return order * 70;
      case 4:
        return 60;
      case 5:
        return order * 82;
      case 6:
        return order * 80;
      case 7:
        return order * 78.5;
      default:
        return 0;
    }
  };

  useGSAP(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        autoAlpha: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(menuRef.current, {
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [isOpen]);
  return (
    <Container isOpen={isOpen} css={customCss} ref={menuRef}>
      <BGOverlay onClick={closeNav} />
      <NavContainer>
        <NavParentLinksContainer>
          {navData.map((parent) => {
            const isLast = parent === navData[navData.length - 1];
            // If parent has no link, treat it as a button for subnav
            if (!parent.link) {
              return (
                <NavItem
                  key={parent.order}
                  as="button"
                  type="button"
                  onClick={() => setActiveParent(parent)}
                  active={activeParent?.order === parent.order}
                >
                  <NavItemContentWrapper>
                    {/* Span keeps any sibling elements together while maintaining flex justify-between layout */}
                    <span>{parent.name}</span>
                    <NavArrow
                      color={
                        activeParent?.order === parent.order
                          ? theme`colors.brand-yellow`
                          : 'white'
                      }
                    />
                  </NavItemContentWrapper>
                  {!isLast && <NavItemDivider />}
                </NavItem>
              );
            }

            return (
              <NavItem
                key={parent.order}
                href={parent.link}
                onClick={() => setActiveParent(parent)}
                active={activeParent?.order === parent.order}
              >
                <NavItemContentWrapper>{parent.name}</NavItemContentWrapper>
                {!isLast && <NavItemDivider />}
              </NavItem>
            );
          })}
        </NavParentLinksContainer>
        {/* Subnav links for the active parent */}
        <SubNavContainer topPosition={subNavHeight(activeParent?.order ?? 0)}>
          {navStore.subNav?.map((sub) => {
            const isLast =
              sub === navStore.subNav?.[navStore.subNav.length - 1];
            return (
              <SubNavItem
                key={sub.order}
                href={sub.link}
                data-nav="true"
                isLast={isLast}
              >
                {sub.name}
              </SubNavItem>
            );
          })}
        </SubNavContainer>
      </NavContainer>
    </Container>
  );
};

const Container = styled.div<{ isOpen: boolean }>(({ isOpen }) => [
  tw`absolute top-[58px] left-0 w-full h-screen`,
  isOpen ? tw`block pointer-events-auto` : tw`hidden pointer-events-none`,
]);

const BGOverlay = tw.div`fixed inset-0 bg-white/80 top-[58px]`;

const NavContainer = tw.div`relative w-full h-[877px] z-20
  bg-gradient-brand-purple-light-to-bottom rounded-bl-[75px]`;

const NavParentLinksContainer = tw.div`flex flex-col w-[297px] h-full ml-[75px] pt-[70px] justify-start items-center`;

const NavItem = styled.a<{ active?: boolean }>(({ active }) => [
  tw`text-white text-[20px] leading-[150%] font-semibold cursor-pointer relative
  w-full text-left py-5 flex justify-between items-center bg-transparent`,
  active && tw`bg-white bg-opacity-[15%] text-brand-yellow font-bold w-full`,
]);

const NavItemContentWrapper = tw.div`flex items-center justify-between w-full px-4`;

const NavItemDivider = styled.div<{ active?: boolean }>(({ active }) => [
  tw`bg-brand-lilac h-[1px] w-[265px] block absolute bottom-0 left-1/2 -translate-x-1/2 z-10`,
  active && tw`border-b-brand-yellow`,
]);

const SubNavContainer = styled.div(
  ({ topPosition }: { topPosition: number }) => [
    tw`absolute top-[70px] left-[387px] w-[292px] flex flex-col justify-start items-start z-10 bg-white bg-opacity-[15%] rounded-br-[15px] pl-[17px] pr-[25px] -ml-2`,
    css`
      top: ${topPosition}px;
    `,
  ],
);
const SubNavItem = styled(NavItem)(({ isLast }: { isLast?: boolean }) => [
  tw`text-base leading-[150%] font-semibold text-white py-5 relative`,
  isLast ? tw`border-b-0` : tw`border-b-white border-solid border-b-[1px]`,
]);

const NavArrow: FC<SVGProps<SVGSVGElement>> = ({
  color = 'white',
  ...props
}) => (
  <svg
    width="16.5"
    height="16.5"
    viewBox="0 0 25 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M24.75 14.2891L0 28.5785V-0.000356674L24.75 14.2891Z"
      fill={color}
    />
  </svg>
);
