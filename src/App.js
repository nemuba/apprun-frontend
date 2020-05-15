import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer, Flip } from 'react-toastify';
import { useSelector } from 'react-redux';

// Pages
import Home from './pages/Home';
import Races from './pages/Races';
import RaceNew from './pages/Races/RaceNew';
import RaceEdit from './pages/Races/RaceEdit';
import RaceInfo from './pages/Races/RaceInfo';
import Modalities from './pages/Modalities';
import ModalityNew from './pages/Modalities/ModalityNew';
import ModalityEdit from "./pages/Modalities/ModalityEdit";
import ModalityInfo from "./pages/Modalities/ModalityInfo";
import Players from "./pages/Players";
import PlayerNew from "./pages/Players/PlayerNew";
import PlayerEdit from "./pages/Players/PlayerEdit";
import PlayerInfo from './pages/Players/PlayerInfo';
import Sponsors from "./pages/Sponsors";
import SponsorNew from "./pages/Sponsors/SponsorNew";
import SponsorEdit from "./pages/Sponsors/SponsorEdit";
import SponsorInfo from './pages/Sponsors/SponsorInfo';
import Registrations from "./pages/Registrations";
import RegistrationNew from "./pages/Registrations/RegistrationNew";
import RegistrationEdit from "./pages/Registrations/RegistrationEdit";
import RegistrationInfo from "./pages/Registrations/RegistrationInfo";
import Positions from './pages/Positions';
import PositionNew from './pages/Positions/PositionNew';
import PositionEdit from './pages/Positions/PositionEdit';
import SignIn from "./pages/Auth/SignIn";
import Todo from './pages/Todo';
import UserInfo from './pages/Users/UserInfo';


const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
      }
    />
  );
};

const App = (props) => {
  return (
    <>
      <ToastContainer transition={Flip} />
      <Switch>
        <PrivateRoute exact path="/races" component={Races} />
        <PrivateRoute exact path="/race/new" component={RaceNew} />
        <PrivateRoute exact path="/race/:id/edit" component={RaceEdit} />
        <PrivateRoute exact path="/race/:id" component={RaceInfo} />
        <PrivateRoute exact path="/modalities" component={Modalities} />
        <PrivateRoute exact path="/modality/new" component={ModalityNew} />
        <PrivateRoute exact path="/modality/:id/edit" component={ModalityEdit} />
        <PrivateRoute exact path="/modality/:id" component={ModalityInfo} />
        <PrivateRoute exact path="/sponsors" component={Sponsors} />
        <PrivateRoute exact path="/sponsor/new" component={SponsorNew} />
        <PrivateRoute exact path="/sponsor/:id/edit" component={SponsorEdit} />
        <PrivateRoute exact path="/sponsor/:id" component={SponsorInfo} />
        <PrivateRoute exact path="/players" component={Players} />
        <PrivateRoute exact path="/player/new" component={PlayerNew} />
        <PrivateRoute exact path="/player/:id/edit" component={PlayerEdit} />
        <PrivateRoute exact path="/player/:id" component={PlayerInfo} />
        <PrivateRoute exact path="/registrations" component={Registrations} />
        <PrivateRoute exact path="/registration/new" component={RegistrationNew} />
        <PrivateRoute exact path="/registration/:id/edit" component={RegistrationEdit} />
        <PrivateRoute exact path="/registration/:id" component={RegistrationInfo} />
        <PrivateRoute exact path="/positions" component={Positions} />
        <PrivateRoute exact path="/position/new" component={PositionNew} />
        <PrivateRoute exact path="/position/:id/edit" component={PositionEdit} />
        <PrivateRoute exact path="/user" component={UserInfo} />
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/todo" component={Todo} />
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  );
}

export default App;
