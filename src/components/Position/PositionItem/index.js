import React from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const PositionItem = ({position, handleShowModal}) =>{
  return(
    <tr>
      <td>{position.id}</td>
      <td align="center">{position.description}</td>
      <td align="center">{position.score}</td>
      <td align="center">
        <Link to={`/position/${position.id}/edit`} className="btn btn-success btn-sm mr-2">
          Editar
                          </Link>
        <Button variant="danger" size="sm" onClick={() => handleShowModal({ id: position.id, title: "Deseja Excluir    Pontução?", message: "Deseja excluir realmente?"})}>
          Excluir
        </Button>
      </td>
    </tr>
  );
}

export default React.memo(PositionItem);