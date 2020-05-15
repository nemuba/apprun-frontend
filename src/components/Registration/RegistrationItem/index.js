import React from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { FaTrash, FaPen, FaEye } from 'react-icons/fa';

const RegistrationItem = ({registration, handleShowModal}) => {
  return (
    <tr>
      <td>{registration.id}</td>
      <td align="center">{registration.race.local}</td>
      <td align="center">{`${registration.modality.genre} - ${registration.modality.oar} remo(s)`}</td>
      <td align="center">{registration.player.name}</td>
      <td align="center">{registration.position ? registration.position.description : 'Indef.'}</td>
      <td align="center">{registration.race.date_race}</td>
      <td align="center">{registration.date_registration}</td>
      <td align="center">
        <Link
          to={`/registration/${registration.id}`}
          className="btn btn-info btn-sm mr-2"
        >
          <FaEye size={12} />
        </Link>
        <Link
          to={`/registration/${registration.id}/edit`}
          className="btn btn-success btn-sm mr-2"
        >
          <FaPen size={12} />
        </Link>
        <Button
          variant="danger"
          size="sm"
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
