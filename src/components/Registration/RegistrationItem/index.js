import React from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const RegistrationItem = ({registration, handleShowModal}) => {
  return (
    <tr>
      <td>{registration.id}</td>
      <td align="center">{registration.race.local}</td>
      <td align="center">{`${registration.modality.genre} - ${registration.modality.oar} remo(s)`}</td>
      <td align="center">{registration.player.name}</td>
      <td align="center">{registration.race.date_race}</td>
      <td align="center">{registration.date_registration}</td>
      <td align="center">
        <Link
          to={`/registration/${registration.id}/edit`}
          className="btn btn-success btn-sm mr-2"
        >
          Editar
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
          }
        >
          Excluir
        </Button>
      </td>
    </tr>
  );
};

export default React.memo(RegistrationItem);
