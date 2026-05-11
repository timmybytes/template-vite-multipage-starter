import { CustomCssProps } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import tw from 'twin.macro';

gsap.registerPlugin(useGSAP);

export type PopupProps = CustomCssProps & {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children?: ReactNode;
};

export const PopupShell: FC<PopupProps> = ({
  isOpen,
  onClose,
  title,
  children,
  customCss,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [shouldRender, setShouldRender] = useState(isOpen);
  const [renderedTitle, setRenderedTitle] = useState<ReactNode>(title);
  const [renderedChildren, setRenderedChildren] = useState<ReactNode>(children);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setRenderedTitle(title);
      setRenderedChildren(children);
    }
  }, [isOpen, title, children]);

  useGSAP(() => {
    if (!shouldRender || !overlayRef.current || !popupRef.current) {
      return;
    }

    const tl = gsap.timeline();

    if (isOpen) {
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' },
      );

      tl.fromTo(
        popupRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' },
        '-=0.2',
      );
    } else {
      tl.to(popupRef.current, {
        opacity: 0,
        duration: 0,
        ease: 'power2.in',
      });

      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0,
        ease: 'power2.in',
        onComplete: () => {
          setShouldRender(false);
        },
      });
    }

    return () => {
      tl.kill();
    };
  }, [isOpen, shouldRender]);

  if (!shouldRender) {
    return null;
  }

  return (
    <Overlay ref={overlayRef} role="dialog" aria-modal="true" onClick={onClose}>
      <Content
        ref={popupRef}
        onClick={(event) => event.stopPropagation()}
        css={customCss}
      >
        <CloseButton type="button" onClick={onClose}>
          <img src="/shared/close.svg" alt="Close popup" />
        </CloseButton>

        {renderedTitle ? <PopupHeading>{renderedTitle}</PopupHeading> : null}

        {renderedChildren}
      </Content>
    </Overlay>
  );
};

const Overlay = tw.div`fixed inset-0 grid place-items-center p-6 bg-gradient-brand-purple-overlay z-20`;
const Content = tw.div`max-w-[1170px] p-6 rounded-[40px] bg-white text-black relative px-[70px] py-[53px] w-full opacity-100`;
const CloseButton = tw.button`w-[35px] h-[35px] absolute -top-14 right-0 bg-transparent`;
const PopupHeading = tw.h2`text-brand-purple text-[32.5px] leading-[45px] font-bold`;
