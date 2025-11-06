import React from 'react'

export const Footer = () => {
  return (
    <div>
      <footer class="bg-primary text-white text-center text-lg-start mt-5">
        <div class="container p-4">
          <div class="row">

            <div class="col-lg-8 col-md-12 mb-4 mb-md-0">
              <h5 class="text-uppercase">Nuestro Restaurante</h5>
              <p>
                Disfruta de la mejor experiencia gastronómica, con platos únicos y un ambiente acogedor. ¡Te esperamos siempre!
              </p>
            </div>

            {/* Columna Contáctanos */}
            <div className="col-lg-4 col-md-12 mb-4 mb-md-0 text-lg-left">
              <h5 className="text-uppercase">Contáctanos</h5>
              <p>
                <img
                  src="iconos/geo-alt.svg"
                  alt="Ubicación"
                  title="Ubicación"
                  width="20"
                  height="20"
                  className="me-2"
                />
                Av. Principal 123 - Lima, Perú
              </p>
              <p>
                <img
                  src="iconos/telephone.svg"
                  alt="Teléfono"
                  title="Teléfono"
                  width="20"
                  height="20"
                  className="me-2"
                />
                +51 999 888 777
              </p>
              <p>
                <img
                  src="iconos/envelope.svg"
                  alt="Email"
                  title="Email"
                  width="20"
                  height="20"
                  className="me-2"
                />
                info@restaurante.com
              </p>
            </div>






          </div>


        </div>

        <div class="text-center p-3 bg-primary">
         © 2025 El Buen Paladar. Todos los derechos reservados.
        </div>
      </footer>

    </div>
  )
}
