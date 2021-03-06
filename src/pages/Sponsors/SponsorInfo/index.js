import React,{useEffect} from 'react';
import {Row, Col, Card, FormLabel, Table, FormGroup, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Page from 'react-page-loading';
import MainLayout from './../../../components/MainLayout';
import { Link, useParams } from 'react-router-dom';
import { FaPen, FaEye } from 'react-icons/fa';
import { fetchSponsorsAsync } from '../actions';
import { goBack } from 'connected-react-router';


const SponsorInfo = () =>{

  const dispatch = useDispatch();
  const sponsor = useSelector(state => state.sponsors[0]);
  const current_user = useSelector(state => state.auth.user);
  const {id} = useParams();

  useEffect(()=>{
    dispatch(fetchSponsorsAsync(id));
  },[dispatch,id]);

  return (
    <MainLayout>
      <Page loader="bubble-spin" color="#343A40" size={8}>
        <Row style={{ marginBottom: "100px" }}>
          <Col sm={12} lg={4} md={4}>
            <Card className="mt-3">
              <Card.Header className="bg-dark text-white">
                Informações do Patrocinador
              </Card.Header>
              <Card.Body>
                <FormGroup>
                  <FormLabel>Nome: {sponsor?.name}</FormLabel>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Telefone: {sponsor?.telephone}</FormLabel>
                </FormGroup>
              </Card.Body>
              <Card.Footer>
                <Link
                  to={`/sponsor/${sponsor?.id}/edit`}
                  className={`btn btn-success btn-block ${
                    current_user?.admin ? "" : "disabled"
                  }`}
                >
                  Editar <FaPen size={16} />
                </Link>
              </Card.Footer>
            </Card>
            <Row>
              <Col className="mt-3">
                <Button
                  variant="danger"
                  size="sm"
                  className="float-left mt-2"
                  onClick={() => dispatch(goBack())}
                >
                  Voltar
                </Button>
              </Col>
            </Row>
          </Col>
          <Col sm={12} lg={8} md={8}>
            <Card className="mt-3">
              <Card.Header className="bg-dark text-white">
                Corridas Patrocinadas
              </Card.Header>
              <Card.Body>
                <Table responsive hover striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Local</th>
                      <th>Data da corrida</th>
                      <th>Visualizar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sponsor?.races?.length ? (
                      sponsor.races.map((race, index) => (
                        <tr key={index}>
                          <td>{race.id}</td>
                          <td>{race.local}</td>
                          <td>{race.date_race}</td>
                          <td>
                            <Link
                              to={`/race/${race.id}`}
                              className="btn btn-info btn-sm"
                            >
                              <FaEye size={16} />
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} align="center">
                          Nenhuma corrida{" "}
                          <Link to="/race/new">Cadastrar corrida</Link>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Page>
    </MainLayout>
  );
}

export default SponsorInfo;