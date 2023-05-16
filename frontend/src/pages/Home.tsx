import React from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Pagination,
  Row,
  Stack,
  Table,
} from 'react-bootstrap';

import ModalUpdate from '../components/ModalUpdate';

import { fetchDELETE, fetchGET, fetchPATCH } from '../utils/request';

import { Politicians, ResponseAPI } from '../shared';

import './../App.css';

interface HomePageProps {
  setToastShow: (value: React.SetStateAction<boolean>) => void;
}

const HomePage = (props: HomePageProps) => {
  const [rows, setRows] = React.useState<Politicians[]>([]);
  const [active, setActive] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>(10);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [politicianUpdate, setPoliticianUpdate] = React.useState<Politicians>();

  const [filterType, setFilterType] = React.useState<string>();
  const [filterValue, setFilterValue] = React.useState<string>();

  const [modalShow, setModalShow] = React.useState<boolean>(false);

  const getData = React.useCallback(async () => {
    try {
      setLoading(true);
      setSize(10);
      if (filterType === 'id' && filterValue) {
        const data = await fetchGET<ResponseAPI<Politicians>>(
          `http://localhost:3000/politician/${filterValue}`
          //`${process.env.URL_API}${process.env.PATH_BULK}`,
        );
        if (data.data) setRows([data.data]);
        else setRows([]);
      } else {
        const filter = `&${filterType}=${filterValue}`;
        const data = await fetchGET<ResponseAPI<Politicians[]>>(
          `http://localhost:3000/politician?page=${active}&pageSize=${size}${
            filterType && filterValue ? filter : ''
          }`
          //`${process.env.URL_API}${process.env.PATH_BULK}`,
        );
        if (data.data) setRows(data.data);
        else setRows([]);
      }
      setLoading(false);
    } catch (e) {}
  }, [active, filterType, filterValue, size]);

  const updateData = React.useCallback(
    async (id: string, politician: Politicians) => {
      try {
        setLoading(true);
        await fetchPATCH<Politicians, ResponseAPI<any>>(
          `http://localhost:3000/politician`,
          id,
          politician
          //`${process.env.URL_API}${process.env.PATH_BULK}`,
        );

        props.setToastShow(true);

        setRows([politician, ...rows.filter((p) => p.id !== politician.id)]);
        setLoading(false);
      } catch (e) {}
    },
    [props, rows]
  );

  const deleteData = React.useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        await fetchDELETE(
          `http://localhost:3000/politician`,
          id
          //`${process.env.URL_API}${process.env.PATH_BULK}`,
        );

        setSize(size - 1);
        setRows(rows.filter((r) => r.id !== id));
        setLoading(false);
      } catch (e) {}
    },
    [rows, size]
  );

  React.useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <Container fluid className="p-5 mb-4 bg-light rounded-3">
        <Stack direction="horizontal" gap={3} className="p-4">
          <Form.Control
            className="me-auto"
            type="text"
            placeholder="Leave empty to NOT filter"
            onChange={(e) => setFilterValue(e.target.value)}
          />
          <div className="vr" />
          <Form.Select
            aria-label="Filter Options"
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option>Filter Options</option>
            <option value="id">ID</option>
            <option value="search">Name</option>
            <option value="group">Group</option>
            <option value="gender">Gender</option>
          </Form.Select>
        </Stack>
        <Table striped bordered hover responsive>
          <thead>
            <tr key="header">
              <th>Name</th>
              <th>Group</th>
              <th>Group Filter</th>
              <th>Gender</th>
              <th>Position Filter</th>
              <th>Position</th>
              <th>Institution</th>
              <th>CCAA</th>
              <th>Base Salary</th>
              <th>Complementary Salary</th>
              <th>Extra Salary</th>
              <th>Subsistence Salary</th>
              <th>Three Year Salary</th>
              <th>Monthly Salary</th>
              <th>Annual Salary</th>
              <th>Notes</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>{r.group}</td>
                <td>{r.groupFilter}</td>
                <td>{r.gender}</td>
                <td>{r.positionFilter}</td>
                <td>{r.position}</td>
                <td>{r.institution}</td>
                <td>{r.ccaa}</td>
                <td>{r.baseSalary}</td>
                <td>{r.complementarySalary}</td>
                <td>{r.extraSalary}</td>
                <td>{r.subsistenceSalary}</td>
                <td>{r.threeYearSalary}</td>
                <td>{r.monthlySalary}</td>
                <td>{r.annualSalary}</td>
                <td>{r.notes}</td>
                <td>
                  <Container>
                    <Row
                      className="justify-content-md-center align-items-md-center"
                      style={{ flexWrap: 'nowrap' }}
                    >
                      <Col>
                        <Button
                          variant="success"
                          onClick={async () => {
                            setPoliticianUpdate(r);
                            setModalShow(true);
                          }}
                        >
                          <i className="fa fa-solid fa-pen" />
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          variant="danger"
                          onClick={async () => {
                            if (!loading) await deleteData(r.id!);
                          }}
                        >
                          <i className="fa fa-solid fa-trash" />
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Container className="mt-4">
          <Pagination
            size="lg"
            className="mx-4"
            style={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <Pagination.Prev
              disabled={active === 1 || loading}
              onClick={async () => {
                if (active > 1 && !loading) {
                  setActive(active - 1);
                  await getData();
                }
              }}
            />
            <Pagination.Next
              disabled={rows.length !== size || loading}
              onClick={async () => {
                if (rows.length === size && !loading) {
                  setActive(active + 1);
                  await getData();
                }
              }}
            />
          </Pagination>
        </Container>
      </Container>
      <ModalUpdate
        politician={politicianUpdate!}
        updateData={updateData}
        modalShow={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default HomePage;
