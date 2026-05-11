import { BrandColorProps, CustomCssProps } from '@/types/types';
import tw, { styled } from 'twin.macro';

export const Bold = styled.span<CustomCssProps>(({ customCss }) => [
  tw`font-bold`,
  customCss,
]);
export const Disclaimer = styled.p<CustomCssProps>(({ customCss }) => [
  tw`text-disclaimer_copy`,
  customCss,
]);
export const DrawerDivider = styled.hr<CustomCssProps>(({ customCss }) => [
  /* shrink-0: <hr> in SlideOutDrawer column flex can otherwise flex-shrink to 0 height */
  tw`block h-[2px] min-h-[2px] w-[90px] shrink-0 my-[38px] border-none bg-gradient-brand-orange`,
  customCss,
]);
export const DrawerHeading = styled.h2<CustomCssProps>(({ customCss }) => [
  tw`font-bold text-[50px] leading-[58px] text-brand-yellow`,
  customCss,
]);
export const H1 = styled.h1<CustomCssProps>(({ customCss }) => [
  tw`text-h1_headline text-brand-purple`,
  customCss,
]);
export const H2 = styled.h2<CustomCssProps>(({ customCss }) => [
  tw`text-h2_subhead`,
  customCss,
]);
export const H3 = styled.h3<CustomCssProps>(({ customCss }) => [
  tw`text-h3_subhead`,
  customCss,
]);
export const Li = styled.li<CustomCssProps>(({ customCss }) => [
  tw`marker:text-[70%]`,
  customCss,
]);
export const OL = styled.ol<CustomCssProps>(({ customCss }) => [
  tw`list-decimal ml-16 text-base`,
  customCss,
]);
export const P = styled.p<CustomCssProps>(({ customCss }) => [
  tw`text-base`,
  customCss,
]);
export const Sup = styled.sup<CustomCssProps>(({ customCss }) => [
  tw`text-[50%] -top-[.8em]`,
  customCss,
]);
export const UL = styled.ul<CustomCssProps>(({ customCss }) => [
  tw`list-disc ml-6 mt-2 text-base`,
  customCss,
]);
export const NoWrap = styled.span<CustomCssProps>(({ customCss }) => [
  tw`whitespace-nowrap`,
  customCss,
]);

type ResultTextProps = CustomCssProps & {
  color: BrandColorProps;
};
export const ResultText = styled.span<ResultTextProps>(
  ({ color, customCss }) => [
    tw`text-[28px] leading-[34.5px] font-bold h-[102px] flex flex-col justify-center items-center`,
    color === 'orange' && tw`text-brand-orange`,
    color === 'purple' && tw`text-brand-purple`,
    color === 'gray' && tw`text-brand-gray`,
    customCss,
  ],
);

export const GradientText = styled.span<CustomCssProps>(({ customCss }) => [
  tw`bg-gradient-brand-multi bg-clip-text text-transparent font-bold`,
  customCss,
]);
