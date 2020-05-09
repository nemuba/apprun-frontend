import React, { useRef, useEffect } from "react";
import { Row, Col, Card, FormGroup, FormLabel, Button } from "react-bootstrap";
import { Form } from "@unform/web";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { updatePositionAsync, fetchPositionsAsync } from "./../actions";
import Input from "./../../../components/commom/Input";
import MainLayout from "./../../../components/MainLayout";

const PositionEdit = () => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const { id } = useParams();
  const position = useSelector(state => state.positions);



  const handleSubmit = async (data) => {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        description: Yup.string().required("Informe oa descrição da posição"),
        score: Yup.number().typeError("Informe o score da posição").required()
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      dispatch(updatePositionAsync(id, data));

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
    dispatch(fetchPositionsAsync(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (position.length)
      formRef.current.setData({ description: position[0].description, score: position[0].score});
  }, [position, formRef]);

  return (
    <MainLayout>
      <Row className="justify-content-center" style={{ marginBottom: "100px" }}>
        <Col sm={12} lg={8} md={10}>
          <Card className="m-3">
            <Card.Header className="bg-dark text-white">
              <h3>Atualizar Posição</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit} ref={formRef}>
                <FormGroup>
                  <FormLabel>Descrição</FormLabel>
                  <Input name="description" type="text" className="form-control" />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Score</FormLabel>
                  <Input name="score" type="number" className="form-control" />
                </FormGroup>
                <FormGroup>
                  <Link to="/positions" className="btn btn-danger float-left">
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

export default PositionEdit;
