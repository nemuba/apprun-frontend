import React, { useRef, useState } from "react";
import { Row, Col, Card, FormGroup, FormLabel, Button } from "react-bootstrap";
import { Form } from "@unform/web";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { addPositionAsync } from "./../actions";
import Input from "./../../../components/commom/Input";
import MainLayout from "./../../../components/MainLayout";

const PositionNew = () => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const [disabled, setDisabled] = useState(false);


  const handleSubmit = async (data, { reset }) => {
    try {
      setDisabled(true);
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        description: Yup.string().required("Informe a descrição da posição"),
        score: Yup.number().typeError("Informe o valor da posição").required()
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      dispatch(addPositionAsync(data));
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

  return (
    <MainLayout>
      <Row className="justify-content-center" style={{ marginBottom: "100px" }}>
        <Col sm={12} lg={8} md={10}>
          <Card className="m-3">
            <Card.Header className="bg-dark text-white">
              <h3>Cadastrar Posição</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit} ref={formRef}>
                <FormGroup>
                  <FormLabel>Descrição</FormLabel>
                  <Input name="description" type="text" className="form-control" />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Score</FormLabel>
                  <Input name="score" type="number" className="form-control"/>
                </FormGroup>
                <FormGroup>
                  <Link to="/positions" className="btn btn-danger float-left">
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

export default PositionNew;
