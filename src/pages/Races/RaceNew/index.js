import React, {useRef, useEffect, useState } from 'react';
import { Row, Col, Card, FormGroup, FormLabel, Button } from 'react-bootstrap';
import {Form} from '@unform/web';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import * as Yup from 'yup';
import {fetchOptionsModalityAsync} from './../../Modalities/actions';
import {fetchOptionsSponsorAsync} from './../../Sponsors/actions';
import Input from './../../../components/commom/Input';
import Select from './../../../components/commom/Select';
import {addRaceAsync} from './../actions';
import MainLayout from './../../../components/MainLayout';

const RaceNew = () => {
  const [disabled, setDisabled] = useState(false);
  const modalities = useSelector(state => state.modalities);
  const sponsors = useSelector(state => state.sponsors);
  const dispatch = useDispatch();
  const formRef = useRef();

  useEffect(()=> {
    dispatch(fetchOptionsModalityAsync());
    dispatch(fetchOptionsSponsorAsync());
  },[dispatch]);

  const options_status = [{label: 'Aberta', value: 'aberta'},{label: 'Finalizada', value: 'finalizada'}];


  const handleSubmit = async (data,{reset}) =>{
    try {
      setDisabled(true);
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        local: Yup.string().required("Informe o local da corrida"),
        date_race: Yup.string().required("Informe a data da Corrida"),
        modality_ids: Yup.array().required("Informe uma modalidade"),
        status: Yup.string().required("Informe o status da corrida")
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      dispatch(addRaceAsync(data));
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
    <MainLayout>
      <Row className="justify-content-center" style={{ marginBottom: "100px" }}>
        <Col sm={12} lg={8} md={10}>
          <Card className="m-3">
            <Card.Header className="bg-dark text-white">
              <h3>Cadastrar Corrida</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit} ref={formRef}>
                <FormGroup>
                  <FormLabel>Local</FormLabel>
                  <Input
                    name="local"
                    type="text"
                    placeholder="Local da corrida"
                    className="form-control" />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Data da Corrida</FormLabel>
                  <Input
                    name="date_race"
                    type="text"
                    className="form-control"
                    placeholder="dia/mês/ano"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Status</FormLabel>
                  <Select
                    placeholder="Selecione"
                    name="status"
                    options={options_status}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Modalidades</FormLabel>
                  <Select
                    name="modality_ids"
                    options={modalities}
                    isMulti
                    placeholder="Selecione"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Patrocinadores</FormLabel>
                  <Select
                    name="sponsor_ids"
                    options={sponsors}
                    isMulti
                    placeholder="Selecione"
                  />
                </FormGroup>
                <FormGroup>
                  <Link to="/races" className="btn btn-danger float-left">
                    Voltar
                  </Link>
                  <Button
                    variant="primary"
                    type="submit"
                    className="float-right"
                    disabled={disabled}
                  >
                    {disabled ? 'Cadastrando ...' :'Cadastrar'}
                  </Button>
                </FormGroup>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default RaceNew;
