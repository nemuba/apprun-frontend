import React, { useRef, useEffect, useState } from "react";
import { Row, Col, Card, FormGroup, FormLabel, Button } from "react-bootstrap";
import { Form } from "@unform/web";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { fetchOptionsModalityAsync } from "./../../Modalities/actions";
import { fetchOptionsRaceAsync } from "./../../Races/actions";
import { fetchOptionsPlayerAsync } from "./../../Players/actions";
import { fetchOptionsPositionsAsync } from "./../../Positions/actions";
import { updateRegistrationAsync, fetchRegistrationsAsync } from "./../actions";
import Select from "./../../../components/commom/Select";
import Input from "./../../../components/commom/Input";
import MainLayout from "./../../../components/MainLayout";

const RegistrationEdit = () => {
  const [disabled, setDisabled] = useState(false);
  const options_modalities = useSelector(state => state.modalities);
  const options_players = useSelector(state => state.players);
  const options_races = useSelector(state => state.races);
  const options_posistions = useSelector(state => state.positions);
  const registration = useSelector(state => state.registrations[0]);

  const dispatch = useDispatch();
  const formRef = useRef();
  const {id} = useParams();

  useEffect(() => {
    dispatch(fetchRegistrationsAsync(id));
    dispatch(fetchOptionsRaceAsync());
    dispatch(fetchOptionsModalityAsync());
    dispatch(fetchOptionsPlayerAsync());
    dispatch(fetchOptionsPositionsAsync());
  }, [dispatch,id]);

  const handleSubmit = async (data) => {
    try {
      setDisabled(true);
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        race_id: Yup.number().typeError("Informe a corrida"),
        modality_id: Yup.number().typeError("Informe a Modalidade"),
        player_id: Yup.number().typeError("Informe um Participante"),
        canoe: Yup.string().required("Informe a Canoa do Participante")
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      dispatch(updateRegistrationAsync(id,data));

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


  useEffect(() => {
    let race = { label: registration?.race?.local, value: registration?.race?.id};
    let modality = { label: `${registration?.modality?.genre} - ${registration?.modality?.oar} remo(s)`, value: registration?.modality?.id};
    let player = { label: registration?.player?.name, value: registration?.player?.id};
    let position = { label: registration?.position?.description, value: registration?.position?.id}

    formRef.current.setData({
      race_id: race,
      modality_id: modality,
      player_id: player,
      position_id: position,
      canoe: registration?.canoe
    });

  }, [formRef, registration]);




  const handleChangeRace = (option) => {
    if (option !== null && option.value !== null) {
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
              <h3>Atualizar Inscrição</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit} ref={formRef}>
                <FormGroup>
                  <FormLabel>Corrida</FormLabel>
                  <Select
                    placeholder="Selecione"
                    name="race_id"
                    options={options_races}
                    onChange={(e)=> handleChangeRace(e)}
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
                  <FormLabel>Classificação</FormLabel>
                  <Select
                    name="position_id"
                    options={options_posistions}
                    placeholder="Selecione"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Canoa</FormLabel>
                  <Input
                    name="canoe"
                    type="text"
                    placeholder="Nome da Canoa do Participante"
                    className="form-control"
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
                    {disabled ? 'Atualizando ...' : 'Atualizar'}
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

export default RegistrationEdit;
