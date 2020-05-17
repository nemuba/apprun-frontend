import React, { useEffect } from 'react';
import {Row, Col, Card, FormGroup, FormLabel} from 'react-bootstrap';
import Page from 'react-page-loading';
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRegistrationsAsync} from './../actions';
import MainLayout from './../../../components/MainLayout';
import { FaEye, FaPen } from 'react-icons/fa';

const RegistrationInfo = () =>{

  const dispatch = useDispatch();
  const registration = useSelector(state => state.registrations[0]);
  const current_user = useSelector(state => state.auth.user);
  const {id} = useParams();

  useEffect(()=>{
    dispatch(fetchRegistrationsAsync(id));
  },[dispatch,id]);

  return(
    <MainLayout>
      <Page loader="bubble-spin" color="#343A40" size={8}>
        <Row style={{marginBottom:'100px'}}>
          <Col sm={12} lg={4} md={4}>
            <Card className="mt-3">
              <Card.Header className="bg-dark text-white">
                Classificação
              </Card.Header>
              <Card.Body>
                <FormGroup>
                  <FormLabel>Posição: {registration?.position?.description}</FormLabel>
                </FormGroup>
                <FormGroup>
                  <FormLabel>pontos ganhos: {registration?.position?.score}</FormLabel>
                </FormGroup>
              </Card.Body>
              <Card.Footer>
                <Link
                  to={`/registration/${registration?.id}/edit`}
                  className={`btn btn-success btn-block ${current_user?.admin ? '' : 'disabled'}`}
                >
                  Editar <FaPen size={16} />
                </Link>
              </Card.Footer>
            </Card>
            <Row>
              <Col className="mt-3">
                <Link to={`/registrations`} className="btn btn-danger btn-sm">
                  Voltar
                </Link>
              </Col>
            </Row>
          </Col>
          <Col sm={12} lg={8} md={8}>
          <Row>
            <Col sm={12} lg={12} md={12}>
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
                  <Link to={`/race/${registration?.race?.id}`}>
                    Visualizar <FaEye size={16}/>
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm={12} lg={12} md={12}>
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
                  <Link to={`/modality/${registration?.modality?.id}`}>
                    Visualizar <FaEye size={16} />
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm={12} lg={12} md={12}>
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
                  <FormGroup>
                    <FormLabel>Score: {registration?.player?.score} ponto(s)</FormLabel>
                  </FormGroup>
                </Card.Body>
                <Card.Footer>
                  <Link to={`/player/${registration?.player?.id}`} >
                    Visualizar <FaEye size={16} />
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
          </Col>
        </Row>

      </Page>
    </MainLayout>
  )
}

export default RegistrationInfo;