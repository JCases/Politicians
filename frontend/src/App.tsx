import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container, Toast, ToastContainer } from 'react-bootstrap';

import StatisticsPage from './pages/Statistics';
import HomePage from './pages/Home';

import NavbarHeader from './components/Navbar';
import ModalUpload from './components/Modal';

import './App.css';

const App = () => {
  const [modalShow, setModalShow] = React.useState<boolean>(false);
  const [toastShow, setToastShow] = React.useState<boolean>(false);

  return (
    <>
      <NavbarHeader onShow={() => setModalShow(true)} />
      <Container fluid>
        <Routes>
          <Route path="/" element={<HomePage setToastShow={setToastShow} />} />
          <Route path="statistics" element={<StatisticsPage />} />
        </Routes>
        <ToastContainer
          className="p-3"
          position="bottom-end"
          style={{ zIndex: 1 }}
        >
          <Toast
            onClose={() => setToastShow(false)}
            show={toastShow}
            delay={3000}
            bg="success"
            className="d-inline-block m-1"
            autohide
          >
            <Toast.Body className="text-white">Success request!</Toast.Body>
          </Toast>
        </ToastContainer>
      </Container>

      <ModalUpload
        modalShow={modalShow}
        setToastShow={setToastShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default App;
