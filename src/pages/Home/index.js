import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {push} from 'connected-react-router';
import {Row,Col, Jumbotron, Button, Card} from 'react-bootstrap';
import MainLayout from '../../components/MainLayout';
import { FaShip, FaFileAlt, FaUsers, FaEye } from 'react-icons/fa';
import { fetchDashAsync } from './actions';
import Page from 'react-page-loading';

const Home = (props) => {

  const dispatch = useDispatch();
  const dash = useSelector(state => state.dash);

  useEffect(()=>{
    dispatch(fetchDashAsync());
  },[dispatch]);

  return (
    <MainLayout>
      <Row className="mt-3">
        <Col>
          <Jumbotron className="py-5" >
            <h3>Bem vindo , AARCCA - Associação de Amigos e Remadores da Canoa Caiçara</h3>
            <p>
              Esse simples sistema foi desenvolvido para o gerenciamento das corridas em nossa associação,
              assim podendo gerenciar as corridas e as pontuações de nosso participantes.
            </p>
          </Jumbotron>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3" style={{marginBottom:'100px'}}>
        <Col lg={4}>
          <Card className="mb-3">
            <Card.Body style={{height:'125px'}}>
                <h2 className="text-center">
                  Corridas <FaShip size={24}/>
                </h2>
              <Page loader="spin" color="#343A40" size={3}>
                <h4 className="text-center text-info">
                  {dash?.total_race}
                </h4>
              </Page>
            </Card.Body>
            <Card.Footer className="text-center bg-info text-white">
              <Button variant="info" onClick={() => dispatch(push('/races'))}>
                Visualizar <FaEye size={16}/>
              </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="mb-3" >
            <Card.Body style={{ height: '125px' }}>
              <h2 className="text-center">
                Inscrições <FaFileAlt size={24} />
              </h2>
              <Page loader="spin" color="#343A40" size={3}>
              <h4 className="text-center text-info">
                {dash?.total_registrations}
              </h4>
              </Page>
            </Card.Body>
            <Card.Footer className="text-center bg-info text-white">
              <Button variant="info" onClick={() => dispatch(push('/registrations'))}>
                Visualizar <FaEye size={16} />
              </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="mb-3">
            <Card.Body style={{ height: '125px' }}>
              <h2 className="text-center">
                Participantes <FaUsers size={24} />
              </h2>
              <Page loader="spin" color="#343A40" size={3}>
              <h4 className="text-center text-info">
                {dash?.total_players}
              </h4>
              </Page>
            </Card.Body>
            <Card.Footer className="text-center bg-info text-white">
              <Button variant="info" onClick={() => dispatch(push('/players'))}>
                Visualizar <FaEye size={16} />
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Home;
