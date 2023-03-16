import { Map } from './components/Map';
import { config } from './config';
import React, { useState } from 'react';
import Modal from 'react-modal';
import './App.css';

export default function App() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Welcome to My SPA</h1>
      </header>
      <main className="app-main">
        <button className="open-modal-btn" onClick={handleOpenModal}>
          Render Component in Pop-up
        </button>
        <Modal
          isOpen={showModal}
          onRequestClose={handleCloseModal}
          className="modal"
          overlayClassName="modal-overlay"
        >
          <button className="close-modal-btn" onClick={handleCloseModal}>
            Close
          </button>
          <div className="modal-content">
            <Map apiUrl={config.VITE_API_URL} />
          </div>
        </Modal>
      </main>
    </div>
  );
}
