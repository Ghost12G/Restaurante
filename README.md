# Getting Started with Create React App

Este proyecto fue creado con [Create React App](https://github.com/facebook/create-react-app).

## Información del proyecto

Este proyecto es una página web para el restaurante **El Buen Paladar**, desarrollada con **React**.
Incluye un dashboard, reservas, reportes, calendario y otras funcionalidades usando componentes de React.

---

## 🚀 Librerías y herramientas utilizadas

* React.js
* React Router DOM
* React Bootstrap & Bootstrap
* Chart.js (para gráficos)
* Lucide-react (para iconos)
* React-calendar (para mostrar calendario)
* **Axios (para peticiones HTTP al backend)**
* SweetAlert2 (para alertas modernas)

Bootstrap CSS y JS se importan en `Navegacion.jsx`:

```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
```

---

## 📦 Instalación de dependencias (NPM)

A continuación, todas las instalaciones utilizadas en el proyecto:

```bash
npm install -g create-react-app
npx create-react-app restaurante
cd restaurante
npm start

# Estilos y componentes
npm install react-bootstrap bootstrap

# Navegación
npm install react-router-dom

# Gráficos
npm install chart.js

# Iconos
npm install lucide-react

# Calendario
npm install react-calendar

# Peticiones HTTP
npm install axios

# Alertas bonitas
npm install sweetalert2
```

---

## 🌐 Despliegue

El proyecto fue subido a **GitHub** y desplegado en **Vercel** (hosting gratuito).
Enlace al sitio en vivo: *[https://el-buen-paladar.vercel.app](https://el-buen-paladar.vercel.app)* (reemplaza con tu enlace real).

---

# Available Scripts

En el directorio del proyecto, puedes ejecutar:

### `npm start`

Ejecuta la aplicación en modo desarrollo.
Abre **[http://localhost:3000](http://localhost:3000)** en tu navegador.

La página se recargará automáticamente cuando hagas cambios.

---

### `npm test`

Inicia el runner de pruebas en modo interactivo.

---

### `npm run build`

Compila la aplicación para producción en la carpeta **build**.

Agrupa React en modo producción y optimiza el rendimiento.

Tu aplicación queda lista para desplegar.

---

### `npm run eject`

> ⚠️ Esta acción es irreversible.

Copia todas las configuraciones (Webpack, Babel, ESLint, etc.) en tu proyecto para personalización total.

No es necesario usar `eject` para este proyecto.

---

# Learn More

* Documentación de CRA: [https://facebook.github.io/create-react-app/docs/getting-started](https://facebook.github.io/create-react-app/docs/getting-started)
* Documentación de React: [https://reactjs.org/](https://reactjs.org/)

---

# Deployment

Proyecto desplegado en **Vercel**.
Enlace al sitio en vivo: *[https://el-buen-paladar.vercel.app](https://el-buen-paladar.vercel.app)* (reemplaza con tu enlace real).

---

# Derechos de autor

© 2025 El Buen Paladar. Todos los derechos reservados.

---

# Cómo guardarlo

1. Dentro de la carpeta del proyecto (`restaurante`), crea un archivo llamado **`README.md`**.
2. Ábrelo con **VSCode** o cualquier editor.
3. Copia y pega este contenido.
4. Guarda los cambios.
