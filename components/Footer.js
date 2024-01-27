import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <div className="container">
        <p className="mb-0">
          &copy; {currentYear} <Link href="https://github.com/GeovaneDev" passHref className="text-white text-decoration-none">GeovaneDev</Link>. <a href="https://github.com/GeovaneDev/BrInvestAPI/blob/main/LICENSE">Licença MIT</a>
        </p>
        <div className="mt-2">
          <Link href="/terms" passHref className="text-white text-decoration-none">Termos de Serviço</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
