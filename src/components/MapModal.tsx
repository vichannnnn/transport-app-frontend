import { Box, Button, Flex } from '@chakra-ui/react';
import Modal from 'react-modal';
import { Map } from './Map';
import { config } from '../config';

interface MapModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const MapModal: React.FC<MapModalProps> = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <Flex justifyContent="center" alignItems="center" height="100%">
        <Box position="relative" zIndex="1">
          <Map apiUrl={config.VITE_API_URL} />
        </Box>
        <Button position="absolute" top="1rem" right="1rem" zIndex="2" onClick={onRequestClose}>
          Close
        </Button>
      </Flex>
    </Modal>
  );
};
