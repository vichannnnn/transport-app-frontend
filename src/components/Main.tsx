import { Button, Container } from '@chakra-ui/react';
import { UseDisclosureReturn } from '@chakra-ui/hooks';

interface MainProps {
  disclosure: UseDisclosureReturn;
}

export const Main: React.FC<MainProps> = ({ disclosure }) => {
  const { onOpen } = disclosure;

  return (
    <Container as="main" textAlign="center">
      <Button colorScheme="teal" size="lg" onClick={onOpen}>
        Find Shortest Path
      </Button>
    </Container>
  );
};
