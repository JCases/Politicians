import React, { ChangeEvent } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import { fetchFile } from '../utils/request';

import { ResponseAPI } from '../shared';

import './../App.css';

interface ModalProps {
  modalShow: boolean;
  setToastShow: (value: React.SetStateAction<boolean>) => void;
  onHide: () => void;
}

const ModalUpload = (props: ModalProps) => {
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [invalid, setInvalid] = React.useState<boolean>(false);

  const uploadData = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      await fetchFile<ResponseAPI<any>>(
        'http://localhost:3000/politician/bulk',
        //`${process.env.URL_API}${process.env.PATH_BULK}`,
        formData
      );
      props.setToastShow(true);
      setLoading(false);
      props.onHide();
    } catch (e) {
      setInvalid(true);
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        show={props.modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Upload Data
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Politicians</h4>
          <p>
            Make sure your data is organized in a compatible file format such as
            CSV (Comma Separated Values). Each column should represent a
            specific data attribute, and each row should contain the
            corresponding data entries.
          </p>
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Import Politicians Data .CSV</Form.Label>
              <Form.Control
                isInvalid={invalid}
                type="file"
                disabled={loading}
                accept=".csv"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFile(e.target.files![0])
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            disabled={loading}
            onClick={() => {
              setInvalid(false);
              props.onHide();
            }}
          >
            Close
          </Button>
          <Button variant="primary" disabled={loading} onClick={uploadData}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpload;
