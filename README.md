
# Hamnida Technology 💻🔧

Este es un proyecto web de agendamiento de servicios de mantenimiento de computadores. Permite a los usuarios:

- Registrarse e iniciar sesión 🔐
- Ver y seleccionar servicios disponibles 🛠️
- Agendar servicios y gestionar sus fechas 📅
- Visualizar sus agendamientos anteriores ✅

## Tecnologías usadas

- **Frontend:** HTML, CSS (estilo moderno y responsive), JavaScript
- **Backend:** Node.js + Express.js
- **Base de datos:** MongoDB (MongoDB Atlas recomendado)
- **Autenticación:** JWT (JSON Web Tokens)

## Estructura del proyecto

```
hamnida-tech/
│
├── hamnida-backend/         # Backend con APIs RESTful y conexión a MongoDB
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── server.js
│
├── public/                  # Frontend público
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── agendamientos.html
│   ├── css/
│   └── js/
│
├── .gitignore
├── README.md
└── package.json
```

## Despliegue sugerido

- **Backend:** Render.com (servicio gratuito de despliegue de Node.js)
- **Frontend:** Netlify.com o Vercel.com
- **Base de datos:** MongoDB Atlas

## Cómo iniciar el proyecto localmente

1. Clonar el repositorio:
```bash
git clone https://github.com/tu_usuario/hamnida-tech.git
cd hamnida-tech/hamnida-backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear un archivo `.env` con:
```
PORT=5000
MONGO_URI=tu_uri_mongodb
JWT_SECRET=un_secreto_seguro
```

4. Ejecutar el servidor:
```bash
node server.js
```

---

¡Gracias por revisar este proyecto!  
👨‍💻 Creado por Eduar para la evidencia GA4-220501096-AA1-EV01 del SENA.
