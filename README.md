<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Sistema de Microservicios: Inventario y Órdenes

Este proyecto implementa una solución de microservicios en NestJS para la gestión de inventario y procesamiento de órdenes, utilizando una arquitectura desacoplada con comunicación RPC (TCP). La persistencia de datos se simula mediante archivos JSON.

## Requisitos del Sistema

Se requiere lo siguiente para ejecutar la aplicación:

- Node.js: Versión v20 o superior.
- PNPM: Como gestor de paquetes.

## Configuración

1. Instalación de Dependencias<br>
   Ejecuta el siguiente comando desde el directorio raíz del proyecto:

```
pnpm install
```

2. Archivo de Entorno (.env)<br>
   Crear un archivo llamado .env en la raíz del proyecto para definir los puertos de comunicación:

```
// archivo .env
API_GATEWAY_PORT=3000
COMMAND_PORT=3001
QUERY_PORT=3002
```

3. Persistencia de Datos<br>
   Asegúrate de que el archivo de inventario inicial (inventory.json) exista dentro de la carpeta db/ en la raíz del proyecto. Este archivo actúa como la base de datos simulada.

## Ejecución de Microservicios

Existe el archivo `endpoints.http` el cual contiene ejemplos para la ejecución de las consultas utilizando extensiones en el IDE como: httpYac o REST Client<br>
El sistema consta de tres servicios que deben iniciarse por separado.<br>
Abrir tres terminales en la raíz del proyecto y ejecuta el comando `nest start [nombre-del-servicio] --watch` en cada una:

### Terminal 1 (API Gateway (HTTP)):

```
start inventory-api-gateway --watch
```

### Terminal 2 (Command Service (TCP)):

```
start inventory-command --watch
```

### Terminal 3 (Query Service (TCP)):

```
start inventory-query --watch
```

Una vez que los tres servicios estén activos (escuchando en sus puertos 3000, 3001 y 3002, respectivamente), el sistema estará operativo.

## Endpoints de Prueba

Todas las interacciones de cliente se realizan a través del API Gateway en http://localhost:3000/servicio/método<br>

### Ejemplo peticiones

1. (GET) Consultar todo el inventario<br>
   url: `http://localhost:3000/inventory-query/products`
2. (GET) Consultar producto especifico del inventario<br>
   url: `http://localhost:3000/inventory-query/products/:sku`
3. (POST) Crear una orden<br>
   url: `http://localhost:3000/inventory-command/`
   body:`{ "sku": "...", "version": 1, "wantedQuantity": 1 }`

Nota sobre la Concurrencia:<br>
Para probar la lógica de Bloqueo Optimista, se requiere el campo "version" en la petición POST. Intentar enviar una orden con una version desactualizada resultará en un error 409 Conflict.
# mali-inventory-management-system
