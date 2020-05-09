import React, { useRef, useEffect, useState } from "react";
import { Row, Col, Card, FormGroup, FormLabel, Button } from "react-bootstrap";
import { Form } from "@unform/web";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-toastify';
import * as Yup from 'yup';
import { fetchSponsorsAsync, updateSponsorAsync } from "./../actions";
import InputPhone from "./../../../components/commom/InputPhone";
import Input from "./../../../components/commom/Input";
import MainLayout from "./../../../components/MainLayout";

const SponsorEdit = () => {
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const formRef = useRef();
  const {id} = useParams();

  const sponsor = useSelector(state => state.sponsors);

  const handleSubmit = async (data) => {
    try {
      setDisabled(true);
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required("Informe o nome do patrocinador"),
        telephone: Yup.string().required("Informe o telefone do patrocinador"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      dispatch(updateSponsorAsync(id,data));

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
    dispatch(fetchSponsorsAsync(id));
  },[dispatch,id]);

  useEffect(()=>{
    if(sponsor.length)
    formRef.current.setData({name: sponsor[0].name, telephone: sponsor[0].telephone});
  },[sponsor, formRef]);


  return (
    <MainLayout>
      <Row className="justify-content-center" style={{ marginBottom: "100px" }}>
        <Col sm={12} lg={8} md={10}>
          <Card className="m-3">
            <Card.Header className="bg-dark text-white">
              <h3>Atualizar Patrocinador</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit} ref={formRef}>
                <FormGroup>
                  <FormLabel>Nome</FormLabel>
                  <Input name="name" type="text" className="form-control" />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Telefone</FormLabel>
                  <InputPhone
                    name="telephone"
                    type="text"
                    maskplaceholder="+55 (00) 90000-0000"
                    className="form-control"
                  />
                </FormGroup>
                <FormGroup>
                  <Link to="/sponsors" className="btn btn-danger float-left">
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

export default SponsorEdit;
