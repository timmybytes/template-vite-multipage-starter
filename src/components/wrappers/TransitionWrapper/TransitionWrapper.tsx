import { CustomCssProps } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';

gsap.registerPlugin(useGSAP);

type TransitionWrapperProps = CustomCssProps & {
  name: string;
  children: React.ReactNode;
  /** GSAP tween parameters to customize animation */
  params?: gsap.TweenVars;
};

export const TransitionWrapper: React.FC<TransitionWrapperProps> = ({
  name,
  children,
  params,
  customCss,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (ref.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ref.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.75, delay: 0.15, ...params },
        );
      });
      return () => ctx.revert({});
    }
  }, [name]);
  return (
    <div ref={ref} css={customCss}>
      {children}
    </div>
  );
};
