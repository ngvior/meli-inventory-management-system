import { Module } from '@nestjs/common';
import { InventoryApiGatewayController } from './inventory-api-gateway.controller';
import { InventoryApiGatewayService } from './inventory-api-gateway.service';
import { InventoryCommandModule } from './inventory-command/inventory-command.module';
import { InventoryQueryModule } from './inventory-query/inventory-query.module';

@Module({
  imports: [InventoryQueryModule, InventoryCommandModule],
  controllers: [InventoryApiGatewayController],
  providers: [InventoryApiGatewayService],
})
export class InventoryApiGatewayModule {}
