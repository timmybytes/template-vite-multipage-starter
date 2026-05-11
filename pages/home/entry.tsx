import { Background } from '@/components/atoms/Background';
import { Callout } from '@/components/atoms/Callout';
import { Sup } from '@/components/atoms/typography';
import { PageWrapper } from '@/components/wrappers/PageWrapper';
import { TransitionWrapper } from '@/components/wrappers/TransitionWrapper';
import { ViewportMargins } from '@/components/wrappers/ViewportMargins';
import tw from 'twin.macro';

/**
 * Home page
 */
PageWrapper({
  pageReferences: ['Name'],
  pageContent: (
    <div>
      <Background imageUrl="https://picsum.photos/1376/1032" />
      <ViewportMargins>
        <TransitionWrapper
          name="page-content"
          customCss={tw`flex flex-col justify-end items-end`}
        >
          <div tw="w-[486px] h-auto flex flex-col gap-2">
            <p tw="text-brand-purple text-[22px] leading-[26px]  mt-[100px] font-medium">
              Text above headline text
              <Sup>1</Sup>
            </p>
            <hr tw="w-[73px] h-[2px] bg-gradient-to-r from-brand-yellow to-brand-orange  mt-4 mb-2 border-none" />
            <p tw="text-brand-purple font-semibold text-[33px] leading-[45px] ">
              Headline text that is quite long and breaks into two lines
            </p>
            <p tw="text-brand-purple font-bold text-[70px] leading-[65px]  mb-7">
              More text
            </p>
            <p tw="text-brand-purple font-medium text-[31px] leading-[38px] text-right mr-[20px]">
              Text again
            </p>
          </div>
        </TransitionWrapper>
        <TransitionWrapper name="callout" params={{ delay: 0.3 }}>
          <Callout borderAxis="x" customCss={tw`mx-4`}>
            <p tw="text-brand-purple font-bold text-[18px] leading-[26px] text-center">
              Callout text<Sup>1</Sup>
            </p>
          </Callout>
        </TransitionWrapper>
      </ViewportMargins>
    </div>
  ),
});
