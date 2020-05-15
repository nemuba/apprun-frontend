import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import Page from 'react-page-loading';
import {Form} from '@unform/web';
import {Row, Col, Card, Button, FormGroup, FormLabel} from 'react-bootstrap';
import {toast} from 'react-toastify';
import * as Yup from 'yup';
import Input from '../../../components/commom/Input';
import MainLayout from '../../../components/MainLayout';
import {updateUserAsync} from '../actions';

const UserInfo = () => {

  const formRef = useRef(null);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async (data) =>{
    try{
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

      dispatch(updateUserAsync(user.id, data));
      setTimeout(() => {
        setDisabled(false);
      }, 500);
    }catch(err){
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

  useEffect(()=>{
    setTimeout(() => {
      formRef.current.setData({email: user.email});
    }, 1000);
  },[formRef,user]);


  return(
    <MainLayout>
      <Page loader="bubble-spin" color="" size={8}>
        <Row className="justify-content-center">
          <Col sm={12} md={8} lg={8}>
            <Card className="mt-3">
              <Card.Header className="bg-dark text-white">
                <h3>Informações do Usuário</h3>
              </Card.Header>
              <Card.Body>
                <Form ref={formRef} onSubmit={handleSubmit}>
                  <FormGroup>
                    <FormLabel>Email</FormLabel>
                    <Input name="email" type="email" className="form-control"/>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Senha</FormLabel>
                    <Input name="password" type="password" className="form-control"/>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Repita a senha</FormLabel>
                    <Input name="password_confirmation" type="password" className="form-control" />
                  </FormGroup>
                  <FormGroup>
                    <Link to="/" className="btn btn-danger float-left">Voltar</Link>
                    <Button variant="primary" className="float-right" type="submit" disabled={disabled}>
                     {disabled ? 'Atualizando ...' : 'Atualizar'}
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

export default UserInfo;