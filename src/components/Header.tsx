import { Container, Heading } from '@chakra-ui/react';

export const Header = () => {
  return (
    <Container as="header" className="app-header" textAlign="center">
      <Heading>Welcome to My SPA</Heading>
    </Container>
  );
};
