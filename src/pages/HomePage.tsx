import React, { FC } from 'react';
import { Link } from 'react-router';
import tw, { css, styled } from 'twin.macro';

type HomePageProps = {
  //
};

/**
 * HomePage
 */
export const HomePage: FC<HomePageProps> = (props) => {
  return (
    <Container>
      <h1>Home Page</h1>
      <p>This is the home page</p>
      <Link to="/about">Go to About Page</Link>
    </Container>
  );
};

const Container = tw.div`w-full`;
