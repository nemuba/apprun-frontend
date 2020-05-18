import React, {  useRef, useState } from 'react';
import {  useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Page from 'react-page-loading';
import { Form } from '@unform/web';
import { Row, Col, Card, Button, FormGroup, FormLabel } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Input from '../../../components/commom/Input';
import Checkbox from '../../../components/commom/Checkbox';
import MainLayout from '../../../components/MainLayout';
import { addUserAsync } from '../actions';

const UserNew = () => {

  const formRef = useRef(null);
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async (data, {reset}) => {
    try {
      setDisabled(true);
      const schema = Yup.object().shape({
        email: Yup.string().required("Informe o email"),
        password: Yup.string().required('Informe a senha'),
        password_confirmation: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Repita a senha')
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await dispatch(addUserAsync(data));
      reset();
      setDisabled(false);
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
      toast.warn("Preencha todos os campos");
      setTimeout(() => {
        setDisabled(false);
      }, 500);
    }

  }

  return (
    <MainLayout>
      <Page loader="bubble-spin" color="" size={8}>
        <Row className="justify-content-center" style={{marginBottom:'100px'}}>
          <Col sm={12} md={8} lg={8}>
            <Card className="mt-3">
              <Card.Header className="bg-dark text-white">
                <h3>Cadastrar Usuário</h3>
              </Card.Header>
              <Card.Body>
                <Form ref={formRef} onSubmit={handleSubmit}>
                  <FormGroup>
                    <FormLabel>Email</FormLabel>
                    <Input name="email" type="email" className="form-control" />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Senha</FormLabel>
                    <Input name="password" type="password" className="form-control" />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Repita a senha</FormLabel>
                    <Input name="password_confirmation" type="password" className="form-control" />
                  </FormGroup>
                  <FormGroup>
                  <FormGroup>
                    <Checkbox name="admin" type="radio" label="Administrador" />
                  </FormGroup>
                    <Link to="/users" className="btn btn-danger float-left">Voltar</Link>
                    <Button variant="primary" className="float-right" type="submit" disabled={disabled}>
                      {disabled ? 'Cadastrando ...' : 'Cadastrar'}
                    </Button>
                  </FormGroup>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Page>
    </MainLayout>
  );
}

export default UserNew;