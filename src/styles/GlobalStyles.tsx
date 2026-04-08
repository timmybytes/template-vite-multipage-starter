import { Global } from '@emotion/react';
import React from 'react';
import tw, { GlobalStyles as BaseStyles, css, theme } from 'twin.macro';

const customStyles = css({
  h1: {
    ...tw`text-7xl text-purple-400`,
  },
  a: {
    ...tw`text-purple-400 hover:text-purple-700 transition-colors duration-200`,
  },
});

const GlobalStyles = () => (
  <React.Fragment>
    <BaseStyles />
    <Global styles={customStyles} />
  </React.Fragment>
);

export default GlobalStyles;
