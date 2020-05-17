import React from 'react';
import { Row, Container } from 'react-bootstrap';

// import { Container } from './styles';

const Footer = () => {
  return (
    <footer className="footer py-3 bg-dark fixed-bottom">
      <Container className="bg-dark text-white">
        <Row className="justify-content-center">
          <span>
            AARCCA  &copy;
            {new Intl.DateTimeFormat("default", { year: "numeric" }).format( new Date())}
            - Desenvolvido por
            <a href="https://github.com/nemuba" target="blank" className="text-white">
              {" "} Alef Ojeda de Oliveira
            </a>.
          </span>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
