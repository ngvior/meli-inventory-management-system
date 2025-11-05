### Markdown de propms utilizadas con Gemini

## Pedido archivo README.md

### Prompt

Necesito un README.md sobre un proyecto de microservicios de Inventario y Órdenes hecho en NestJS. El sistema usa arquitectura de microservicios con comunicación RPC (TCP) y simula una base de datos en un archivo JSON en (/apps/db). Estructura del README: simple, enfocando en ejecución y pruebas y sin usar emojis.

Datos sobre el proyecto a incluir:
Gestor de Paquetes: PNPM.
Node.js: Versión v20 o superior.
Servicios: Son tres servicios (API Gateway, Command, Query) que se llaman inventory-api-gateway, inventory-command, y inventory-query.
Ejecución: Los servicios se inician individualmente con el comando nest start [nombre-del-servicio] --watch en tres terminales separadas.
Puertos: Gateway en 3000, Command en 3001, Query en 3002.
Configuración: Indicar crear un archivo .env con los puertos (API_GATEWAY_PORT, COMMAND_PORT, QUERY_PORT) y que el archivo inventory.json (simulacion de db) exista en la carpeta db/.
Endpoints de Prueba (Gateway en http://localhost:3000):
GET /inventory-query/products (Consultar todo)
GET /inventory-query/products/:sku (Consultar producto por SKU)
POST /inventory-command/ (Crear orden, incluyendo cuerpo JSON de sku, version, wantedQuantity) - Para testear la concurrencia se debe mandar un producto con una version erronea.

### Respuesta Gemini

Absolutamente! Con esa información, puedo generar un README.md básico y efectivo que explica cómo correr tu proyecto de microservicios.

Aquí está el contenido listo para copiar y pegar en tu archivo README.md:
Sistema de Microservicios: Inventario y ÓrdenesEste proyecto implementa una solución de microservicios en NestJS para la gestión de inventario y procesamiento de órdenes, utilizando una arquitectura desacoplada con comunicación RPC (TCP). La persistencia de datos se simula mediante archivos JSON.🛠️ Requisitos del SistemaSe requiere lo siguiente para ejecutar la aplicación:Node.js: Versión v20 o superior.PNPM: Como gestor de paquetes.⚙️ Configuración1. Instalación de DependenciasEjecuta el siguiente comando desde el directorio raíz del proyecto:Bashpnpm install 2. Archivo de Entorno (.env)Crea un archivo llamado .env en la raíz del proyecto para definir los puertos de comunicación:Code snippet# Archivo .env
API_GATEWAY_PORT=3000
COMMAND_PORT=3001
QUERY_PORT=3002 3. Persistencia de DatosAsegúrate de que el archivo de inventario inicial (inventory.json) exista dentro de la carpeta db/ en la raíz del proyecto. Este archivo actúa como la base de datos simulada.▶️ Ejecución de MicroserviciosEl sistema consta de tres servicios que deben iniciarse por separado. Abre tres terminales en la raíz del proyecto y ejecuta el comando nest start [nombre-del-servicio] --watch en cada una:Terminal 1: API Gateway (HTTP)Bashnest start inventory-api-gateway --watch
Terminal 2: Command Service (TCP)Bashnest start inventory-command --watch
Terminal 3: Query Service (TCP)Bashnest start inventory-query --watch
Una vez que los tres servicios estén activos (escuchando en sus puertos 3000, 3001 y 3002, respectivamente), el sistema estará operativo.💻 Endpoints de PruebaTodas las interacciones de cliente se realizan a través del API Gateway en http://localhost:3000.FuncionalidadMétodoRuta (Base: http://localhost:3000)Cuerpo de Petición (POST)Crear OrdenPOST/inventory-command/order{ "sku": "...", "version": 1, "wantedQuantity": 1 }Consultar StockGET/inventory-query/stock/:sku(No aplica)Nota sobre la Concurrencia: Para probar la lógica de Bloqueo Optimista, se requiere el campo "version" en la petición POST. Intentar enviar una orden con una version desactualizada resultará en un error 409 Conflict.

## Pedido generación de repository para la manipulación de JSON

### Prompt

Requiero generar un archivo inventory.repository.ts para manipular la obtencion de los productos en el inventory y la sobreescritura del json a la hora de actualizar un registro. Necesito que provea funciones que me permitan obtener todos los productos, obtener un producto por su identificador(sku) y actualizar un producto. La estructura de los productos se obtiene desde ProductDto y es = { sku: string; stock: number; version: number;}

### Respuesta Gemini

¡Claro! Aquí tienes el diseño de la clase InventoryRepository en TypeScript, utilizando el módulo fs de Node.js para simular la persistencia en un archivo JSON..💾 $\text{InventoryRepository}$ en TypeScript.
TypeScript

import { NotFoundException } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { ProductDto } from 'apps/libs/contracts/src/common/product.dto'; // Asumiendo esta ruta
import _ as fs from 'fs';
import _ as path from 'path';

export class InventoryRepository {
private readonly filePath = path.join(
process.cwd(),
'apps',
'db',
'inventory.json',
);

public findAll(): ProductDto[] {
try {
// 1. Intentar leer el archivo
const data = fs.readFileSync(this.filePath, 'utf-8');
// 2. Devolver el contenido parseado
return JSON.parse(data);
} catch (error) {
// 3. Devolver un array vacío si el archivo no existe o hay un error de lectura
return [];
}
}

public findBySku(sku: string): ProductDto {
// Nota: Se asume que el SKU que llega aquí ya es la cadena limpia 'SKU-XXX'.
const records = this.findAll();

    // Usamos .trim() y === para evitar errores de espacios/tipos
    const product = records.find((r) => r.sku.trim() === sku.trim());

    if (!product) {
        // Lanzar una RpcException que envuelve una HttpException (404)
        throw new RpcException(new NotFoundException('Product not found'));
    }
    return product;

}

public updateProduct(updatedRecord: ProductDto): ProductDto {
// 1. Lógica Atómica: Leer el estado actual
let records = this.findAll();

    // 2. Encontrar y reemplazar el registro
    const recordIndex = records.findIndex((r) => r.sku === updatedRecord.sku);

    if (recordIndex === -1) {
      // Devolver un error si el registro no existe para actualizar
      throw new Error(
        `SKU ${updatedRecord.sku} no encontrado para actualización.`,
      );
    }

    records[recordIndex] = updatedRecord;

    // 3. Escribir el array completo (COMMIT simulado)
    this.writeInventory(records);

    return updatedRecord;

}

private writeInventory(records: ProductDto[]): void {
try {
// Sobrescribir el archivo con indentación de 2
fs.writeFileSync(
this.filePath,
JSON.stringify(records, null, 2),
'utf-8',
);
} catch (e) {
console.error('Error al escribir el archivo de inventario:', e);
// Lanzar un error de persistencia
throw new Error('Error de persistencia de datos.');
}
}
}
