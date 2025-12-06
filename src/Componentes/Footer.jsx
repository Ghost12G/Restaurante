import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-white mt-3">
      <div className="container p-4">
        <div className="row">

          {/* 🏠 Información del Restaurante */}
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase fw-bold">Nuestro Restaurante</h5>
            <p>
              Disfruta de la mejor experiencia gastronómica, con platos únicos y un ambiente acogedor. ¡Te esperamos siempre!
            </p>
            <div className="d-flex gap-3 mt-3">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
                aria-label="Facebook"
              >
                <img src="iconos/facebook.svg" alt="Facebook" width="30" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
                aria-label="Instagram"
              >
                <img src="iconos/instagram.svg" alt="Instagram" width="30" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
                aria-label="Twitter"
              >
                <img src="iconos/twitter.svg" alt="Twitter" width="30" />
              </a>
            </div>
          </div>

          {/* 📞 Contáctanos */}
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0 text-center">
            <h5 className="text-uppercase fw-bold">Contáctanos</h5>
            <p>
              <img
                src="iconos/geo-alt.svg"
                alt="Ubicación"
                width="20"
                className="me-2"
              />
              Av. Principal 123 - Lima, Perú
            </p>
            <p>
              <img
                src="iconos/telephone.svg"
                alt="Teléfono"
                width="20"
                className="me-2"
              />
              +51 999 888 777
            </p>
            <p>
              <img
                src="iconos/envelope.svg"
                alt="Email"
                width="20"
                className="me-2"
              />
              info@restaurante.com
            </p>
          </div>

        </div>
      </div>

      {/* 📝 Derechos reservados */}
      <div className="text-center p-3 bg-dark bg-opacity-75">
        © 2025 El Buen Paladar. Todos los derechos reservados.
      </div>
    </footer>
  );
};
