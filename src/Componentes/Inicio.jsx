import React from "react";

export const Inicio = () => {
  return (
    <div className="bg-light">
      {/* 🌅 Banner de Inicio */}
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        <div className="carousel-indicators">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {[
            {
              src: "img/banner.jpg",
              title: "Bienvenido a Nuestro Restaurante",
              desc: "Sabores únicos que deleitan el alma",
            },
            {
              src: "img/bannerDos.jpg",
              title: "Tradición y Sabor",
              desc: "Platos preparados con los mejores ingredientes peruanos",
            },
            {
              src: "img/bannerTres.jpg",
              title: "Una Experiencia Única",
              desc: "Disfruta cada momento con nosotros",
            },
          ].map((slide, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img
                src={slide.src}
                className="d-block w-100"
                alt={`Banner ${index + 1}`}
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3 p-3">
                <h5 className="fw-bold">{slide.title}</h5>
                <p>{slide.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      {/* 🌮 Sección de Platos Destacados */}
      <div className="container marketing mt-5 pt-5">
        <h1 className="text-center mb-5 fw-bold text-primary">Nuestra Carta Destacada</h1>
        <div className="row text-center">
          {[
            {
              img: "img/arrozMarisco.png",
              title: "Platos Típicos",
              desc: "Disfruta de nuestra especialidad del día preparada con los mejores ingredientes.",
            },
            {
              img: "img/piscoSour.png",
              title: "Bebidas",
              desc: "Explora nuestra carta de bebidas naturales y cócteles artesanales.",
            },
            {
              img: "img/turron.png",
              title: "Postres",
              desc: "El toque dulce perfecto para cerrar tu experiencia en nuestro restaurante.",
            },
          ].map((item, index) => (
            <div key={index} className="col-lg-4 mb-4">
              <img
                src={item.img}
                className="rounded-circle img-fluid shadow-lg mb-3"
                style={{ width: "290px", height: "250px", objectFit: "cover" }}
                alt={item.title}
              />
              <h2 className="fw-semibold">{item.title}</h2>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <hr className="featurette-divider" />

        {/* 🍽️ Featurettes */}
        {[
          {
            title: "Nuestro sabor",
            subtitle: "te sorprenderá.",
            text: "Preparaciones únicas inspiradas en la gastronomía local, con un toque moderno. Cada plato cuenta una historia de sabor, tradición y pasión por la cocina peruana. “El verdadero secreto está en cocinar con el corazón.”",
            img: "img/chef.jpg",
            imgOrder: 2,
          },
          {
            title: "Ingredientes frescos",
            subtitle: "de la granja a tu mesa.",
            text: "Seleccionamos cuidadosamente productos locales para garantizar frescura y calidad.",
            img: "img/ingredientes.jpg",
            imgOrder: 1,
          },
          {
            title: "Atención personalizada",
            subtitle: "en cada detalle.",
            text: "Nuestro equipo está preparado para ofrecerte la mejor experiencia gastronómica posible.",
            img: "img/atencion.jpg",
            imgOrder: 2,
          },
        ].map((feat, index) => (
          <div key={index}>
            <div className="row featurette align-items-center my-5">
              <div className={`col-md-7 ${feat.imgOrder === 1 ? "order-md-2" : ""}`}>
                <h2 className="featurette-heading fw-bold">
                  {feat.title} <span className="text-muted">{feat.subtitle}</span>
                </h2>
                <p className="lead">{feat.text}</p>
              </div>
              <div className={`col-md-5 ${feat.imgOrder === 1 ? "order-md-1 text-center" : "text-center"}`}>
                <img
                  src={feat.img}
                  className="featurette-image img-fluid mx-auto rounded shadow"
                  style={{ maxHeight: "500px", objectFit: "cover" }}
                  alt={feat.title}
                />
              </div>
            </div>
            <hr className="featurette-divider" />
          </div>
        ))}
      </div>
    </div>
  );
};
