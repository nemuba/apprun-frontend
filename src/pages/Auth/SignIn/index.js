import React from 'react';
import { useDispatch } from 'react-redux';
import {Form} from '@unform/web';
import Page from 'react-page-loading';
import { Row, Col, Container, Card, FormGroup, FormLabel, Button } from 'react-bootstrap';
import {loginAsyn} from './actions';
import Input from '../../../components/commom/Input';

const SignIn = (props) => {

  const dispatch = useDispatch();

  const handleSubmit = (data, {reset}) =>{
      dispatch(loginAsyn(data));
      reset();
  }

  return (
    <Page loader="bubble-spin" color="#343A40" size={8}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} sm={12} lg={5}>
            <Card style={{ marginTop: "130px" }} className="shadow-lg rounded">
              <Card.Header className="bg-dark text-white">
                <h3>AARCA - Login</h3>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit} >
                  <FormGroup>
                    <FormLabel>Email</FormLabel>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email"
                      autoComplete="username"
                      className="form-control"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Senha</FormLabel>
                    <Input
                      name="password"
                      type="password"
                      placeholder="Senha"
                      autoComplete="new-password"
                      className="form-control"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Button
                      type="submit"
                      variant="secondary"
                      block
                      className="py-2"
                    >
                      <b>Login</b>
                    </Button>
                  </FormGroup>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Page>
  );
};

export default SignIn;
