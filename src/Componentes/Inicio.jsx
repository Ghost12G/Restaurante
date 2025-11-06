import React from "react";

export const Inicio = () => {
  return (
    <div>
      {/* 🌅 Banner de Inicio */}
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="img/banner.jpg"
              className="d-block w-100"
              alt="Banner 1"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3 p-2">
              <h5>Bienvenido a Nuestro Restaurante</h5>
              <p>Sabores únicos que deleitan el alma</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="img/bannerDos.jpg"
              className="d-block w-100"
              alt="Banner 2"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3 p-2">
              <h5>Tradición y Sabor</h5>
              <p>Platos preparados con los mejores ingredientes peruanos</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="img/bannerTres.jpg"
              className="d-block w-100"
              alt="BannerTre"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3 p-2">
              <h5>Una Experiencia Única</h5>
              <p>Disfruta cada momento con nosotros</p>
            </div>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      {/* 🌮 Sección de Platos */}
      <div className="container marketing mt-5 pt-5">
        <h1 className="text-center mb-5 fw-bold text-primary">
          Nuestra Carta Destacada
        </h1>

        {/* Tres columnas de presentación */}
        <div className="row text-center">
          <div className="col-lg-4 mb-4">
            <img
              src="img/arrozMarisco.png"
              className="rounded-circle img-fluid shadow-lg mb-3"
              width="290"
              height="250"
              alt="plato1"
            />
            <h2 className="fw-semibold">Platos Típicos</h2>
            <p>
              Disfruta de nuestra especialidad del día preparada con los mejores
              ingredientes.
            </p>
          </div>

          <div className="col-lg-4 mb-4">
            <img
              src="img/piscoSour.png"
              className="rounded-circle img-fluid shadow-lg mb-3"
              width="300"
              height="250"
              alt="plato2"
            />
            <h2 className="fw-semibold">Bebidas</h2>
            <p>
              Explora nuestra carta de bebidas naturales y cócteles artesanales.
            </p>
          </div>

          <div className="col-lg-4 mb-4">
            <img
              src="img/turron.png"
              className="rounded-circle img-fluid shadow-lg mb-3"
              width="300"
              height="250"
              alt="plato3"
            />
            <h2 className="fw-semibold">Postres</h2>
            <p>
              El toque dulce perfecto para cerrar tu experiencia en nuestro
              restaurante.
            </p>
          </div>
        </div>

        <hr className="featurette-divider" />

        {/* 🍽️ Featurette 1 */}
        <div className="row featurette align-items-center">
          <div className="col-md-8">
            <h2 className="featurette-heading fw-bold">
              Nuestro sabor <span className="text-muted">te sorprenderá.</span>
            </h2>
            <p className="lead">
              Preparaciones únicas inspiradas en la gastronomía local, con un
              toque moderno. Cada plato cuenta una historia de sabor, tradición
              y pasión por la cocina peruana. “El verdadero secreto está en
              cocinar con el corazón.”
            </p>
          </div>
          <div className="col-md-4 text-center">
            <img
              src="img/chef.jpg"
              className="featurette-image img-fluid mx-auto rounded shadow"
              width="350"
              height="500"
              alt="Chef"
            />
          </div>
        </div>

        <hr className="featurette-divider" />

        {/* 🥗 Featurette 2 */}
        <div className="row featurette align-items-center">
          <div className="col-md-7 order-md-2">
            <h2 className="featurette-heading fw-bold">
              Ingredientes frescos{" "}
              <span className="text-muted">de la granja a tu mesa.</span>
            </h2>
            <p className="lead">
              Seleccionamos cuidadosamente productos locales para garantizar
              frescura y calidad.
            </p>
          </div>
          <div className="col-md-5 order-md-1 text-center">
            <img
              src="img/ingredientes.jpg"
              className="featurette-image img-fluid mx-auto rounded shadow"
              width="380"
              height="500"
              alt="Ingredientes"
            />
          </div>
        </div>

        <hr className="featurette-divider" />

        {/* 🤝 Featurette 3 */}
        <div className="row featurette align-items-center">
          <div className="col-md-7">
            <h2 className="featurette-heading fw-bold">
              Atención personalizada{" "}
              <span className="text-muted">en cada detalle.</span>
            </h2>
            <p className="lead">
              Nuestro equipo está preparado para ofrecerte la mejor experiencia
              gastronómica posible.
            </p>
          </div>
          <div className="col-md-5 text-center">
            <img
              src="img/atencion.jpg"
              className="featurette-image img-fluid mx-auto rounded shadow"
              width="500"
              height="500"
              alt="Servicio"
            />
          </div>
        </div>

        <hr className="featurette-divider" />
      </div>
    </div>
  );
};
