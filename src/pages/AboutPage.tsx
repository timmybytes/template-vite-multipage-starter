import { FC } from 'react';
import { Link } from 'react-router';
import tw from 'twin.macro';

type AboutPageProps = {
  //
};

/**
 * AboutPage
 */
export const AboutPage: FC<AboutPageProps> = (props) => {
  return (
    <Container>
      <h1>About Page</h1>
      <p>This is the about page.</p>
      <Link to="/">Go to Home Page</Link>
    </Container>
  );
};

const Container = tw.div`w-full`;
