import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Page from 'react-page-loading';
import { Form } from '@unform/web';
import { Row, Col, Card, Button, FormGroup, FormLabel } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Input from '../../../components/commom/Input';
import Checkbox from '../../../components/commom/Checkbox';
import MainLayout from '../../../components/MainLayout';
import { updateUserAsync, fetchUserAsync } from '../actions';

const UserEdit = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.users[0]);
  const [disabled, setDisabled] = useState(false);
  const formRef = useRef(null);
  const {id} = useParams();

  useEffect(()=>{
    dispatch(fetchUserAsync(id));
  },[dispatch,id]);

  const handleSubmit = async (data, { reset }) => {
    try {
      setDisabled(true);
      const schema = Yup.object().shape({
        email: Yup.string().required("Informe o email"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await dispatch(updateUserAsync(user.id, data));
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
        <Row className="justify-content-center">
          <Col sm={12} md={8} lg={8}>
            <Card className="mt-3">
              <Card.Header className="bg-dark text-white">
                <h3>Atualizar Usuário</h3>
              </Card.Header>
              <Card.Body>
                <Form ref={formRef} onSubmit={handleSubmit}>
                  <FormGroup>
                    <FormLabel>Email</FormLabel>
                    <Input name="email" type="email" className="form-control" value={user?.email}/>
                  </FormGroup>
                  <FormGroup>
                    <FormGroup>
                      <Checkbox name="admin" type="radio" label="Administrador" checked={user?.admin}/>
                    </FormGroup>
                    <Link to="/users" className="btn btn-danger float-left">Voltar</Link>
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

export default UserEdit;