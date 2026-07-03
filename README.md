# Examen Final de Tecnologías Emergentes SIS-414

Nombre: Cristian David Paco Bravo  
RU: 107514  
CI: 10468787

## Descripción

Frontend React del sistema web administrable para el Colegio Carlos Medinaceli.
Permite mostrar información pública del colegio y administrar noticias,
docentes, promociones y contactos mediante conexión con el backend Spring Boot
desplegado en Render.

## Tecnologías Usadas

- React
- Vite
- JavaScript
- CSS
- GitHub Pages
- API REST Spring Boot
- Render

## Módulos Implementados

- Inicio
- Historia
- Noticias
- Docentes
- Promociones
- Contacto
- Ubicación
- Panel Administrativo
- Login de administrador

## Backend Consumido

URL base del backend:

```txt
https://colegio-backend-a5xc.onrender.com
```

Swagger:

```txt
https://colegio-backend-a5xc.onrender.com/swagger-ui/index.html
```

## Cómo ejecutar localmente

1. Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:8080
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar el frontend:

```bash
npm run dev
```

4. Abrir en el navegador:

```txt
http://localhost:5173
```

## Producción

Frontend publicado en GitHub Pages:

```txt
https://paco-xd222.github.io/colegio-frontend/
```

Para producción se usa:

```env
VITE_API_URL=https://colegio-backend-a5xc.onrender.com
```

## Comandos de verificación

```bash
npm run build
npm run lint
```
