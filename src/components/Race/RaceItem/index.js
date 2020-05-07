import React from 'react';
import {Link} from 'react-router-dom';
import { Button } from 'react-bootstrap';

const RaceItem = ({race, handleShowModal}) => {
  return (
    <tr>
      <td>{race.id}</td>
      <td align="center">{race.local}</td>
      <td align="center">{race.date_race}</td>
      <td align="center">{race.status}</td>
      <td align="center">
        <ul style={{listStyle: 'none'}}>
        {race.modalities.length
          ? race.modalities
              .map((mod, index) => <li key={index}>{`${mod.genre} - ${mod.oar} remo(s)`}</li>)
          : "Nenhum"}
        </ul>
      </td>
      <td align="center">
        <ul style={{listStyle: 'none'}}>
          {race.sponsors.length
            ? race.sponsors.map((spo, index) => <li key={index}>{spo.name}</li>)
            : "Nenhum"}
        </ul>
      </td>
      <td align="center">
        <Link
          to={`/race/${race.id}/edit`}
          className="btn btn-success btn-sm mr-2"
        >
          Editar
        </Link>
        <Button
          variant="danger"
          onClick={() =>
            handleShowModal({
              id: race.id,
              title: "Excluir Corrida?",
              message: "Tem certeza que deseja Excluir?",
            })
          }
          size="sm"
        >
          Excluir
        </Button>
      </td>
    </tr>
  );
};

export default React.memo(RaceItem);
