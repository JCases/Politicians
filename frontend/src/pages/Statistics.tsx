import React from 'react';
import { Badge, Card, Container, Tab, Table, Tabs } from 'react-bootstrap';

import { fetchGET } from '../utils/request';

import { ResponseAPI, Statistics, Politicians } from '../shared';

import './../App.css';

const StatisticsPage = () => {
  const [rows, setRows] = React.useState<Politicians[]>([]);
  const [average, setAverage] = React.useState<number>();

  const getData = React.useCallback(async () => {
    try {
      const data = await fetchGET<ResponseAPI<Statistics>>(
        'http://localhost:3000/politician/statistics/avg'
        //`${process.env.URL_API}${process.env.PATH_BULK}`,
      );

      setRows(data.data!.topSalary);
      setAverage(data.data!.medianSalary.value);
    } catch (e) {}
  }, []);

  React.useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <Container fluid className="p-5 mb-4 bg-light rounded-3">
        <Tabs
          defaultActiveKey="top"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="top" title="Top 10">
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
                </tr>
              </thead>
              <tbody>
                {rows.map((r, key) => (
                  <tr key={key}>
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
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="average" title="Average">
            <Card className="text-center">
              <Card.Header>Average Salary</Card.Header>
              <Card.Body>
                <Card.Title>Politician Avegare Salary</Card.Title>
                <Card.Text>
                  <Badge bg="secondary">{Number(average).toFixed(2)}</Badge>
                </Card.Text>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default StatisticsPage;
