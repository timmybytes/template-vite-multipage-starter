import tw, { styled } from 'twin.macro';

export const H1 = tw.h1`text-[96px] mb-6 [line-height: 1.15]`;
export const P = tw.p`text-[52px] mb-6 [line-height: 1.25]`;
export const OL = tw.ol`list-decimal ml-16`;
export const UL = tw.ul`list-disc ml-[4.5rem] flex flex-col gap-6`;
export const Li = tw.li`text-[52px] [line-height: 1.25]`;
export const Span40 = tw.span`text-[40px]`;
export const BoldText = tw.span`font-bold`;
export const Sup = styled.sup(() => [tw`text-[55%] font-[400]`]);
