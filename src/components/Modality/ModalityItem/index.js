import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {FaTrash, FaPen, FaEye} from 'react-icons/fa';

const ModalityItem = ({modality, handleShowModal}) => {

  return (
    <tr>
      <td>{modality.id}</td>
      <td align="center">{modality.genre}</td>
      <td align="center">{modality.oar} - remo(s)</td>
      <td align="center">
        <Link
          to={`/modality/${modality.id}`}
          className="btn btn-info btn-sm mr-2"
        >
          <FaEye size={16} />
        </Link>
        <Link
          to={`/modality/${modality.id}/edit`}
          className="btn btn-success btn-sm mr-2"
        >
          <FaPen size={16}/>
        </Link>
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleShowModal({id: modality.id, title: 'Excluir Modalidade?', message: 'Tem certeza que deseja excluir?'})}
        >
          <FaTrash size={16} />
        </Button>
      </td>
    </tr>
  );
};

export default React.memo(ModalityItem);
