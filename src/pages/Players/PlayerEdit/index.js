import React, { useRef, useEffect, useState } from "react";
import { Row, Col, Card, FormGroup, FormLabel, Button } from "react-bootstrap";
import { Form } from "@unform/web";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { updatePlayerAsync, fetchPlayersAsync } from "./../actions";
import Input from "./../../../components/commom/Input";
import Select from "./../../../components/commom/Select";
import MainLayout from "./../../../components/MainLayout";

const PlayerEdit = () => {
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const formRef = useRef();
  const {id} = useParams();
  const player = useSelector(state => state.players[0]);

  const genres = [
    { label: "Masculino", value: "Masculino" },
    { label: "Feminino", value: "Feminino" },
  ];

  const handleSubmit = async (data) => {
    try {
      setDisabled(true);
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required("Informe o nome do participante"),
        local: Yup.string().required("Informe o local do participante"),
        genre: Yup.string().required("Selecione um Gênero do participante"),
        age: Yup.number().typeError("Informe a idade do participante").required()
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      dispatch(updatePlayerAsync(id,data));
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

  useEffect(()=>{
    dispatch(fetchPlayersAsync(id));
  },[dispatch,id]);

  useEffect(()=>{
    formRef.current.setData({
      name: player?.name,
      local: player?.local,
      age: player?.age,
      genre: {label: player?.genre, value: player?.genre}
    });
  },[player, formRef]);

  return (
    <MainLayout>
      <Row className="justify-content-center" style={{ marginBottom: "100px" }}>
        <Col sm={12} lg={8} md={10}>
          <Card className="m-3">
            <Card.Header className="bg-dark text-white">
              <h3>Atualizar Participante</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit} ref={formRef}>
                <FormGroup>
                  <FormLabel>Nome</FormLabel>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Nome do Participante"
                    className="form-control" />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Local</FormLabel>
                  <Input
                    name="local"
                    type="text"
                    placeholder="Local do Participante"
                    className="form-control" />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Gênero</FormLabel>
                  <Select
                    name="genre"
                    options={genres}
                    placeholder="Selecione"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Idade</FormLabel>
                  <Input
                    name="age"
                    type="number"
                    placeholder="Idade do Participante"
                    className="form-control" />
                </FormGroup>
                <FormGroup>
                  <Link to="/players" className="btn btn-danger float-left">
                    Voltar
                  </Link>
                  <Button
                    variant="primary"
                    type="submit"
                    className="float-right"
                    disabled={disabled}
                  >
                    {disabled ? 'Atualizando ...': 'Atualizar'}
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

export default PlayerEdit;
