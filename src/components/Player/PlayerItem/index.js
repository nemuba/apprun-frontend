import React from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { FaTrash, FaPen, FaEye } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const PlayerItem = ({player, handleShowModal}) => {

  const current_user = useSelector(state=> state.auth.user);

  return (
    <tr>
      <td>{player.id}</td>
      <td>{player.name}</td>
      <td align="center">{player.genre}</td>
      <td align="center">{player.age} anos</td>
      <td align="center">{player.score} ponto(s)</td>
      <td align="center">
        <Link
          to={`/player/${player.id}`}
          className="btn btn-link btn-sm mr-2"
        >
          <FaEye size={16} />
        </Link>
        <Link
          to={`/player/${player.id}/edit`}
          className={`btn btn-link btn-sm mr-2 ${current_user?.admin ? '' : 'disabled'}`}
        >
          <FaPen size={16} />
        </Link>
        <Button
          variant="link"
          size="sm"
          disabled={!current_user?.admin}
          onClick={() => handleShowModal({ id: player.id , title: 'Excluir Participante?', message:'Tem certeza que deseja excluir?'})}
        >
          <FaTrash size={16} />
        </Button>
      </td>
    </tr>
  );
};

export default PlayerItem;
