import React, { useEffect } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import Page from "react-page-loading";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaPlus, FaShip } from "react-icons/fa";
import { fetchRacesAsync, deleteRaceAsync } from "./actions";
import {showModalConfirmation} from './../../store/ducks/ModalConfirmation';
import MainLayout from "../../components/MainLayout";
import RaceItem from "../../components/Race/RaceItem";
import ModalConfirmation from './../../components/commom/Modal';

const Races = (props) => {
  const dispatch = useDispatch();
  const races = useSelector((state) => state.races);

  useEffect(() => {
    dispatch(fetchRacesAsync());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteRaceAsync(id));
  };

  const showModal = (data) =>{
    dispatch(showModalConfirmation(data));
  }

  return (
    <MainLayout>
      <ModalConfirmation handleDelete={handleDelete} />
      <Page loader="bubble-spin" color="#343A40" size={8}>
        <Row className="justify-content-center" style={{ marginBottom: "100px" }}>
          <Col>
            <Card className="mt-3">
              <Card.Header className="bg-dark text-white">
                <h3 className="float-left">Corridas <FaShip className="ml-2" size={24}/></h3>
                <Link
                  to="/race/new"
                  className="btn btn-outline-secondary btn-sm mt-2 float-right"
                >
                  <FaPlus size={24} />
                </Link>
              </Card.Header>
              <Card.Body>
                <Table responsive hover striped>
                  <thead>
                    <tr className="font-weight-bold">
                      <td>#</td>
                      <td align="center">Local</td>
                      <td align="center">Data</td>
                      <td align="center">Status</td>
                      <td align="center">Modalidades</td>
                      <td align="center">Patrocinadores</td>
                      <td align="center">Opções</td>
                    </tr>
                  </thead>
                  <tbody>
                    {races.length ? (
                      races.map((race, index) => (
                        <RaceItem
                          key={index}
                          race={race}
                          handleShowModal={showModal}
                        />
                      ))
                    ) : (
                      <tr className="font-weight-bold">
                        <td colSpan="7" align="center">
                          Nenhuma corrida cadastrada.{" "}
                          <Link to="/race/new">Cadastrar</Link>
                        </td>
                      </tr>
                    )}
                    <tr className="font-weight-bold">
                      <td colSpan="7" align="right">
                        Total: {races.length}
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

export default Races;
