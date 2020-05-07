import React, { Fragment } from 'react';
import {Container} from 'react-bootstrap';
import Header from '../Header';
import Footer from '../Footer';

const MainLayout = ({children}) => {
  return (
    <Fragment>
      <Header />
      <Container>{children}</Container>
      <Footer/>
    </Fragment>
  );
};

export default MainLayout;
