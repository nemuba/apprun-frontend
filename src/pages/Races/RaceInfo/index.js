import React, {useEffect} from 'react';
import {Row, Col, Card, FormGroup, FormLabel, Table} from 'react-bootstrap';
import {FaEye, FaPen} from 'react-icons/fa';
import Page from 'react-page-loading';
import { Link, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import MainLayout from './../../../components/MainLayout';
import { fetchRacesAsync } from './../actions';


const RaceInfo = () =>{

  const dispatch = useDispatch();
  const race = useSelector(state=> state.races);
  const {id} = useParams();

  useEffect(()=>{
    dispatch(fetchRacesAsync(id));
  },[dispatch, id])

  return(
    <MainLayout>
      <Page loader="bubble-spin" color="#343A40" size={8}>
        <Row>
            <Col sm={12} lg={4} md={4}>
              <Card className="mt-3">
                <Card.Header className="bg-dark text-white">
                  Informações da Corrida
                </Card.Header>
                <Card.Body>
                  <FormGroup>
                    <FormLabel>Local da corrrida: {race[0]?.local}</FormLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Data da Corrida: {race[0]?.date_race}</FormLabel>
                  </FormGroup>
                <FormGroup>
                  <FormLabel>Status da Corrida: {race[0]?.status}</FormLabel>
                </FormGroup>
                </Card.Body>
                <Card.Footer>
                  <Link to={`/race/${race[0]?.id}/edit`} className="btn btn-success btn-block">
                    Editar <FaPen size={16} />
                  </Link>
                </Card.Footer>
              </Card>
                <Row>
                  <Col className="mt-3" style={{ marginBottom: '100px' }}>
                    <Link to="/races" className="btn btn-danger btn-sm mr-2">
                        Voltar
                    </Link>

                  </Col>
                </Row>
            </Col>
            <Col sm={12} lg={8} md={8} style={{marginBottom:'100px'}}>
              <Row>
                <Col sm={12} lg={12} md={12}>
                <Card className="mt-3">
                  <Card.Header className="bg-dark text-white">
                    Informações das Modalidades
                  </Card.Header>
                  <Card.Body>
                  <Table responsive hover striped>
                    <thead>
                      <tr>
                        <td>#</td>
                        <td align="center">Gênero</td>
                        <td align="center">Número de remo(s)</td>
                        <td align="center">Visualizar</td>
                      </tr>
                    </thead>
                    <tbody>
                      {race[0]?.modalities?.length ?
                          race[0]?.modalities.map((modality,index) => (
                          <tr key={index}>
                            <td>{modality.id}</td>
                              <td align="center">{modality.genre}</td>
                              <td align="center">{`${modality.oar} remo(s)`}</td>
                            <td align="center">
                              <Link to={`/modality/${modality.id}`} className="btn btn-info btn-sm">
                                <FaEye size={16} />
                              </Link>
                            </td>
                          </tr>
                      )) : (
                        <tr>
                          <td colSpan="4" align="center">
                            Nenhuma Modalidade {' '}
                            <Link to="/modality/new">Cadastrar modalidade</Link>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col sm={12} lg={12} md={12}>
              <Card className="mt-3">
                <Card.Header className="bg-dark text-white">
                  Informações dos Patrocinadores
                </Card.Header>
                <Card.Body>
                <Table responsive hover striped>
                  <thead>
                    <tr>
                      <td>#</td>
                      <td align="center">Nome</td>
                      <td align="center">Telefone</td>
                      <td align="center">Visualizar</td>
                    </tr>
                  </thead>
                  <tbody>
                    { race[0]?.sponsors?.length ?
                          race[0]?.sponsors.map((sponsor, index)=>(
                            <tr key={index}>
                              <td>{sponsor.id}</td>
                              <td align="center">{sponsor.name}</td>
                              <td align="center">{sponsor.telephone}</td>
                              <td align="center">
                                <Link to={`/sponsor/${sponsor.id}`} className="btn btn-info btn-sm">
                                  <FaEye size={16}/>
                                </Link>
                              </td>
                            </tr>
                          )):(
                            <tr>
                              <td colSpan="4" align="center">
                                Nenhum Patrocinador {' '}
                                <Link to="/sponsor/new">Cadastrar Patrocinador</Link>
                              </td>
                            </tr>
                          )
                    }
                  </tbody>
                </Table>
                </Card.Body>
              </Card>
              </Col>
            </Row>
          </Col>
        </Row>

      </Page>
    </MainLayout>
  );
}

export default RaceInfo;