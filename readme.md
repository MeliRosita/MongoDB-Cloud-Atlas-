# CRUD operations sobre MongoDB Cloud Atlas

Este proyecto conecta una aplicación de Node.js con MongoDB Cloud Atlas utilizando Mongoose.

## Herramientas utilizadas

- Node.js
- Express
- Mongoose
- Dotenv
- MongoDB Atlas
- Postman
- Visual Studio Code

## Descripción

La actividad consiste en crear una conexión con una base de datos en MongoDB Atlas, definir un esquema con Mongoose e implementar operaciones CRUD.

Como variante del ejemplo original, se cambió el esquema de estudiantes por un esquema de materiales de laboratorio.

## Modelo utilizado

El modelo se llama `Material` y contiene los siguientes campos:

- clave
- nombre
- categoria
- cantidadDisponible
- ubicacion
- estado

## Instalación

Después de clonar el repositorio, instalar las dependencias con:

```bash
npm install