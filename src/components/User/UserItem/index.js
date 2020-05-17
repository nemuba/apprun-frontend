import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaTrash, FaPen } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const UserItem = ({ user, handleShowModal }) => {

  const current_user = useSelector(state => state.auth.user);

  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.email}</td>
      <td>{user.admin ? 'Admin' : 'Nomal'}</td>
      <td align="center">
        <Link
          to={`/user/${user.id}/edit`}
          className={`btn btn-link btn-sm mr-2 ${current_user?.admin ? '' : 'disabled'}`}

        >
          <FaPen size={16} />
        </Link>
        <Button
          variant="link"
          size="sm"
          onClick={() => handleShowModal({
            id: user.id,
            title: 'Excluir Usuário?',
            message: 'Tem certeza que deseja excluir?'
          })}
          disabled={!current_user?.admin}
        >
          <FaTrash size={16} />
        </Button>
      </td>
    </tr>
  );
};

export default React.memo(UserItem);
