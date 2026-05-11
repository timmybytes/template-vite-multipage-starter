import { CustomCssProps } from '@/types';
import { FC, ReactNode } from 'react';
import tw, { css, styled } from 'twin.macro';

export type TwoUpProps = CustomCssProps & {
  columnWidths?: [string, string];
  children?: ReactNode;
};

/**
 * TwoUp - Two-column wrapper
 */
export const TwoUp: FC<TwoUpProps> = ({
  columnWidths = ['1fr', '1fr'],
  customCss,
  children,
}) => {
  return (
    <Container columnWidths={columnWidths} css={customCss}>
      {children}
    </Container>
  );
};

const Container = styled.div(({ columnWidths }: TwoUpProps) => [
  tw`grid justify-between`,
  css`
    grid-template-columns: ${columnWidths?.[0]} ${columnWidths?.[1]};
  `,
]);
