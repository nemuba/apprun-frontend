import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentUserAsync} from './actions';
import { Navbar, Nav, NavDropdown,Button} from 'react-bootstrap';
import {NavLink, useLocation} from 'react-router-dom';
import {push} from 'connected-react-router';
import {
  FaAcquisitionsIncorporated,
  FaPen,
  FaSignOutAlt,
  FaVenusMars,
  FaTrophy,
  FaUsers,
  FaUserTie,
  FaFileAlt,
  FaShip } from "react-icons/fa";
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
          <NavDropdown title="Gerenciar" id="collasible-nav-dropdown">
            <NavLink
              to="/races"
              className={
                location.pathname === "/races" ? "dropdown-item active" : "dropdown-item"
              }
            >
              Corridas <FaShip className="float-right mt-2" size={12}/>
            </NavLink>
            <NavLink
              to="/modalities"
              className={
                location.pathname === "/modalities"
                  ? "dropdown-item active"
                  : "dropdown-item"
              }
            >
              Modalidades  <FaVenusMars className="float-right mt-2" size={12} />
            </NavLink>
            <NavLink
              to="/positions"
              className={
                location.pathname === "/positions"
                  ? "dropdown-item active"
                  : "dropdown-item"
              }
            >
              Posições  <FaTrophy className="float-right mt-2" size={12} />
            </NavLink>
            <NavLink
              to="/sponsors"
              className={
                location.pathname === "/sponsors" ? "dropdown-item active" : "dropdown-item"
              }
            >
              Patrocinadores  <FaUserTie className="ml-3" size={12} />
            </NavLink>
            <NavLink
              to="/players"
              className={
                location.pathname === "/playes" ? "dropdown-item active" : "dropdown-item"
              }
            >
              Participantes  <FaUsers className="float-right mt-2" size={12} />
            </NavLink>
            <NavLink
              to="/registrations"
              className={
                location.pathname === "/registrations"
                  ? "dropdown-item active"
                  : "dropdown-item"
              }
            >
              Inscrições  <FaFileAlt className="float-right mt-2" size={12} />
            </NavLink>
          </NavDropdown>
        </Nav>
        <Nav>

          <NavDropdown title={user.email} id="collasible-nav-dropdown">
            <NavLink to="/user" className="dropdown-item">
              Editar <FaPen className="float-right" size={12} />
            </NavLink>
            <Button variant="outline-secondary" onClick={() => handleLogout()} className="dropdown-item">
              Sair <FaSignOutAlt className="float-right" size={12} />
            </Button>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default React.memo(Header);
