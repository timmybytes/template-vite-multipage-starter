import { Global } from '@emotion/react';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import React from 'react';
import { GlobalStyles as BaseStyles, css } from 'twin.macro';

const customStyles = css(css`
  body {
    font-family: 'Poppins', sans-serif;
    overflow-x: hidden;
  }
`);

const GlobalStyles = () => (
  <React.Fragment>
    <BaseStyles />
    <Global styles={customStyles} />
  </React.Fragment>
);

export default GlobalStyles;
