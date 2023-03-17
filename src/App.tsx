import { Box, Button, Container, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import { Header } from './components/Header';
import { MapModal } from './components/MapModal';
import { Main } from './components/Main';
import './App.css';


export default function App() {
  const disclosure = useDisclosure();

  return (
    <Box className="app">
      <Header />
      <Main disclosure={disclosure} />
      <MapModal isOpen={disclosure.isOpen} onRequestClose={disclosure.onClose} />
    </Box>
  );
}
