import { Box } from '@/components/atoms/Box';
import { PopupButton } from '@/components/atoms/buttons';
import { Callout } from '@/components/atoms/Callout';
import { Footnote } from '@/components/atoms/Footnote';
import { Disclaimer, H2, H3 } from '@/components/atoms/typography';
import { PageWrapper } from '@/components/wrappers/PageWrapper';
import { TransitionWrapper } from '@/components/wrappers/TransitionWrapper';
import { ViewportMargins } from '@/components/wrappers/ViewportMargins';
import { navData } from '@/data/navData';
import { openPopup } from '@/stores/popupStore';
import tw from 'twin.macro';

/**
 * Home page
 */
PageWrapper({
  pageReferences: ['Name', 'Name2'],
  pageContent: (
    <ViewportMargins>
      <TransitionWrapper name="page-list">
        <p>
          This page builds to dist/index.html and will not be used in the
          project. It is only here for reference.
        </p>
        <ul tw="my-8">
          {/* Page list via navData - matches nav */}
          {navData.map((parent) => (
            <li key={parent.order}>
              {parent.link ? (
                <a
                  href={parent.link}
                  data-nav="true"
                  tw="text-brand-purple font-bold "
                >
                  {parent.name} - {parent.link}
                </a>
              ) : (
                <span tw="text-brand-purple font-bold">{parent.name}</span>
              )}
              {parent.subNav && (
                <ul tw="ml-4">
                  {parent.subNav.map((sub) => (
                    <li key={sub.order}>
                      <a href={sub.link} data-nav="true" tw="text-brand-purple">
                        {sub.name}
                        <span tw="text-brand-gray">{sub.link}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </TransitionWrapper>
      <TransitionWrapper name="page-content" params={{ delay: 0.3 }}>
        <H2>Subheading</H2>
        <H3>Sub-subheading</H3>
        <PopupButton
          customCss={tw`relative mx-0 my-4 left-0 rounded-full`}
          onClick={() =>
            openPopup({
              title: <span>Popup Title</span>,
              content: <div>Popup content</div>,
            })
          }
        >
          Button text
        </PopupButton>
        <div css={tw`flex flex-col gap-4`}>
          <Callout borderAxis="x">A callout</Callout>
          <Callout borderAxis="y" customCss={tw`max-w-[200px]`}>
            <div css={tw`text-center`}>
              A vertical callout Lorem ipsum dolor sit amet consectetur
              adipisicing elit.
            </div>
          </Callout>
          <Box heading="A box heading">Box content goes here</Box>
          <div css={tw`flex gap-10`}>
            <Box heading="A box heading">Box content goes here</Box>
            <Box>Box content goes here</Box>
            <Box noTopBar>Box content goes here</Box>
          </div>
          <Disclaimer>Disclaimer text</Disclaimer>
          <Footnote symbol="asterisk">A footnote</Footnote>
        </div>
      </TransitionWrapper>
      <div tw="h-56"></div>
    </ViewportMargins>
  ),
});
