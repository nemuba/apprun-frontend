import React from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { FaTrash, FaPen } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const PositionItem = ({position, handleShowModal}) =>{

  const current_user = useSelector(state => state.auth.user);

  return(
    <tr>
      <td>{position.id}</td>
      <td align="center">{position.description}</td>
      <td align="center">{position.score}</td>
      <td align="center">
        <Link
          to={`/position/${position.id}/edit`}
          className={`btn btn-link btn-sm mr-2 ${current_user?.admin ? '' : 'disabled'}`}>
          <FaPen size={16} />
        </Link>
        <Button
          variant="link"
          size="sm"
          disabled={!current_user?.admin}
          onClick={() => {
            handleShowModal({
                              id: position.id,
                              title: "Deseja Excluir Pontução?",
                              message: "Deseja excluir realmente?"
                            })
          }}>
          <FaTrash size={16} />
        </Button>
      </td>
    </tr>
  );
}

export default React.memo(PositionItem);