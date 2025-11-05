import { NestFactory } from '@nestjs/core';
import { InventoryApiGatewayModule } from './inventory-api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(InventoryApiGatewayModule);
  await app.listen(parseInt(process.env.PORT || '3000', 10));
  console.log(`Gateway running on: ${await app.getUrl()}`);
}
bootstrap();
