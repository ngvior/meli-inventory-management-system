import { Module } from '@nestjs/common';
import { InventoryRepository } from 'apps/db/inventory.repository';
import { InventoryCommandController } from './inventory-command.controller';
import { InventoryCommandService } from './inventory-command.service';

@Module({
  imports: [],
  controllers: [InventoryCommandController],
  providers: [InventoryCommandService, InventoryRepository],
})
export class InventoryCommandModule {}
