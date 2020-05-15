import React, { useEffect } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import Page from "react-page-loading";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPlayersAsync, deletePlayerAsync } from "./actions";
import {showModalConfirmation} from './../../store/ducks/ModalConfirmation';
import ModalConfirmation from './../../components/commom/Modal';
import MainLayout from "../../components/MainLayout";
import { FaPlus, FaUsers } from "react-icons/fa";
import PlayerItem from "../../components/Player/PlayerItem";

const Players = () => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players);

  useEffect(() => {
    dispatch(fetchPlayersAsync());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deletePlayerAsync(id));
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
                <h3 className="float-left">Participantes <FaUsers className="ml-2" size={24} /></h3>
                <Link
                  to="/player/new"
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
                      <td align="center">Gênero</td>
                      <td align="center">Idade</td>
                      <td align="center">Opções</td>
                    </tr>
                  </thead>
                  <tbody>
                    {players.length ? (
                      players.map((player, index) => {
                        return (
                          <PlayerItem
                            key={index}
                            player={player}
                            handleShowModal={handleShowModal}
                          />
                        );
                      })
                    ) : (
                      <tr className="font-weight-bold">
                        <td colSpan="5" align="center">
                          Nenhum partipante cadastrado.{" "}
                          <Link to="/player/new">Cadastrar</Link>
                        </td>
                      </tr>
                    )}
                    <tr className="font-weight-bold">
                      <td colSpan="5" align="right">
                        Total: {players.length}
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

export default Players;
