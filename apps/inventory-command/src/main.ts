import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { InventoryCommandModule } from './inventory-command.module'

async function bootstrap() {
  const port = parseInt(process.env.COMMAND_PORT || '3001', 10);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    InventoryCommandModule,
    {
      transport: Transport.TCP,
      options: {
        port,
      },
    },
  );
  await app.listen();
  console.log(
    `Inventory-Command microservice running on http://localhost:${port}`,
  );
}
bootstrap();
