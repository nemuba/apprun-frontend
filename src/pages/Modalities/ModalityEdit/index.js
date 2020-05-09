import React, { useRef, useEffect, useState } from "react";
import { Row, Col, Card, FormGroup, FormLabel, Button } from "react-bootstrap";
import { Form } from "@unform/web";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { fetchModalitiesAsync, updateModalityAsync } from "./../actions";
import Input from "./../../../components/commom/Input";
import Select from "./../../../components/commom/Select";
import MainLayout from "./../../../components/MainLayout";

const ModalityEdit = () => {
  const modality = useSelector(state => state.modalities);
  const dispatch = useDispatch();
  const [disabled,setDisabled] = useState(false);
  const formRef = useRef();
  const {id} = useParams();

  const genres = [
    { label: "Masculino", value: "Masculino" },
    { label: "Feminino", value: "Feminino" },
  ];

  useEffect(() =>{
    if(id !== null){
      dispatch(fetchModalitiesAsync(id));
    }
  },[dispatch, id]);

  useEffect(()=>{
   if(modality.length)
    formRef.current.setData({oar: modality[0].oar, genre: {value: modality[0].genre, label: modality[0].genre}});
  },[modality]);

  const handleSubmit = async (data) => {
    try {
      setDisabled(true);
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        genre: Yup.string().required("Selecione um Gênero"),
        oar: Yup.number().typeError("Número de remos é requerido").required()
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      dispatch(updateModalityAsync(id, data));

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

  return (
    <MainLayout>
      <Row className="justify-content-center" style={{ marginBottom: "100px" }}>
        <Col sm={12} lg={8} md={10}>
          <Card className="m-3">
            <Card.Header className="bg-dark text-white">
              <h3>Atualizar Modalidade</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit} ref={formRef}>
                <FormGroup>
                  <FormLabel>Gênero</FormLabel>
                  <Select
                    name="genre"
                    options={genres}
                    placeholder="Selecione"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Número de remos</FormLabel>
                  <Input name="oar" type="number" className="form-control" />
                </FormGroup>
                <FormGroup>
                  <Link to="/modalities" className="btn btn-danger float-left">
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

export default ModalityEdit;
