import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';


const SponsorItem = ({ sponsor, handleShowModal }) => {
  return (
    <tr>
      <td>{sponsor.id}</td>
      <td align="center">{sponsor.name}</td>
      <td align="center">{sponsor.telephone}</td>
      <td align="center">
        <Link
          to={`/sponsor/${sponsor.id}/edit`}
          className="btn btn-success btn-sm mr-2"
        >
          Editar
        </Link>
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleShowModal({
            id: sponsor.id,
            title: 'Excluir Partrocinador?',
            message: 'Tem certeza que deseja excluir?'
          })}
        >
          Excluir
        </Button>
      </td>
    </tr>
  );
};

export default React.memo(SponsorItem);
