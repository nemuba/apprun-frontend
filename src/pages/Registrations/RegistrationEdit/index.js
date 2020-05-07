import React, { useRef, useEffect } from "react";
import { Row, Col, Card, FormGroup, FormLabel, Button } from "react-bootstrap";
import { Form } from "@unform/web";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { fetchOptionsModalityAsync } from "./../../Modalities/actions";
import { fetchOptionsRaceAsync } from "./../../Races/actions";
import { fetchOptionsPlayerAsync } from "./../../Players/actions";
import { updateRegistrationAsync, fetchRegistrationsAsync } from "./../actions";
import Select from "./../../../components/commom/Select";
import MainLayout from "./../../../components/MainLayout";

const RegistrationEdit = () => {
  const options_modalities = useSelector((state) => state.modalities);
  const options_players = useSelector((state) => state.players);
  const options_races = useSelector((state) => state.races);
  const registration = useSelector(state => state.registrations);

  const dispatch = useDispatch();
  const formRef = useRef();
  const {id} = useParams();

  useEffect(() => {
    dispatch(fetchRegistrationsAsync(id));
    dispatch(fetchOptionsRaceAsync());
    dispatch(fetchOptionsModalityAsync());
    dispatch(fetchOptionsPlayerAsync());
  }, [dispatch,id]);

  const handleSubmit = async (data) => {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        race_id: Yup.number().typeError("Informe a corrida"),
        modality_id: Yup.number().typeError("Informe a Modalidade"),
        player_id: Yup.number().typeError("Informe um Participante"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      dispatch(updateRegistrationAsync(id,data));

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
  };


  useEffect(() => {
    if (registration.length) {
      let race = { label: registration[0].race.local, value: registration[0].race.id};
      let modality = { label: `${registration[0].modality.genre} - ${registration[0].modality.oar} remo(s)`, value: registration[0].modality.id};
      let player = { label: registration[0].player.name, value: registration[0].player.id};
      formRef.current.setData({race_id: race, modality_id: modality, player_id: player});
    }

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

export default RegistrationEdit;
