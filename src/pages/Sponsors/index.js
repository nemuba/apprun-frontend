import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Page from "react-page-loading";
import { Row, Col, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchSponsorsAsync, deleteSponsorsAsync } from "./actions";
import {showModalConfirmation} from './../../store/ducks/ModalConfirmation';
import SponsorItem from "../../components/Sponsor/SponsorItem";
import MainLayout from "../../components/MainLayout";
import ModalConfirmation from './../../components/commom/Modal';
import { FaPlus, FaUserTie } from "react-icons/fa";

const Sponsors = () => {
  const sponsors = useSelector((state) => state.sponsors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSponsorsAsync());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteSponsorsAsync(id));
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
                <h3 className="float-left">Patrocinadores <FaUserTie className="ml-2" size={24} /></h3>
                <Link
                  to="/sponsor/new"
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
                      <td align="center">Nome</td>
                      <td align="center">Telefone</td>
                      <td align="center">Opções</td>
                    </tr>
                  </thead>
                  <tbody>
                    {sponsors.length ? (
                      sponsors.map((sponsor, index) => (
                        <SponsorItem
                          key={index}
                          sponsor={sponsor}
                          handleShowModal={handleShowModal}
                        />
                      ))
                    ) : (
                      <tr className="font-weight-bold">
                        <td colSpan="4" align="center">
                          Nenhum patrocinador cadastrado.{" "}
                          <Link to="/sponsor/new">Cadastrar</Link>
                        </td>
                      </tr>
                    )}
                    <tr className="font-weight-bold">
                      <td colSpan="4" align="right">
                        Total: {sponsors.length}
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

export default Sponsors;
