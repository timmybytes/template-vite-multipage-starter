import { CustomCssProps } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FC, useRef, useState } from 'react';
import tw, { styled } from 'twin.macro';

gsap.registerPlugin(useGSAP);

const ISI_COLLAPSED_HEIGHT = 221;
const ISI_OPEN_HEIGHT = 589.5;
const MINIMAL_ISI_HEIGHT = 60;

export type IsiProps = CustomCssProps & {
  /** Override entire ISI and show only FullInfoLink with minimal height container and no visible toggle */
  minimal?: boolean;
};

/**
 * ISI - Fixed bottom component with toggleable content, used for prescribing information and summary sections
 */
export const ISI: FC<IsiProps> = ({ customCss, minimal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const upperRef = useRef<HTMLDivElement>(null);
  const lowerRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  // Set collapsed state on mount
  useGSAP(() => {
    if (!upperRef.current) return;

    gsap.set(upperRef.current, {
      height: minimal ? MINIMAL_ISI_HEIGHT : ISI_COLLAPSED_HEIGHT,
    });

    hasMountedRef.current = true;
  }, []);

  // If collapsed, hide lower content immediately to prevent flash of content on initial load
  useGSAP(
    () => {
      if (!lowerRef.current || !hasMountedRef.current) return;

      gsap.set(lowerRef.current, {
        autoAlpha: isOpen ? 1 : 0,
      });
    },
    { dependencies: [isOpen] },
  );

  // Animate on interaction
  useGSAP(
    () => {
      if (!upperRef.current || !hasMountedRef.current) return;

      gsap.to(upperRef.current, {
        height: minimal
          ? MINIMAL_ISI_HEIGHT
          : isOpen
            ? ISI_OPEN_HEIGHT
            : ISI_COLLAPSED_HEIGHT,
        duration: 0.45,
        ease: 'power1.out',
      });
    },
    { dependencies: [isOpen] },
  );

  return (
    <Container css={customCss}>
      <InnerContent ref={upperRef} minimal={minimal}>
        <ToggleButton type="button" onClick={handleClick} minimal={minimal}>
          <ArrowIcon src="/shared/arrow.svg" alt="Toggle ISI" isOpen={isOpen} />
        </ToggleButton>

        <UpperContent minimal={minimal}>
          <LeftColumn>
            <ISIHeading>Important Safety Information</ISIHeading>
            <ISIHeading>ISI Heading</ISIHeading>
            <ISIText>Business text</ISIText>
          </LeftColumn>

          <RightColumn>
            <ISIHeading>ISI Heading</ISIHeading>
            <ISIText>Business text</ISIText>
            <List>
              <LI>List item</LI>
              <LI>List item</LI>
            </List>
          </RightColumn>
        </UpperContent>
        <FullInfoLink show={!isOpen} />

        <CollapsedContent ref={lowerRef}>
          <ISIHeading>WARNINGS AND PRECAUTIONS</ISIHeading>
          <ISIHeadingNormal>ISI Heading Normal</ISIHeadingNormal>
          <ISIText>Business text</ISIText>

          <ISIHeading>ISI Heading</ISIHeading>
          <ISIBlackHeading>ISI Black Heading</ISIBlackHeading>
          <ISIText>Business text</ISIText>

          <ISIBlackHeading>ISI Black Heading</ISIBlackHeading>
          <ISIText>Business text</ISIText>

          <FullInfoLink show={isOpen} customCss={tw`mt-4`} />

          <FooterWrapper>
            <ISIFooterText>
              Business Inc, 123 Business Rd., Business City, NY 54321
              <br />
              ©2026 Business Inc
            </ISIFooterText>
          </FooterWrapper>
        </CollapsedContent>
      </InnerContent>
    </Container>
  );
};

type FullInfoLinkProps = CustomCssProps & {
  show: boolean;
};
/**
 * Componentized link that's always present in ISI, conditionally shown in different positions based on if opened
 */
const FullInfoLink: FC<FullInfoLinkProps> = ({ show, customCss }) => (
  <ISIHeadingNormal css={[show ? tw`block` : tw`hidden`, customCss]}>
    Please see full{' '}
    <LinkText
      href="/"
      target="_blank"
      rel="noopener noreferrer"
      data-nav="true"
    >
      Full information
    </LinkText>{' '}
    for business
  </ISIHeadingNormal>
);

const Container = tw.div`fixed bottom-0 w-full bg-transparent px-[44px] z-10`;
const InnerContent = styled.div(({ minimal }: { minimal?: boolean }) => [
  tw`relative w-full h-full mx-auto bg-[#ffffff] rounded-t-[25px] p-[34px] pb-[23px] pr-[66.5px] overflow-hidden text-black shadow-[0px 0px 25px 0px #0000000D]`,
  minimal && tw`p-[20px]`,
]);
const ToggleButton = styled.button(({ minimal }: { minimal?: boolean }) => [
  tw`absolute top-0 right-0 w-6 mt-[36.75px] mr-[33px]`,
  minimal && tw`hidden`,
]);
const ArrowIcon = styled.img(({ isOpen }: { isOpen: boolean }) => [
  tw`transition-transform duration-300`,
  isOpen ? tw`rotate-180` : tw`rotate-0`,
]);
const List = tw.ul`list-disc mt-2 ml-6`;
const LI = tw.li``;
const UpperContent = styled.div(({ minimal }: { minimal?: boolean }) => [
  tw`grid [grid-template-columns: minmax(auto, 743px) minmax(auto, 494.5px)] mb-2`,
  minimal && tw`hidden`,
]);
const LeftColumn = tw.div`border-r-2 border-solid border-gray-300 pr-2 flex flex-col justify-start items-start`;
const RightColumn = tw.div`flex flex-col pl-6`;
const ISIHeading = tw.h4`font-bold text-[17px] leading-[21.5px] uppercase text-brand-purple`;
const ISIHeadingNormal = tw(ISIHeading)`normal-case`;
const ISIBlackHeading = tw(ISIHeading)`text-black normal-case`;
const ISIText = tw.p`text-[16.75px] leading-[21.5px] font-normal text-black`;
const ISIFooterText = tw.p`text-[12.5px] leading-[15px] font-normal text-black`;
const LinkText = tw.a`underline text-brand-purple`;
const CollapsedContent = tw.div``;
const FooterWrapper = tw.div`flex justify-between items-center mt-10`;
