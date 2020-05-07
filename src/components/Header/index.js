import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentUserAsync} from './actions';
import {Navbar, Nav, Button} from 'react-bootstrap';
import {NavLink, useLocation} from 'react-router-dom';
import {push} from 'connected-react-router';
import { FaAcquisitionsIncorporated } from "react-icons/fa";
import {logout} from '../../store/ducks/Auth';
import { logout as RemoveToken} from '../../services/auth';
import { toast } from 'react-toastify';

const Header = (props) =>{

  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getCurrentUserAsync());
  },[dispatch]);

  const handleLogout = () =>{
    dispatch(logout());
    RemoveToken();
    toast.success("Logout com sucesso !");
    dispatch(push("/login"));
  }

  const location = useLocation();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">
        <FaAcquisitionsIncorporated size={32} />
        ARCA
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavLink
            to="/"
            className={
              location.pathname === "/" ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/races"
            className={
              location.pathname === "/races" ? "nav-link active" : "nav-link"
            }
          >
            Corridas
          </NavLink>
          <NavLink
            to="/modalities"
            className={
              location.pathname === "/modalities"
                ? "nav-link active"
                : "nav-link"
            }
          >
            Modalidades
          </NavLink>
          <NavLink
            to="/sponsors"
            className={
              location.pathname === "/sponsors" ? "nav-link active" : "nav-link"
            }
          >
            Patrocinadores
          </NavLink>
          <NavLink
            to="/players"
            className={
              location.pathname === "/playes" ? "nav-link active" : "nav-link"
            }
          >
            Participantes
          </NavLink>
          <NavLink
            to="/registrations"
            className={
              location.pathname === "/registrations"
                ? "nav-link active"
                : "nav-link"
            }
          >
            Inscrições
          </NavLink>
        </Nav>
        <Nav>
          <Button variant="outline-secondary" onClick={() => handleLogout()}>
            Sair
          </Button>
          <NavLink to="/user" className="nav-link">{user.email}</NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default React.memo(Header);
