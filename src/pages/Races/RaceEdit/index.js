import React, { useRef, useEffect } from 'react';
import { Row, Col, Card, FormGroup, FormLabel, Button } from 'react-bootstrap';
import { Form } from '@unform/web';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { fetchOptionsModalityAsync } from './../../Modalities/actions';
import { fetchOptionsSponsorAsync } from './../../Sponsors/actions';
import Input from './../../../components/commom/Input';
import Select from './../../../components/commom/Select';
import { updateRaceAsync, fetchRacesAsync } from './../actions';
import MainLayout from './../../../components/MainLayout';

const RaceEdit = () => {

  const modalities = useSelector(state => state.modalities);
  const sponsors = useSelector(state => state.sponsors);
  const races = useSelector(state => state.races);

  const dispatch = useDispatch();
  const formRef = useRef();
  const {id} = useParams();

  useEffect(() => {
    dispatch(fetchRacesAsync(id));
    dispatch(fetchOptionsModalityAsync());
    dispatch(fetchOptionsSponsorAsync());
  }, [dispatch,id]);

  useEffect(()=>{
    if(races.length){

    let modality = [];
    let sponsor = [];

    if(races[0].modalities.length){
      modality = races[0].modalities.map(mod => ({label: `${mod.genre} - ${mod.oar} remo(s)`, value: mod.id}));
    }

    if(races[0].sponsors.length){
      sponsor = races[0].sponsors.map(spo => ({label: spo.name, value: spo.id}));
    }

    formRef.current.setData({
      local: races[0].local,
      date_race: races[0].date_race,
      status: { label: races[0].status[0].toUpperCase() + races[0].status.slice(1) , value: races[0].status},
      modality_ids: modality,
      sponsor_ids: sponsor
    });
    }
  },[races, formRef]);


  const options_status = [{ label: 'Aberta', value: 'aberta' }, { label: 'Finalizada', value: 'finalizada' }];


  const handleSubmit = async (data) => {
    try {
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

      dispatch(updateRaceAsync(id, data));

    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
      toast.warn("Preencha todos os campos");
    }
  }

  return (
    <MainLayout>
      <Row className="justify-content-center" style={{ marginBottom: "100px" }}>
        <Col sm={12} lg={8} md={10}>
          <Card className="m-3">
            <Card.Header className="bg-dark text-white">
              <h3>Atualizar Corrida</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit} ref={formRef}>
                <FormGroup>
                  <FormLabel>Local</FormLabel>
                  <Input name="local" type="text" className="form-control"/>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Data da Corrida</FormLabel>
                  <Input
                    name="date_race"
                    type="date"
                    className="form-control"
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
                  >
                    Atualizar
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

export default RaceEdit;
