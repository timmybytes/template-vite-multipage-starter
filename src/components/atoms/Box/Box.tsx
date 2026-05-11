import { CustomCssProps } from '@/types';
import { FC, ReactNode } from 'react';
import tw, { styled } from 'twin.macro';

export type BoxProps = CustomCssProps & {
  /** Optional heading rendered inside the gradient top bar */
  heading?: ReactNode;
  /** If true, the top bar of the box will not be displayed and the content will have rounded top corners */
  noTopBar?: boolean;
  /** If true, the background of the box will be transparent */
  noBG?: boolean;
  /** If true, flip the heading gradient (orange→purple instead of purple→orange) */
  flipGradient?: boolean;
  children?: ReactNode;
};

type BoxContentProps = CustomCssProps & {
  noBG?: boolean;
  noTopBar?: boolean;
  children?: ReactNode;
};

type BoxHeadingProps = CustomCssProps & {
  flipGradient?: boolean;
};

const BoxContainer = styled.div<CustomCssProps>(({ customCss }) => [
  tw`flex flex-col gap-1 w-full`,
  customCss,
]);

const BoxHeading = styled.div<BoxHeadingProps>(
  ({ customCss, flipGradient }) => [
    tw`font-bold text-white p-4 text-base text-center rounded-t-[17.5px]`,
    flipGradient
      ? tw`bg-gradient-brand-multi`
      : tw`bg-gradient-brand-multi-reverse`,
    customCss,
  ],
);

const BoxContent = styled.div<BoxContentProps>(
  ({ customCss, noBG, noTopBar }) => [
    tw`p-4 text-black`,
    !noBG && tw`bg-white`,
    noTopBar && tw`rounded-t-[17.5px]`,
    customCss,
  ],
);

/**
 * Box - Box with gradient top bar.
 *
 * For custom layouts (e.g. overriding a single corner radius, composing
 * non-standard heading markup), skip the convenience API and compose the
 * primitives directly: `<Box.Container><Box.Heading>…</Box.Heading>…</Box.Container>`.
 */
const BoxComponent: FC<BoxProps> = ({
  heading,
  noTopBar,
  noBG,
  flipGradient,
  children,
  customCss,
}) => (
  <BoxContainer customCss={customCss}>
    {!noTopBar && (
      <BoxHeading flipGradient={flipGradient}>{heading}</BoxHeading>
    )}
    <BoxContent noBG={noBG} noTopBar={noTopBar}>
      {children}
    </BoxContent>
  </BoxContainer>
);

export const Box = Object.assign(BoxComponent, {
  Container: BoxContainer,
  Heading: BoxHeading,
  Content: BoxContent,
});
