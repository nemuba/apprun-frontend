import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {goBack} from 'connected-react-router';
import Page from 'react-page-loading';
import {Form} from '@unform/web';
import {Row, Col, Card, Button, FormGroup, FormLabel} from 'react-bootstrap';
import {toast} from 'react-toastify';
import * as Yup from 'yup';
import Input from '../../../components/commom/Input';
import Image from '../../../components/commom/Image';
import MainLayout from '../../../components/MainLayout';
import {updateUserInfoAsync} from '../actions';
import {update_image_preview} from './../../../store/ducks/Auth';
import styled from 'styled-components';

const ImagePreview = styled.img`
  width: 150px;
  height: 150px;
`;

const UserInfo = () => {


  const formRef = useRef(null);
  const user = useSelector(state => state.auth.user);
  const image_preview = useSelector(state => state.auth.image_preview);

  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);

  const getBase64= (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result)
    };
    reader.onerror = function (error) {
    toast.warn({ html: 'Problema ao atualizar a foto', outDuration: 4000, classes: 'red rounded' });
    };
  }

  const encodeFile = (e) => {
    getBase64(e.target.files[0], (result) => {
      dispatch(update_image_preview(result));
    });
  }

  const handleSubmit = async (data) =>{
    try{
        setDisabled(true);
        const schema = Yup.object().shape({
        photo: Yup.mixed().required("Selecione a imagem"),
        email: Yup.string().required("Informe o email"),
        password: Yup.string().required('Informe a senha'),
        password_confirmation: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Repita a senha')
      });

      let form  = data;
      form.photo = user.photo.profile.url !== null && data.photo === null ? "" : image_preview;
      await schema.validate(form, {
        abortEarly: false,
      });

      console.log(data);
      dispatch(updateUserInfoAsync(user.id, {...form}));
      setTimeout(() => {
        setDisabled(false);
      }, 500);
    }catch(err){
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
      toast.warn("Preencha todos os campos");
      setTimeout(() => {
        setDisabled(false);
      }, 500);
    }

  }

  useEffect(()=>{
    dispatch(update_image_preview(user?.photo?.profile?.url));
  },[dispatch,user]);

  useEffect(()=>{
    setTimeout(() => {
      formRef.current.setData({email: user.email, photo: image_preview});
    }, 1000);
  }, [formRef, user, image_preview]);


  return (
    <MainLayout>
      <Page loader="bubble-spin" color="" size={8}>
        <Row
          className="justify-content-center"
          style={{ marginBottom: "100px" }}
        >
          <Col sm={12} md={8} lg={8}>
            <Card className="mt-3">
              <Card.Header className="bg-dark text-white">
                <h3>Informações do Usuário</h3>
              </Card.Header>
              <Card.Body>
                <Form ref={formRef} onSubmit={handleSubmit}>
                  <FormGroup>
                    <Row className="justify-content-center">
                      <Col lg={4}>
                        <ImagePreview
                          src={
                            image_preview
                              ? image_preview
                              : "https://via.placeholder.com/150x150.png?text=Imagem+do+Perfil"
                          }
                          className="rounded-circle"
                          alt="profile"
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Imagem do Perfil</FormLabel>
                    <Image
                      name="photo"
                      type="file"
                      className="form-control-file"
                      onChange={(value) => encodeFile(value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Email</FormLabel>
                    <Input name="email" type="email" className="form-control" />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Senha</FormLabel>
                    <Input
                      name="password"
                      type="password"
                      className="form-control"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Repita a senha</FormLabel>
                    <Input
                      name="password_confirmation"
                      type="password"
                      className="form-control"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Button
                      variant="danger"
                      className="float-left"
                      onClick={() => dispatch(goBack())}
                    >
                      Voltar
                    </Button>
                    <Button
                      variant="primary"
                      className="float-right"
                      type="submit"
                      disabled={disabled}
                    >
                      {disabled ? "Atualizando ..." : "Atualizar"}
                    </Button>
                  </FormGroup>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Page>
    </MainLayout>
  );
}

export default UserInfo;