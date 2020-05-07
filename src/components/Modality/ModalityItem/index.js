import React from 'react';
import {Link} from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ModalityItem = ({modality, handleShowModal}) => {

  return (
    <tr>
      <td>{modality.id}</td>
      <td align="center">{modality.genre}</td>
      <td align="center">{modality.oar} - remo(s)</td>
      <td align="center">
        <Link
          to={`/modality/${modality.id}/edit`}
          className="btn btn-success btn-sm mr-2"
        >
          Editar
        </Link>
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleShowModal({id: modality.id, title: 'Excluir Modalidade?', message: 'Tem certeza que deseja excluir?'})}
        >
          Excluir
        </Button>
      </td>
    </tr>
  );
};

export default React.memo(ModalityItem);
