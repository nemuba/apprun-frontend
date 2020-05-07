import React from 'react';
import {useDispatch} from 'react-redux';
import {push} from 'connected-react-router';
import {Row,Col, Jumbotron, Button} from 'react-bootstrap';
import MainLayout from '../../components/MainLayout';

const Home = (props) => {

  const dispatch = useDispatch();

  return (
    <MainLayout>
      <Row>
        <Col>
          <Jumbotron className="mt-3">
            <h1>Bem vindo , AARCA - Associação de Amigos e Remadores da Canoa Caiçara</h1>
            <p>
              Esse simples sistema foi desenvolvido para o gerenciamento das corridas em nossa associação,
              assim podendo gerenciar as corridas e as pontuações de nosso participantes.
            </p>
            <p>
              <Button variant="primary" onClick={()=> dispatch(push('/races'))}>Ver Corridas</Button>
            </p>
          </Jumbotron>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Home;
