import React, { useRef, useEffect, useState } from "react";
import { Row, Col, Card, FormGroup, FormLabel, Button } from "react-bootstrap";
import { Form } from "@unform/web";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-toastify';
import * as Yup from 'yup';
import { fetchOptionsModalityAsync } from "./../../Modalities/actions";
import { fetchOptionsRaceAsync } from "./../../Races/actions";
import { fetchOptionsPlayerAsync } from "./../../Players/actions";
import { addRegistrationAsync} from "./../actions";
import Select from "./../../../components/commom/Select";
import MainLayout from "./../../../components/MainLayout";

const RegistrationNew = () => {
  const [disabled, setDisabled] = useState(false);
  const options_modalities = useSelector((state) => state.modalities);
  const options_players = useSelector((state) => state.players);
  const options_races  = useSelector((state) => state.races);

  const dispatch = useDispatch();
  const formRef = useRef();

  useEffect(() => {
    dispatch(fetchOptionsModalityAsync());
    dispatch(fetchOptionsRaceAsync());
    dispatch(fetchOptionsPlayerAsync());
  }, [dispatch]);


  const handleSubmit = async (data, { reset }) => {
    try {
      setDisabled(true);
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        race_id: Yup.number().typeError("Informe a corrida"),
        modality_id: Yup.number().typeError("Informe a Modalidade"),
        player_id: Yup.number().typeError("Informe um Participante"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      dispatch(addRegistrationAsync(data));
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
  };

  const handleChangeRace = (option) =>{
    if(option !== null && option.value !== null){
      dispatch(fetchOptionsModalityAsync(option.value));
      formRef.current.setFieldValue('modality_id', {});
    }
  }

  return (
    <MainLayout>
      <Row className="justify-content-center" style={{ marginBottom: "100px" }}>
        <Col sm={12} lg={8} md={10}>
          <Card className="m-3">
            <Card.Header className="bg-dark text-white">
              <h3>Cadastrar Inscrição</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit} ref={formRef}>
                <FormGroup>
                  <FormLabel>Corrida</FormLabel>
                  <Select
                    placeholder="Selecione"
                    name="race_id"
                    options={options_races}
                    onChange={(e) => handleChangeRace(e)}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Modalidade</FormLabel>
                  <Select
                    name="modality_id"
                    options={options_modalities}
                    placeholder="Selecione"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Participante</FormLabel>
                  <Select
                    name="player_id"
                    options={options_players}
                    placeholder="Selecione"
                  />
                </FormGroup>
                <FormGroup>
                  <Link
                    to="/registrations"
                    className="btn btn-danger float-left"
                  >
                    Voltar
                  </Link>
                  <Button
                    variant="primary"
                    type="submit"
                    className="float-right"
                    disabled={disabled}
                  >
                    {disabled ? 'Cadastrando ...' : 'Cadastrar'}
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

export default RegistrationNew;
