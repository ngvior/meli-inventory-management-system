import { NestFactory } from '@nestjs/core';
import { InventoryQueryModule } from './inventory-query.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const port = parseInt(process.env.QUERY_PORT || '3002', 10);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    InventoryQueryModule,
    {
      transport: Transport.TCP,
      options: {
        port,
      },
    },
  );
  await app.listen();
  console.log(
    `Inventory-Query microservice running on http://localhost:${port}`,
  );
}
bootstrap();
