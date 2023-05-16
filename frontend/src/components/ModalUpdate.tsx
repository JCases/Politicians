import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

import { Politicians } from '../shared';

import './../App.css';

interface ModalUpdateProps {
  politician: Politicians;
  updateData: (id: string, politician: Politicians) => Promise<void>;
  modalShow: boolean;
  onHide: () => void;
}

const ModalUpdate = (props: ModalUpdateProps) => {
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
            Update Politician
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                {...(props.politician
                  ? { defaultValue: props.politician.name }
                  : {})}
                onChange={(e) => (props.politician.name = e.target.value)}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formGroup">
                  <Form.Label>Group</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter group"
                    {...(props.politician
                      ? { defaultValue: props.politician.group }
                      : {})}
                    onChange={(e) => (props.politician.group = e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formGroupFilter">
                  <Form.Label>Group Filter</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter group filter"
                    {...(props.politician
                      ? { defaultValue: props.politician.groupFilter }
                      : {})}
                    onChange={(e) =>
                      (props.politician.groupFilter = e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter gender"
                {...(props.politician
                  ? { defaultValue: props.politician.gender }
                  : {})}
                onChange={(e) => (props.politician.gender = e.target.value)}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formPosition">
                  <Form.Label>Position</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter position"
                    {...(props.politician
                      ? { defaultValue: props.politician.position }
                      : {})}
                    onChange={(e) =>
                      (props.politician.position = e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formPositionFilter">
                  <Form.Label>Position Filter</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter position filter"
                    {...(props.politician
                      ? { defaultValue: props.politician.positionFilter }
                      : {})}
                    onChange={(e) =>
                      (props.politician.positionFilter = e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formInstitution">
              <Form.Label>Institution</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter institution"
                {...(props.politician
                  ? { defaultValue: props.politician.institution }
                  : {})}
                onChange={(e) =>
                  (props.politician.institution = e.target.value)
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCCAA">
              <Form.Label>CCAA</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter CCAA"
                {...(props.politician
                  ? { defaultValue: props.politician.ccaa }
                  : {})}
                onChange={(e) => (props.politician.ccaa = e.target.value)}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBaseSalary">
                  <Form.Label>Base Salary</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter base salary"
                    {...(props.politician
                      ? { defaultValue: props.politician.baseSalary }
                      : {})}
                    onChange={(e) =>
                      (props.politician.baseSalary = Number(e.target.value))
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="formComplementarySalary"
                >
                  <Form.Label>Complementary Salary</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter complementary salary"
                    {...(props.politician
                      ? { defaultValue: props.politician.complementarySalary }
                      : {})}
                    onChange={(e) =>
                      (props.politician.complementarySalary = Number(
                        e.target.value
                      ))
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formExtraSalary">
                  <Form.Label>Extra Salary</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter extra salary"
                    {...(props.politician
                      ? { defaultValue: props.politician.extraSalary }
                      : {})}
                    onChange={(e) =>
                      (props.politician.extraSalary = Number(e.target.value))
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formSubsistenceSalary">
                  <Form.Label>Subsistence Salary</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter subsistence salary"
                    {...(props.politician
                      ? { defaultValue: props.politician.subsistenceSalary }
                      : {})}
                    onChange={(e) =>
                      (props.politician.subsistenceSalary = Number(
                        e.target.value
                      ))
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formThreeYearSalary">
                  <Form.Label>Three Year Salary</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter three year salary"
                    {...(props.politician
                      ? { defaultValue: props.politician.threeYearSalary }
                      : {})}
                    onChange={(e) =>
                      (props.politician.threeYearSalary = Number(
                        e.target.value
                      ))
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formMonthlySalary">
                  <Form.Label>Monthly Salary</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter monthly salary"
                    {...(props.politician
                      ? { defaultValue: props.politician.monthlySalary }
                      : {})}
                    onChange={(e) =>
                      (props.politician.monthlySalary = Number(e.target.value))
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formAnnualSalary">
                  <Form.Label>Annual Salary</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter annual salary"
                    {...(props.politician
                      ? { defaultValue: props.politician.annualSalary }
                      : {})}
                    onChange={(e) =>
                      (props.politician.annualSalary = Number(e.target.value))
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formNotes">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter notes"
                {...(props.politician
                  ? { defaultValue: props.politician.notes }
                  : {})}
                onChange={(e) => (props.politician.notes = e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.onHide()}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={async (e) => {
              await props.updateData(props.politician.id!, props.politician);
              props.onHide();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdate;
