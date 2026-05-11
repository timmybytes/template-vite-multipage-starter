import { CustomCssProps } from '@/types';
import { FC, ReactNode } from 'react';
import tw, { styled } from 'twin.macro';

export type GrayBoxProps = CustomCssProps & {
  /** Optional heading rendered inside the gradient top bar */
  heading?: ReactNode;
  /** If true, the top bar of the box will not be displayed and the content will have rounded top corners */
  noTopBar?: boolean;
  /** If true, the background of the box will be transparent */
  noBG?: boolean;
  children?: ReactNode;
};

type GrayBoxContentProps = CustomCssProps & {
  noBG?: boolean;
  noTopBar?: boolean;
  children?: ReactNode;
};

type GrayBoxHeadingProps = CustomCssProps & {};

const GrayBoxContainer = styled.div<CustomCssProps>(({ customCss }) => [
  tw`flex flex-col gap-1 w-full`,
  customCss,
]);

const GrayBoxHeading = styled.div<GrayBoxHeadingProps>(({ customCss }) => [
  tw`bg-brand-purple-gray font-bold text-brand-purple p-4 text-base text-center leading-[130%] tracking-[10%] rounded-t-[17.5px] uppercase flex items-center justify-center`,

  customCss,
]);

const GrayBoxContent = styled.div<GrayBoxContentProps>(
  ({ customCss, noBG, noTopBar }) => [
    tw`p-4 text-black`,
    !noBG && tw`bg-white`,
    noTopBar && tw`rounded-t-[17.5px]`,
    customCss,
  ],
);

/**
 * GrayBox
 */
const GrayBoxComponent: FC<GrayBoxProps> = ({
  heading,
  noTopBar,
  noBG,
  customCss,
  children,
}) => {
  return (
    <GrayBoxContainer customCss={customCss}>
      {!noTopBar && <GrayBoxHeading>{heading}</GrayBoxHeading>}
      <GrayBoxContent noBG={noBG} noTopBar={noTopBar}>
        {children}
      </GrayBoxContent>
    </GrayBoxContainer>
  );
};

export const GrayBox = Object.assign(GrayBoxComponent, {
  Container: GrayBoxContainer,
  Heading: GrayBoxHeading,
  Content: GrayBoxContent,
});
