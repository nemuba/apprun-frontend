import React from 'react';

// import { Container } from './styles';

const Footer = () => {
  return (
    <footer className="footer py-3 bg-dark fixed-bottom">
      <div className="container bg-dark text-white">
        <span>
          AARCA - Desenvolvido por Alef O. de Oliveira com S2. &copy;
          {new Intl.DateTimeFormat("default", { year: "numeric" }).format(
            new Date()
          )}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
