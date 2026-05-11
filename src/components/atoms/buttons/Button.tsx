import { CustomCssProps } from '@/types/types';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import tw from 'twin.macro';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  CustomCssProps & {
    children: ReactNode;
  };

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return <BasicButton {...props}>{children}</BasicButton>;
};

const BasicButton = tw.button`flex items-center justify-center p-4 bg-brand-purple rounded`;
