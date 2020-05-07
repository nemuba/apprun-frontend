import React, { useEffect } from "react";
import Page from "react-page-loading";
import { Row, Col, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import {FaPlus} from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import {fetchRegistrationsAsync, deleteRegistrationAsync} from './actions';
import {showModalConfirmation} from './../../store/ducks/ModalConfirmation';
import ModalConfirmation from './../../components/commom/Modal';
import MainLayout from "../../components/MainLayout";
import RegistrationItem from "../../components/Registration/RegistrationItem";

const Registrations = () => {

  const dispatch = useDispatch();
  const registrations = useSelector(state => state.registrations);

  useEffect(() => {
    dispatch(fetchRegistrationsAsync());
  },[dispatch]);

  const handleDelete = (id) =>{
    dispatch(deleteRegistrationAsync(id));
  }

  const handleShowModal = (data) =>{
    dispatch(showModalConfirmation(data));
  }

  return (
    <MainLayout>
      <ModalConfirmation handleDelete={handleDelete} />
      <Page loader="bubble-spin" color="#343A40" size={8}>
        <Row
          className="justify-content-center"
          style={{ marginBottom: "100px" }}
        >
          <Col>
            <Card className="mt-3">
              <Card.Header className="bg-dark text-white">
                <h3 className="float-left">Inscrições</h3>
                <Link
                  to="/registration/new"
                  className="btn btn-outline-secondary float-right"
                >
                  <FaPlus size={24} />
                </Link>
              </Card.Header>
              <Card.Body>
                <Table hover striped responsive>
                  <thead>
                    <tr className="font-weight-bold">
                      <td>#</td>
                      <td align="center">Corrida</td>
                      <td align="center">Modalidade</td>
                      <td align="center">Participante</td>
                      <td align="center">Data da Corrida</td>
                      <td align="center">Data de incrição</td>
                      <td align="center">Opções</td>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.length ? (
                      registrations.map((registration, index) => (
                        <RegistrationItem
                          key={index}
                          registration={registration}
                          handleShowModal={handleShowModal}
                        />
                      ))
                    ) : (
                      <tr className="font-weight-bold">
                        <td colSpan="7" align="center">
                          Nenhuma Inscrição cadastrada.{" "}
                          <Link to="/registration/new">Cadastrar</Link>
                        </td>
                      </tr>
                    )}
                    <tr className="font-weight-bold">
                      <td colSpan="7" align="right">
                        Total : {registrations.length}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Page>
    </MainLayout>
  );
};

export default Registrations;
