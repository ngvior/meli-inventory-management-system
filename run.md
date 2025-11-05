## Ejecución de Microservicios

Existe el archivo `endpoints.http` el cual contiene ejemplos para la ejecución de las consultas utilizando extensiones en el IDE como: httpYac o REST Client<br>
El sistema consta de tres servicios que deben iniciarse por separado.<br>
Abrir tres terminales en la raíz del proyecto y ejecuta el comando `nest start [nombre-del-servicio] --watch` en cada una:

### Terminal 1 (API Gateway (HTTP)):

```
nest start inventory-api-gateway --watch
```

### Terminal 2 (Command Service (TCP)):

```
nest start inventory-command --watch
```

### Terminal 3 (Query Service (TCP)):

```
nest start inventory-query --watch
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
