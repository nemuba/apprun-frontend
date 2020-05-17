import React from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {FaTrash, FaPen, FaEye} from 'react-icons/fa';

const ModalityItem = ({modality, handleShowModal}) => {

  const current_user = useSelector(state => state.auth.user);

  return (
    <tr>
      <td>{modality.id}</td>
      <td align="center">{modality.genre}</td>
      <td align="center">{modality.oar} - remo(s)</td>
      <td align="center">
        <Link
          to={`/modality/${modality.id}`}
          className="btn btn-link btn-sm mr-2"
        >
          <FaEye size={16} />
        </Link>
        <Link
          to={`/modality/${modality.id}/edit`}
          className={`btn btn-link btn-sm mr-2 ${current_user?.admin ? '' : 'disabled'}`}
        >
          <FaPen size={16}/>
        </Link>
        <Button
          variant="link"
          size="sm"
          onClick={() => handleShowModal({id: modality.id, title: 'Excluir Modalidade?', message: 'Tem certeza que deseja excluir?'})}
          disabled={!current_user?.admin}
        >
          <FaTrash size={16} />
        </Button>
      </td>
    </tr>
  );
};

export default React.memo(ModalityItem);
