import { CustomCssProps } from '@/types';
import { FC, ReactNode } from 'react';
import tw, { styled } from 'twin.macro';

export type CalloutProps = CustomCssProps & {
  /** The axis along which the border should be applied */
  borderAxis?: 'x' | 'y';
  children?: ReactNode;
};

/**
 * Callout - Orange-framed box
 */
export const Callout: FC<CalloutProps> = ({
  borderAxis = 'x',
  children,
  customCss,
}) => {
  return (
    <Container borderAxis={borderAxis} css={customCss}>
      {children}
    </Container>
  );
};

const Container = styled.div(({ borderAxis }: CalloutProps) => [
  tw`bg-white p-4 text-black relative text-base`,
  borderAxis === 'x' &&
    tw`before:(absolute top-0 left-0 w-2 h-full bg-gradient-brand-orange) after:(absolute bottom-0 right-0 w-2 h-full bg-gradient-brand-orange)`,
  borderAxis === 'y' &&
    tw`before:(absolute top-0 left-0 w-full h-2 bg-gradient-brand-orange) after:(absolute bottom-0 left-0 w-full h-2 bg-gradient-brand-orange)`,
]);
