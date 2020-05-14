import React, { useEffect } from 'react';
import { Row, Col, Card, FormGroup, FormLabel, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import {FaEye, FaPen} from 'react-icons/fa';
import Page from 'react-page-loading';
import { useDispatch, useSelector } from 'react-redux';
import { fetchModalitiesAsync } from '../actions';
import MainLayout from '../../../components/MainLayout';

const ModalityInfo = () => {

  const dispatch = useDispatch();
  const modality = useSelector(state => state.modalities);
  const {id} = useParams();

  useEffect(()=>{
    dispatch(fetchModalitiesAsync(id));
  },[dispatch, id]);

  return (
    <MainLayout>
      <Page loader="bubble-spin" color="#343A40" size={8}>
        <Row style={{marginBottom: '100px'}}>
          <Col sm={12} lg={4} md={4} className="mt-3">
            <Card>
              <Card.Header className="bg-dark text-white">
                Informações da Modalidade
              </Card.Header>
              <Card.Body>
                <FormGroup>
                  <FormLabel>Gênero: {modality[0]?.genre}</FormLabel>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Número de Remos: {`${modality[0]?.oar} remo(s)`}</FormLabel>
                </FormGroup>
              </Card.Body>
              <Card.Footer>
                <Link to={`/modality/${modality[0]?.id}/edit`} className="btn btn-success btn-block">
                  Editar <FaPen size={16}/>
                </Link>
              </Card.Footer>
            </Card>
            <Row>
              <Col className="mt-3">
                <Link to="/modalities" className="btn btn-danger btn-sm">Voltar</Link>
              </Col>
            </Row>
          </Col>
          <Col sm={12} lg={8} md={8} className="mt-3">
            <Card>
              <Card.Header className="bg-dark text-white">
                Corridas relacionadas a esta modalidade
              </Card.Header>
              <Card.Body>
                <Table responsive hover striped>
                  <thead>
                    <tr>
                      <td>#</td>
                      <td align="center">Local</td>
                      <td align="center">Data da Corrida</td>
                      <td align="center">Status</td>
                      <td align="center">Visualizar</td>
                    </tr>
                  </thead>
                  <tbody>
                    { modality[0]?.races?.length ? (
                      modality[0].races.map((race,index) => (
                        <tr key={index}>
                          <td>{race.id}</td>
                          <td align="center">{race.local}</td>
                          <td align="center">{race.date_race}</td>
                          <td align="center">{race.status}</td>
                          <td align="center">
                            <Link to={`/race/${race.id}`} className="btn btn-info btn-sm">
                              <FaEye size={16} />
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" align="center">
                          Nenhuma Corrida {' '}
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

export default ModalityInfo;