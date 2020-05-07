import React, { useEffect } from "react";
import Page from "react-page-loading";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Table } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import {showModalConfirmation} from './../../store/ducks/ModalConfirmation';
import { fetchModalitiesAsync, deleteModalitiesAsync } from "./actions";
import MainLayout from "../../components/MainLayout";
import ModalityItem from "../../components/Modality/ModalityItem";
import ModalConfirmation from './../../components/commom/Modal';

const Modalities = () => {
  const dispatch = useDispatch();
  const modalities = useSelector((state) => state.modalities);

  useEffect(() => {
    dispatch(fetchModalitiesAsync());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteModalitiesAsync(id));
  };

  const handleShowModal = (data) =>{
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
              <h3 className="float-left">Modalidades</h3>
              <Link
                to="/modality/new"
                className="btn btn-outline-secondary btn-sm float-right"
              >
                <FaPlus size={24} />
              </Link>
            </Card.Header>
            <Card.Body>
                <Table hover striped responsive>
                  <thead>
                    <tr className="font-weight-bold">
                      <td>#</td>
                      <td align="center">Gênero</td>
                      <td align="center">Número de remo</td>
                      <td align="center">Opções</td>
                    </tr>
                  </thead>
                  <tbody>
                    {modalities.length ? (
                      modalities.map((modality, index) => {
                        return (
                          <ModalityItem
                            key={index}
                            modality={modality}
                            handleShowModal={handleShowModal}
                          />
                        );
                      })
                    ) : (
                      <tr className="font-weight-bold">
                        <td colSpan="5" align="center">
                          Nenhuma modalidade cadastrada.{" "}
                          <Link to="/modality/new">Cadastrar</Link>
                        </td>
                      </tr>
                    )}
                    <tr className="font-weight-bold">
                      <td colSpan="4" align="right">
                        Total: {modalities.length}
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

export default Modalities;
