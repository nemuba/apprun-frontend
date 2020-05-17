import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import { FaTrash, FaPen, FaEye } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const SponsorItem = ({ sponsor, handleShowModal }) => {

  const current_user = useSelector(state => state.auth.user);

  return (
    <tr>
      <td>{sponsor.id}</td>
      <td align="center">{sponsor.name}</td>
      <td align="center">{sponsor.telephone}</td>
      <td align="center">
        <Link
          to={`/sponsor/${sponsor.id}`}
          className="btn btn-link btn-sm mr-2"
        >
          <FaEye size={16} />
        </Link>
        <Link
          to={`/sponsor/${sponsor.id}/edit`}
          className={`btn btn-link btn-sm mr-2 ${current_user?.admin ? '':'disabled'}`}
        >
          <FaPen size={16} />
        </Link>
        <Button
          variant="link"
          size="sm"
          disabled={!current_user?.admin}
          onClick={() => handleShowModal({
            id: sponsor.id,
            title: 'Excluir Partrocinador?',
            message: 'Tem certeza que deseja excluir?'
          })}
        >
          <FaTrash size={16} />
        </Button>
      </td>
    </tr>
  );
};

export default React.memo(SponsorItem);
