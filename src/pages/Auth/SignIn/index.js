import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {Form} from '@unform/web';
import Page from 'react-page-loading';
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import { Row, Col, Container, Card, FormGroup, FormLabel, Button } from 'react-bootstrap';
import {loginAsyn} from './actions';
import Input from '../../../components/commom/Input';

const SignIn = (props) => {

  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async (data, {reset}) =>{
    try {
      setDisabled(true);
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required("Informe o email"),
        password: Yup.string().required("Informe a senha"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      dispatch(loginAsyn(data));
      reset();
      setTimeout(() => {
        setDisabled(false);
      }, 500);
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
      toast.warn("Preencha todos os campos");
      setDisabled(false);
    }
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
                <Form onSubmit={handleSubmit} ref={formRef}>
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
                      disabled={disabled}
                    >
                      <b>{disabled ? 'Logando ...' : 'Login'}</b>
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
