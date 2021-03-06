import React, { useEffect } from 'react';
import Page from 'react-page-loading';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Card, FormGroup, FormLabel, Table, Button } from 'react-bootstrap';
import { FaEye, FaPen } from 'react-icons/fa';
import { fetchPlayersAsync } from './../actions';
import MainLayout from './../../../components/MainLayout';
import { goBack } from 'connected-react-router';

const PlayerInfo = () => {

  const dispatch = useDispatch();
  const player = useSelector(state => state.players[0]);
  const current_user = useSelector(state => state.auth.user);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchPlayersAsync(id));
  }, [dispatch, id]);

  return (
    <MainLayout>
      <Page loader="bubble-spin" color="#343A40" size={8}>
        <Row style={{ marginBottom: "100px" }}>
          <Col sm={12} lg={4} md={4}>
            <Card className="mt-3">
              <Card.Header className="bg-dark text-white">
                Informações do Participante
              </Card.Header>
              <Card.Body>
                <FormGroup>
                  <FormLabel>Nome: {player?.name}</FormLabel>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Local: {player?.local}</FormLabel>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Modalidade: {player?.genre}</FormLabel>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Idade: {player?.age}</FormLabel>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Score: {player?.score} ponto(s)</FormLabel>
                </FormGroup>
              </Card.Body>
              <Card.Footer>
                <Link
                  to={`/player/${player?.id}/edit`}
                  className={`btn btn-success btn-block ${
                    current_user?.admin ? "" : "disabled"
                  }`}
                >
                  Editar <FaPen size={16} />
                </Link>
              </Card.Footer>
            </Card>
            <Row>
              <Col>
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
                Inscrições do Participante
              </Card.Header>
              <Card.Body>
                <Table responsive hover striped>
                  <thead>
                    <tr>
                      <td>#</td>
                      <td align="center">Corrida</td>
                      <td align="center">Modalidade</td>
                      <td align="center">Canoa</td>
                      <td align="center">Data da Prova</td>
                      <td align="center">Classificação</td>
                      <td align="center">
                        <FaEye size={16} />
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {player?.registrations?.length ? (
                      player.registrations.map((registration, index) => (
                        <tr key={index}>
                          <td>{registration.id}</td>
                          <td align="center">{registration.race?.local}</td>
                          <td align="center">{registration.modality?.genre}</td>
                          <td align="center">{registration.canoe}</td>
                          <td align="center">{registration.race?.date_race}</td>
                          <td align="center">
                            {registration.position?.description}
                          </td>
                          <td align="center">
                            <Link
                              to={`/registration/${registration.id}`}
                              className="btn btn-info btn-sm"
                            >
                              <FaEye size={16} />
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" align="center">
                          Nenhuma Inscrição{" "}
                          <Link to="/registration/new">
                            Cadastrar Inscrição
                          </Link>
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
};

export default PlayerInfo;