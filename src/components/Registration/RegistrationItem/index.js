import React from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { FaTrash, FaPen, FaEye } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const RegistrationItem = ({registration, handleShowModal}) => {

  const current_user = useSelector(state => state.auth.user);

  return (
    <tr>
      <td>{registration.id}</td>
      <td>{registration.race.local}</td>
      <td>{`${registration.modality.genre} - ${registration.modality.oar} remo(s)`}</td>
      <td>{registration.player.name}</td>
      <td align="center">{registration.canoe ? registration.canoe : 'Indef.'}</td>
      <td align="center">{registration.position ? registration.position.description : 'Indef.'}</td>
      <td align="center">{registration.race.date_race}</td>
      <td align="center">
        <Link
          to={`/registration/${registration.id}`}
          className="btn btn-link btn-sm mr-2"
        >
          <FaEye size={12} />
        </Link>
        <Link
          to={`/registration/${registration.id}/edit`}
          className={`btn btn-link btn-sm mr-2 ${current_user?.admin ? '':'disabled'}`}
        >
          <FaPen size={12} />
        </Link>
        <Button
          variant="link"
          size="sm"
          disabled={!current_user?.admin}
          onClick={() =>
            handleShowModal({
              id: registration.id,
              title: "Excluir Inscrição",
              message: "Deseja realmente excluir?",
            })
        }>
          <FaTrash size={12} />
        </Button>
      </td>
    </tr>
  );
};

export default React.memo(RegistrationItem);
