import React from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { FaTrash, FaPen, FaEye } from 'react-icons/fa';

const PlayerItem = ({player, handleShowModal}) => {
  return (
    <tr>
      <td>{player.id}</td>
      <td align="center">{player.name}</td>
      <td align="center">{player.genre}</td>
      <td align="center">{player.age} anos</td>
      <td align="center">
        <Link
          to={`/player/${player.id}`}
          className="btn btn-info btn-sm mr-2"
        >
          <FaEye size={16} />
        </Link>
        <Link
          to={`/player/${player.id}/edit`}
          className="btn btn-success btn-sm mr-2"
        >
          <FaPen size={16}/>
        </Link>
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleShowModal({ id: player.id , title: 'Excluir Participante?', message:'Tem certeza que deseja excluir?'})}
        >
          <FaTrash size={16} />
        </Button>
      </td>
    </tr>
  );
};

export default PlayerItem;
