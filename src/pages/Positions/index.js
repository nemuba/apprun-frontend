import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Row, Col, Card, Table} from 'react-bootstrap';
import {FaPlus} from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux';
import {showModalConfirmation} from '../../store/ducks/ModalConfirmation';
import { fetchPositionsAsync, deletePositionAsync } from './actions';
import MainLayout from '../../components/MainLayout';
import ModalConfirmation from '../../components/commom/Modal';
import PositionItem from '../../components/Position/PositionItem';

const Positions = () =>{

  const positions = useSelector(state => state.positions);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchPositionsAsync());
  },[dispatch]);

  const handleDelete = (id) => {
    dispatch(deletePositionAsync(id));
  }

  const handleShowModal = (data) =>{
    dispatch(showModalConfirmation(data));
  }

  return(
    <MainLayout>
      <ModalConfirmation handleDelete={handleDelete} />
      <Row>
        <Col>
          <Card className="mt-3">
            <Card.Header className="bg-dark text-white">
              <h3 className="float-left">Lista de Pontuações</h3>
              <Link to="/position/new" className="btn btn-outline-secondary float-right">
                <FaPlus size={24}/>
              </Link>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th className="text-center">Descrição</th>
                    <th className="text-center">Score</th>
                    <th className="text-center">Opções</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    positions.length ?
                    positions.map((position, index) => (
                      <PositionItem key={index} position={position} handleShowModal={handleShowModal} />
                    )
                  )
                    : (
                        <tr>
                          <th colSpan="4" className="text-center">
                            Nenhuma pontuação cadastrada.{" "}
                            <Link to="/position/new">Cadastrar</Link>
                          </th>
                        </tr>
                    )
                  }
                  <tr>
                    <td colSpan="4" align="right" className="font-weight-bold">
                      Total: {positions.length}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
}

export default Positions;
