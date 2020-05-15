import React, { useEffect } from 'react';
import {Row, Col, Card, FormGroup, FormLabel} from 'react-bootstrap';
import Page from 'react-page-loading';
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRegistrationsAsync} from './../actions';
import MainLayout from './../../../components/MainLayout';
import { FaEye } from 'react-icons/fa';

const RegistrationInfo = () =>{

  const dispatch = useDispatch();
  const registration = useSelector(state => state.registrations[0]);
  const {id} = useParams();

  useEffect(()=>{
    dispatch(fetchRegistrationsAsync(id));
  },[dispatch,id]);

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
                  <FormLabel>Local da corrida: {registration?.race?.local}</FormLabel>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Data da corrida: {registration?.race?.date_race}</FormLabel>
                </FormGroup>
              </Card.Body>
              <Card.Footer>
                <Link to={`/race/${registration?.race?.id}`} className="btn btn-info btn-block">
                  Visualizar <FaEye size={16}/>
                </Link>
              </Card.Footer>
            </Card>
          </Col>
          <Col sm={12} lg={4} md={4}>
            <Card className="mt-3">
              <Card.Header className="bg-dark text-white">
                Informações da Modalidade
              </Card.Header>
              <Card.Body>
                <FormGroup>
                  <FormLabel>Modalidade: {registration?.modality?.genre}</FormLabel>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Numero de Remo: {`${registration?.modality?.oar} remo(s)`}</FormLabel>
                </FormGroup>
              </Card.Body>
              <Card.Footer>
                <Link to={`/modality/${registration?.modality?.id}`} className="btn btn-info btn-block">
                  Visualizar <FaEye size={16} />
                </Link>
              </Card.Footer>
            </Card>
          </Col>
          <Col sm={12} lg={4} md={4}>
            <Card className="mt-3">
              <Card.Header className="bg-dark text-white">
                Informações do Participante
              </Card.Header>
              <Card.Body>
                <FormGroup>
                  <FormLabel>Nome: {registration?.player?.name}</FormLabel>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Idade: {registration?.player?.age}</FormLabel>
                </FormGroup>
              </Card.Body>
              <Card.Footer>
                <Link to={`/player/${registration?.player?.id}`} className="btn btn-info btn-block">
                  Visualizar <FaEye size={16} />
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col className="mt-3" style={{marginBottom: '100px'}}>
            <Link to="/registrations" className="btn btn-danger btn-sm mr-2">Voltar</Link>
            <Link to={`/registration/${registration?.id}/edit`} className="btn btn-success btn-sm">Editar</Link>
          </Col>
        </Row>
      </Page>
    </MainLayout>
  )
}

export default RegistrationInfo;