import React, { useEffect } from 'react';
import Page from 'react-page-loading';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Card, FormGroup, FormLabel, Table } from 'react-bootstrap';
import { FaEye, FaPen } from 'react-icons/fa';
import { fetchPlayersAsync } from './../actions';
import MainLayout from './../../../components/MainLayout';

const PlayerInfo = () => {

  const dispatch = useDispatch();
  const player = useSelector(state => state.players);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchPlayersAsync(id));
  }, [dispatch, id]);

  return (
    <MainLayout>
      <Page loader="bubble-spin" color="#343A40" size={8}>
        <Row style={{marginBottom:'100px'}}>
          <Col sm={12} lg={4} md={4}>
            <Card className="mt-3">
              <Card.Header className="bg-dark text-white">
                Informações do Participante
            </Card.Header>
              <Card.Body>
                <FormGroup>
                  <FormLabel>Nome: {player[0]?.name}</FormLabel>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Modalidade: {player[0]?.genre}</FormLabel>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Idade: {player[0]?.age}</FormLabel>
                </FormGroup>
              </Card.Body>
              <Card.Footer>
                <Link to={`/player/${player[0]?.id}/edit`} className="btn btn-success btn-block">
                  Editar <FaPen size={16} />
                </Link>
              </Card.Footer>
            </Card>
            <Row>
              <Col>
                <Link to="/players" className="btn btn-danger btn-sm mt-3">Voltar</Link>
              </Col>
            </Row>
          </Col>
          <Col sm={12} lg={8} md={8}>
            <Card className="mt-3">
              <Card.Header className="bg-dark text-white">
                Inscrições do Participante
            </Card.Header>
              <Card.Body>
                <Table responsive hover striped>
                  <thead>
                    <tr>
                      <td>#</td>
                      <td align="center">Corrida</td>
                      <td align="center">Modalidade</td>
                      <td align="center">Data da Prova</td>
                      <td align="center">Data de Inscrição</td>
                      <td align="center">Visualizar</td>
                    </tr>
                  </thead>
                  <tbody>
                    {player[0]?.registrations?.length ?
                      (player[0].registrations.map((registration, index) => (
                        <tr key={index}>
                          <td>{registration.id}</td>
                          <td align="center">{registration.race?.local}</td>
                          <td align="center">{registration.modality?.genre}</td>
                          <td align="center">{registration.race?.date_race}</td>
                          <td align="center">{registration.date_registration}</td>
                          <td align="center">
                            <Link to={`/registration/${registration.id}`} className="btn btn-info btn-sm">
                              <FaEye size={16} />
                            </Link>
                          </td>
                        </tr>
                      ))
                      ) : (
                        <tr>
                          <td colSpan="6" align="center">
                            Nenhuma Inscrição {' '}
                            <Link to="/registration/new">Cadastrar Inscrição</Link>
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
  )
};

export default PlayerInfo;