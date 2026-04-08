import { css as cssImport, Theme } from '@emotion/react';
import { CSSInterpolation, CSSObject } from '@emotion/serialize';
import styledImport, { StyledComponent } from '@emotion/styled';
import {
  DetailedHTMLProps,
  ElementType,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  SVGAttributes,
} from 'react';
import 'twin.macro';

/** Convenience alias for customCss props */
export type TwinCSS = CSSInterpolation;
/** Convenience alias for a custom `style` prop that will be used in twin css */
export type TwinStyleObject = CSSObject; // Formerly ObjectInterpolation<undefined>;

/** Convenience alias for a styled.div, or you can pass in an element type */
export type TwinStyledComponent<T = HTMLDivElement> = StyledComponent<
  {
    theme?: Theme | undefined;
    as?: ElementType<T> | undefined;
  },
  DetailedHTMLProps<HTMLAttributes<T>, T>,
  {}
>;
/**
 * Convenience type mix-in for customCss props
 *
 * Additional styles in any Twin format (css, tw, style object, array)
 * */
export type CustomCssProps = {
  customCss?: TwinCSS;
};

/** Component has one or more children and `customCss` */
export type ChildrenAndCustomCssProps = CustomCssProps & {
  children: ReactNode;
};

/** Component has one or more children */
export type ChildrenProps = {
  children: ReactNode;
};

/** Component children must be exactly one element */
export type OneChildProps = {
  children: ReactElement;
};

/** Component optionally accepts children */
export type OptionalChildrenProps = {
  children?: ReactNode;
};

/** SVGs turned into components */
export type CustomSVGProps = CustomCssProps & SVGAttributes<SVGElement>;
