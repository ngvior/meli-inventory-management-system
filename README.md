# Inventory Management System

A CQRS-style inventory and order-processing system built as three decoupled NestJS services
communicating over TCP/RPC, with optimistic concurrency control on stock updates.

## Architecture

```
HTTP client
     |
     v
inventory-api-gateway  (HTTP, port 3000)
     |                    |
     | TCP                | TCP
     v                    v
inventory-command    inventory-query
   (port 3001)         (port 3002)
     |                    |
     +--------+-----------+
              v
     apps/db/inventory.json
```

The write path and the read path are separate deployable services. The gateway is the only HTTP
surface; it holds two `ClientProxy` instances and forwards each request to the service that owns
that side of the model. Nothing else in the system speaks HTTP.

Three decisions shape the repository:

**Command/query separation at the process level.** Reads and writes are not two folders in one
service — they are two Nest microservices with their own bootstrap, port and message patterns. Write
traffic cannot contend with read traffic, and either side can be scaled or replaced without touching
the other.

**TCP transport instead of HTTP between services.** Internal calls use `Transport.TCP`. There is no
HTTP parsing, routing or status-code translation on the internal hop; the gateway addresses services
by message pattern (`command.create_order`, `query.get_products`, `query.get_product_by_sku`) rather
than by URL.

**A shared contracts library.** `apps/libs/contracts` holds the DTOs and the message-pattern
constants. The gateway and the services depend on the same definitions, so a pattern rename breaks
the build instead of failing silently at runtime.

Because RPC errors do not carry HTTP semantics, the gateway applies an
`RpcExceptionTranslatorInterceptor` that maps a failed `RpcException` back onto the corresponding
HTTP status before it reaches the client.

## Optimistic concurrency

Every product carries a `version`. A `POST` order must send the version it read:

```json
{ "sku": "...", "version": 1, "wantedQuantity": 1 }
```

The command service compares the submitted version against the stored one. On a mismatch it rejects
the write with `409 Conflict` rather than overwriting a concurrent update; on success it decrements
stock and increments the version. Insufficient stock is rejected separately.

This is the lost-update problem: two clients read stock 10, both order, and a last-write-wins store
would record only one of the two decrements. Versioning turns that silent corruption into an explicit
failure the client can retry against fresh data.

## Persistence

Data lives in `apps/db/inventory.json` behind an `InventoryRepository`. This is deliberate scope
control for the exercise, not a production choice — the repository is the seam a real database would
be swapped in at, and no calling code reads the file directly.

## Stack

NestJS 11, TypeScript 5.7, `@nestjs/microservices`, pnpm, Jest.

## Running it

Requires Node.js 20+ and pnpm.

```bash
pnpm install
```

Create a `.env` file at the repository root:

```
PORT=3000
COMMAND_PORT=3001
QUERY_PORT=3002
```

Make sure `apps/db/inventory.json` exists — it is the seed inventory.

The three services start separately. Open three terminals at the repository root:

```bash
nest start inventory-api-gateway --watch   # HTTP gateway,  port 3000
nest start inventory-command --watch       # write service, port 3001
nest start inventory-query --watch         # read service,  port 3002
```

## Endpoints

All client traffic goes through the gateway at `http://localhost:3000`.

| Method | Path | Description |
|---|---|---|
| GET | `/inventory-query/products` | List the full inventory |
| GET | `/inventory-query/products/:sku` | Fetch a single product |
| POST | `/inventory-command/order` | Place an order against a SKU |

`endpoints.http` contains ready-to-run examples for the httpYac or REST Client editor extensions.

## Tests

```bash
pnpm test
```
