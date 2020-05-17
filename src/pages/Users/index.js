import React, { useEffect } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import Page from "react-page-loading";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserAsync, deleteUserAsync } from "./actions";
import { showModalConfirmation } from './../../store/ducks/ModalConfirmation';
import ModalConfirmation from './../../components/commom/Modal';
import MainLayout from "../../components/MainLayout";
import { FaPlus, FaUsersCog } from "react-icons/fa";
import UserItem from './../../components/User/UserItem';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserAsync());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUserAsync(id));
  };

  const handleShowModal = (data) => {
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
                <h3 className="float-left">Usuários <FaUsersCog className="ml-2" size={24} /></h3>
                <Link
                  to="/user/new"
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
                      <td>Email</td>
                      <td>Tipo</td>
                      <td align="center">Opções</td>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length ? (
                      users.map((user, index) => {
                        return (
                          <UserItem
                          key={index}
                          user={user}
                          handleShowModal={handleShowModal}
                          />
                        );
                      })
                    ) : (
                        <tr className="font-weight-bold">
                          <td colSpan="4" align="center">
                            Nenhum usuário cadastrado.{" "}
                            <Link to="/user/new">Cadastrar</Link>
                          </td>
                        </tr>
                      )}
                    <tr className="font-weight-bold">
                      <td colSpan="4" align="right">
                        Total: {users.length}
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

export default Users;
