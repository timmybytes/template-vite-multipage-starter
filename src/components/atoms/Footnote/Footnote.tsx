import { CustomCssProps } from '@/types';
import { FC, ReactNode } from 'react';
import tw, { css, styled } from 'twin.macro';

type FootnoteSymbol =
  | 'asterisk'
  | 'dagger'
  | 'doubleDagger'
  | 'section'
  | 'pilcrow'
  | 'doubleVerticalLine';

type FootnoteProps = CustomCssProps & {
  symbol?: FootnoteSymbol;
  children: ReactNode;
};

const symbols: Record<FootnoteSymbol, string> = {
  asterisk: '*',
  dagger: '†',
  doubleDagger: '‡',
  section: '§',
  pilcrow: '¶',
  doubleVerticalLine: '‖',
};

const FootnoteContainer = styled.div(() => [
  tw`flex relative text-disclaimer_copy`,
  css`
    sup {
      font-size: 68%;
      position: relative;
      top: -0.6em;
    }
  `,
]);
const Symbol = styled.span(({ symbol }: { symbol?: FootnoteSymbol }) => [
  tw`text-disclaimer_copy absolute`,
  symbol !== 'asterisk'
    ? tw`text-[7px] -left-[4px]`
    : tw`top-[1px] -left-[5px] text-[10px]`, // Compensate for larger asterisk size
]);
const ChildContainer = tw.div``;

/** -----------------------------------------------------------------
 * Footnote component with "hanging" symbol to the left
 *  --------------------------------------------------------------- */
export const Footnote: FC<FootnoteProps> = ({
  symbol,
  children,
  customCss,
}) => {
  return (
    <FootnoteContainer css={[customCss]}>
      <Symbol symbol={symbol}>{symbol ? symbols[symbol] : null}</Symbol>
      <ChildContainer>{children}</ChildContainer>
    </FootnoteContainer>
  );
};
